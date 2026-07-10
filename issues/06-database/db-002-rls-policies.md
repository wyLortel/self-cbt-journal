# Issue: 애플리케이션 레벨 접근 제어

**이슈 ID**: db-002  
**우선순위**: P0 (Critical)  
**복잡도**: 🟡 Mid  
**상태**: 🔴 Not Started  
**예상 소요 시간**: 2-3시간  
**담당자**: (할당 대기)  

---

## 목적

애플리케이션 레벨에서 **사용자가 본인의 감정 기록만 접근**하도록 강제한다.  
이것이 없으면 다른 사용자의 기록을 볼 수 있는 보안 취약점 발생.

---

## 배경

- emotion_records 테이블이 이미 생성됨 (db-001 완료)
- MySQL + Prisma는 데이터베이스 레벨 RLS를 지원하지 않으므로 애플리케이션에서 구현
- 세션 토큰으로 user_id를 검증하고, 조회/수정/삭제 시에 user_id 일치 확인

---

## 작업 내용

1. 각 API 엔드포인트에서 세션 미들웨어를 통해 user_id 검증
2. EmotionRecord 쿼리 시 항상 `userId === requestedUserId` 조건 추가
3. 4개 권한 검증:
   - SELECT: 사용자가 본인 기록만 조회
   - INSERT: 사용자가 본인 user_id로만 삽입
   - UPDATE: 사용자가 본인 기록만 수정
   - DELETE: 사용자가 본인 기록만 삭제
4. 로컬 & 배포 환경 모두에서 테스트

---

## 완료 조건 (Acceptance Criteria)

### AC 1: 세션 미들웨어 확인
- **Given** 인증된 사용자
- **When** API 요청 시 Authorization 헤더에 토큰 전달
- **Then** 미들웨어가 토큰을 검증하고 userId를 요청 컨텍스트에 추가

### AC 2: GET /api/records 권한 검증
- **Given** 사용자 A 인증 상태
- **When** GET /api/records (사용자 A의 토큰으로)
- **Then** 응답에 A의 기록만 포함, 다른 사용자의 기록은 0개

**테스트**:
```bash
# 사용자 A로 기록 생성
curl -X POST http://localhost:3000/api/records \
  -H "Authorization: Bearer $TOKEN_A" \
  -H "Content-Type: application/json" \
  -d '{"situation":"...","emotion":"불안",...}'

# 사용자 B로 조회 시도
curl http://localhost:3000/api/records \
  -H "Authorization: Bearer $TOKEN_B"
# → A의 기록이 포함되면 안 됨
```

### AC 3: POST /api/records 권한 검증
- **Given** 사용자 A 인증 상태
- **When** 다른 userId를 포함하여 POST /api/records 시도
- **Then** 400/401 에러 또는 자동으로 auth된 userId로 덮어쓰기

**테스트**:
```bash
# 사용자 A가 사용자 B의 userId로 기록 생성 시도
curl -X POST http://localhost:3000/api/records \
  -H "Authorization: Bearer $TOKEN_A" \
  -H "Content-Type: application/json" \
  -d '{"userId":"B_ID","situation":"...","emotion":"불안",...}'
# → A의 userId로 강제 저장 또는 에러
```

### AC 4: PATCH /api/records/{id} 권한 검증
- **Given** 사용자 A가 생성한 기록이 있는 상태
- **When** 사용자 B가 PATCH /api/records/{id} 시도
- **Then** 403 Forbidden 또는 접근 불가 에러

**테스트**:
```bash
# 사용자 B가 A의 기록 수정 시도
curl -X PATCH http://localhost:3000/api/records/$RECORD_ID \
  -H "Authorization: Bearer $TOKEN_B" \
  -H "Content-Type: application/json" \
  -d '{"emotion":"자책"}'
# → 권한 거부 에러
```

### AC 5: DELETE /api/records/{id} 권한 검증
- **Given** 사용자 A가 생성한 기록이 있는 상태
- **When** 사용자 B가 DELETE /api/records/{id} 시도
- **Then** 403 Forbidden

### AC 6: Soft Delete 처리
- **Given** 기록이 존재하는 상태
- **When** DELETE /api/records/{id} 호출
- **Then** 실제 삭제가 아닌 deletedAt 컬럼 설정 (소프트 삭제)
- **AND** 이후 GET /api/records에서 deletedAt IS NULL 조건 자동 포함

---

## 구현 가이드

### 1. 세션 검증 미들웨어 (예시)

```typescript
// backend/src/middleware/auth.ts
import { Context, Next } from 'hono'
import { prisma } from '../utils/prisma'

export const authMiddleware = async (c: Context, next: Next) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '')
  
  if (!token) {
    return c.json({ success: false, error: 'Unauthorized' }, 401)
  }

  const session = await prisma.session.findUnique({
    where: { token },
  })

  if (!session || session.expiresAt < new Date()) {
    return c.json({ success: false, error: 'Token expired' }, 401)
  }

  c.set('userId', session.userId)
  await next()
}
```

### 2. 조회 시 권한 검증 (예시)

```typescript
// backend/src/controllers/records.ts
export const getRecords = async (c: Context) => {
  const userId = c.get('userId')

  const records = await prisma.emotionRecord.findMany({
    where: {
      userId,
      deletedAt: null,
    },
    orderBy: { createdAt: 'desc' },
  })

  return c.json({ success: true, data: records })
}
```

### 3. 수정/삭제 시 권한 검증 (예시)

```typescript
export const updateRecord = async (c: Context) => {
  const userId = c.get('userId')
  const recordId = c.req.param('id')

  const record = await prisma.emotionRecord.findUnique({
    where: { id: recordId },
  })

  if (!record || record.userId !== userId) {
    return c.json({ success: false, error: 'Forbidden' }, 403)
  }

  // 수정 로직...
}
```

---

## 참고 자료

- [Prisma Filtering](https://www.prisma.io/docs/orm/prisma-client/queries/filtering-and-sorting/filtering)
- 세션 토큰 기반 인증 (backend/src/utils/session.ts 참고)

---

## 관련 이슈

- db-001: emotion_records 테이블 설계
- api-003: POST /api/records 구현 (권한 검증 포함)
- api-004: PATCH /api/records/{id} 구현
- api-005: DELETE /api/records/{id} 구현

---

## 체크리스트

- [ ] 세션 검증 미들웨어 구현
- [ ] GET /api/records 권한 검증 추가
- [ ] POST /api/records 권한 검증 추가 (userId 강제)
- [ ] PATCH /api/records/{id} 권한 검증 추가
- [ ] DELETE /api/records/{id} 권한 검증 추가 (soft delete)
- [ ] 모든 엔드포인트에서 deletedAt IS NULL 필터 적용
- [ ] 로컬에서 크로스유저 접근 테스트
- [ ] 팀원 리뷰

---

## 추가 노트

**토큰 만료 관리**: 
- 세션의 expiresAt과 현재 시간 비교
- 만료된 토큰은 401 Unauthorized 반환

**로깅**:
- 권한 거부된 요청은 로깅 (누가, 어떤 기록에 접근 시도했는지)
- 향후 보안 감시에 사용

---

**작성일**: 2026-07-02  
**마지막 수정**: 2026-07-08
