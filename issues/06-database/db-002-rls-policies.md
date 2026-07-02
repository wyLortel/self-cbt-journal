# Issue: RLS (Row Level Security) 정책 설정

**이슈 ID**: db-002  
**우선순위**: P0 (Critical)  
**복잡도**: 🟠 High  
**상태**: 🔴 Not Started  
**예상 소요 시간**: 3-4시간  
**담당자**: (할당 대기)  

---

## 목적

Supabase RLS를 설정하여 **사용자가 본인의 감정 기록만 접근**하도록 강제한다.  
이것이 없으면 다른 사용자의 기록을 볼 수 있는 보안 취약점 발생.

---

## 배경

- emotion_records 테이블이 이미 생성됨 (db-001 완료)
- Supabase RLS는 PostgreSQL 레이어에서 강제됨
- 개발 환경에서는 테스트, 배포 환경에서는 필수 활성화

---

## 작업 내용

1. Supabase 콘솔 → Authentication → RLS 활성화
2. emotion_records 테이블에 4개 정책 작성:
   - SELECT: 사용자가 본인 기록만 조회
   - INSERT: 사용자가 본인 user_id로만 삽입
   - UPDATE: 사용자가 본인 기록만 수정
   - DELETE: 사용자가 본인 기록만 삭제
3. 로컬 & 배포 환경 모두에서 테스트

---

## 완료 조건 (Acceptance Criteria)

### AC 1: RLS 활성화
- **Given** emotion_records 테이블이 있는 상태
- **When** Supabase 콘솔에서 RLS 토글 ON
- **Then** 테이블에 "RLS enabled" 표시됨

### AC 2: SELECT 정책
- **Given** RLS가 활성화된 상태
- **When** `auth.uid() = user_id` 정책으로 SELECT 정책 생성
- **Then** API로 조회 시 auth.uid()와 user_id가 일치하는 기록만 반환

**테스트**:
```
Given 사용자 A 인증 상태
When GET /api/records (사용자 A의 토큰으로)
Then 응답에 A의 기록만 포함, B의 기록 0개
```

### AC 3: INSERT 정책
- **Given** RLS SELECT 정책이 있는 상태
- **When** INSERT 정책 생성: `auth.uid() = user_id`
- **Then** user_id가 auth.uid()와 다르면 INSERT 실패 (Policy violation)

**테스트**:
```
Given 사용자 A 인증 상태, 시도하는 데이터: user_id=B
When POST /api/records (user_id=B로 시도)
Then 403 Forbidden 또는 정책 위반 에러
```

### AC 4: UPDATE 정책
- **Given** INSERT 정책이 있는 상태
- **When** UPDATE 정책 생성: `auth.uid() = user_id`
- **Then** 본인의 기록만 수정 가능, 다른 사용자 기록 수정 불가

### AC 5: DELETE 정책
- **Given** UPDATE 정책이 있는 상태
- **When** DELETE 정책 생성: `auth.uid() = user_id`
- **Then** 본인의 기록만 삭제 가능

### AC 6: 통합 테스트
- **Given** 모든 RLS 정책이 설정된 상태
- **When** 다음 시나리오 테스트:
  1. 사용자 A 로그인 → 사용자 A의 기록 조회 → ✓ 성공
  2. 사용자 A 로그인 → 사용자 B의 기록 조회 시도 → ✗ 0개 반환
  3. 사용자 A 로그인 → 사용자 B의 기록 수정 시도 → ✗ 정책 위반
- **Then** 모든 시나리오가 예상대로 동작

---

## RLS 정책 코드

```sql
-- RLS 활성화
ALTER TABLE emotion_records ENABLE ROW LEVEL SECURITY;

-- 1. SELECT: 사용자가 본인 기록만 조회
CREATE POLICY "Users can view own records"
  ON emotion_records FOR SELECT
  USING (auth.uid() = user_id);

-- 2. INSERT: 사용자가 본인 user_id로만 삽입
CREATE POLICY "Users can insert own records"
  ON emotion_records FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 3. UPDATE: 사용자가 본인 기록만 수정
CREATE POLICY "Users can update own records"
  ON emotion_records FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 4. DELETE: 사용자가 본인 기록만 삭제
CREATE POLICY "Users can delete own records"
  ON emotion_records FOR DELETE
  USING (auth.uid() = user_id);
```

---

## 테스트 계획

### 로컬 테스트 (개발 중)

```javascript
// supabase-js 클라이언트로 테스트
const supabase = createClient(url, key);

// 1. 사용자 A로 로그인
await supabase.auth.signInWithPassword({
  email: 'userA@test.com',
  password: 'password123'
});

// 2. 사용자 A의 기록만 조회되는지 확인
const { data: myRecords } = await supabase
  .from('emotion_records')
  .select('*');
// ✓ myRecords.length > 0 && myRecords.every(r => r.user_id === auth.uid())

// 3. 다른 사용자의 기록은 안 보이는지 확인
const { data: otherUserRecords } = await supabase
  .from('emotion_records')
  .select('*')
  .eq('user_id', 'other-user-id');
// ✓ otherUserRecords.length === 0
```

### 배포 환경 테스트

- Vercel에서 staging 환경으로 배포
- 실제 Supabase 프로덕션 DB에 대해 테스트
- API 엔드포인트를 통한 통합 테스트

---

## 주의사항

⚠️ **서비스 롤(Service Role) 바이패스**
- 백엔드 API에서는 서비스 롤 키를 사용하므로 RLS 바이패스 가능
- 따라서 API 레이어에서도 `user_id` 검증 필수!

**API에서 해야 할 것**:
```typescript
// ❌ 나쁜 예: user_id를 클라이언트에서 받음
const insertRecord = async (req) => {
  const { user_id, situation } = req.body;
  // ← user_id를 신뢰하면 안 됨!
  await supabase.from('emotion_records').insert({ user_id, situation });
};

// ✅ 좋은 예: 인증 토큰에서 user_id 추출
const insertRecord = async (req) => {
  const user_id = req.user.id; // JWT에서 추출
  const { situation } = req.body;
  await supabase.from('emotion_records').insert({ user_id, situation });
};
```

---

## 참고 자료

- [Supabase RLS 공식 문서](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL RLS 문법](https://www.postgresql.org/docs/current/sql-createpolicy.html)
- [Supabase 보안 best practices](https://supabase.com/docs/guides/auth/hardening)

---

## 관련 이슈

- db-001: emotion_records 테이블 생성
- api-003: API 레이어에서 user_id 검증
- auth-001: 사용자 인증 (JWT 토큰 생성)

---

## 체크리스트

- [ ] Supabase 콘솔 접근 확인
- [ ] RLS 활성화
- [ ] 4개 정책 모두 생성
- [ ] 로컬 테스트 (개발 환경)
- [ ] 배포 환경 테스트
- [ ] API 레이어 user_id 검증 로직 확인
- [ ] 팀원 보안 리뷰

---

**작성일**: 2026-07-02  
**마지막 수정**: 2026-07-02
