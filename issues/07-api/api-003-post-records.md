# Issue: POST /api/records - 새 감정 기록 생성

**이슈 ID**: api-003  
**우선순위**: P0 (Critical)  
**복잡도**: 🟡 Mid  
**상태**: 🔴 Not Started  
**예상 소요 시간**: 4시간  
**담당자**: (할당 대기)  

---

## 목적

사용자가 1-9단계 감정 기록을 저장할 수 있는 API 엔드포인트를 구현한다.  
핵심 기능이므로 안정성과 검증이 중요.

---

## 배경

- emotion_records 테이블 생성 완료 (db-001)
- RLS 정책 설정 완료 (db-002)
- Hono + TypeScript 백엔드
- Supabase 인증 완료 (auth-002)
- 요청은 JWT 토큰을 통해 사용자 인증됨

---

## 작업 내용

1. Hono 라우터에 POST /api/records 핸들러 생성
2. 요청 본문 검증 (모든 필드 필수)
3. user_id를 인증 토큰에서 추출
4. Supabase에 insert
5. 응답 반환 (생성된 기록의 ID)
6. 에러 처리 (DB 에러, 검증 에러)

---

## 완료 조건 (Acceptance Criteria)

### AC 1: 정상 요청 처리
- **Given** 유효한 JWT 토큰으로 인증된 사용자
- **When** POST /api/records에 다음 본문으로 요청:
  ```json
  {
    "situation": "팀플 회의에서...",
    "emotion": "불안",
    "intensity": 75,
    "automatic_thought": "내가 역할을 못할 거야",
    "fact": "팀장이 내 의견에 응답 안 함",
    "interpretation": "내 능력이 부족하기 때문",
    "cognitive_distortions": ["과잉일반화", "개인화"],
    "supporting_evidence": "지난 프로젝트에서도...",
    "contradicting_evidence": "하지만 내가 했던 일도...",
    "alternative_thought": "팀장이 바빴을 수도...",
    "small_action": "다음 회의 전에 의견 정리하기"
  }
  ```
- **Then** HTTP 200/201 + 응답:
  ```json
  {
    "success": true,
    "data": {
      "id": "uuid-xxx",
      "user_id": "user-uuid",
      "situation": "...",
      "created_at": "2026-07-02T10:30:00Z"
    },
    "error": null
  }
  ```

### AC 2: 필드 검증
- **Given** 요청 본문에 필수 필드 누락 (예: situation 없음)
- **When** POST /api/records 요청
- **Then** HTTP 400 + 에러 메시지:
  ```json
  {
    "success": false,
    "data": null,
    "error": "situation is required"
  }
  ```

### AC 3: intensity 범위 검증
- **Given** intensity가 0-100 범위 밖 (예: 150)
- **When** POST /api/records 요청
- **Then** HTTP 400 + 에러 메시지: "intensity must be between 0 and 100"

### AC 4: emotion 유효성 검사
- **Given** emotion이 허용되지 않는 값 (예: "행복")
- **When** POST /api/records 요청
- **Then** HTTP 400 + 에러 메시지: "emotion must be one of ..."

### AC 5: 미인증 요청 거부
- **Given** JWT 토큰 없이 요청
- **When** POST /api/records 요청
- **Then** HTTP 401 Unauthorized

### AC 6: DB 에러 처리
- **Given** DB 에러 발생 (연결 실패 등)
- **When** POST /api/records 요청
- **Then** HTTP 500 + 에러 로그 (사용자에게는 "서버 에러" 메시지)

### AC 7: user_id 강제 설정
- **Given** 요청 본문에 user_id를 직접 포함한 경우
- **When** POST /api/records 요청
- **Then** 본문의 user_id는 무시되고, 인증 토큰의 user_id만 사용

---

## 구현 예시

```typescript
// src/routes/records.ts
import { Hono } from 'hono';
import { getAuth } from '@hono/auth';
import { z } from 'zod';

const recordSchema = z.object({
  situation: z.string().min(1).max(1000),
  emotion: z.enum(['불안', '자책', '수치심', '후회', '분노', '좌절', '외로움']),
  intensity: z.number().int().min(0).max(100),
  automatic_thought: z.string().min(1).max(500),
  fact: z.string().min(1),
  interpretation: z.string().min(1),
  cognitive_distortions: z.array(z.string()),
  supporting_evidence: z.string().min(1),
  contradicting_evidence: z.string().min(1),
  alternative_thought: z.string().min(1).max(500),
  small_action: z.string().min(1).max(200),
});

const router = new Hono();

router.post('/records', async (c) => {
  try {
    // 1. 인증 확인
    const token = c.req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    // 2. JWT에서 user_id 추출
    const user = await verifyToken(token); // JWT 검증
    const user_id = user.sub; // user ID

    // 3. 요청 본문 검증
    const body = await c.req.json();
    const result = recordSchema.safeParse(body);
    if (!result.success) {
      return c.json({
        success: false,
        error: result.error.errors[0].message
      }, 400);
    }

    // 4. DB에 insert
    const { data, error } = await supabase
      .from('emotion_records')
      .insert({
        user_id,
        ...result.data,
        status: 'draft'
      })
      .select()
      .single();

    if (error) {
      console.error('DB Error:', error);
      return c.json({
        success: false,
        error: 'Failed to create record'
      }, 500);
    }

    // 5. 성공 응답
    return c.json({
      success: true,
      data: data,
      error: null
    }, 201);

  } catch (err) {
    console.error('API Error:', err);
    return c.json({
      success: false,
      error: 'Internal server error'
    }, 500);
  }
});

export default router;
```

---

## 테스트 계획

### 단위 테스트
```typescript
// POST 성공
test('should create record with valid data', async () => {
  const res = await api.post('/records', {
    token: validToken,
    body: validRecordData
  });
  expect(res.status).toBe(201);
  expect(res.body.success).toBe(true);
});

// 검증 실패
test('should reject invalid emotion', async () => {
  const res = await api.post('/records', {
    token: validToken,
    body: { ...validRecordData, emotion: 'invalid' }
  });
  expect(res.status).toBe(400);
});
```

### 통합 테스트
- Supabase 실제 DB에서 레코드 생성 확인
- RLS 정책 적용 확인 (다른 사용자 접근 불가)

### 성능 테스트
- 응답 시간 < 500ms 확인

---

## 관련 이슈

- db-001: emotion_records 테이블
- db-002: RLS 정책
- auth-002: JWT 인증
- record-001~009: UI 폼 (이 API와 통신)

---

## 참고 자료

- spec-fixed.md의 "6. API 명세"
- Hono 공식 문서: https://hono.dev
- Zod 검증: https://zod.dev
- Supabase JS 클라이언트: https://supabase.com/docs/reference/javascript

---

## 체크리스트

- [ ] 스키마 검증 (Zod) 설정
- [ ] JWT 인증 미들웨어 확인
- [ ] POST 핸들러 구현
- [ ] 에러 처리 로직
- [ ] 단위 테스트
- [ ] 통합 테스트 (실제 DB)
- [ ] 성능 테스트
- [ ] 팀원 코드 리뷰
- [ ] API 문서 작성 (OpenAPI/Swagger)

---

**작성일**: 2026-07-02  
**마지막 수정**: 2026-07-02
