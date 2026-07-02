# API Specification - Self Mental

백엔드 API 엔드포인트 상세 정의

---

## 🌐 기본 설정

**Base URL**: `https://api.selfmental.com` (또는 `http://localhost:3000`)  
**인증**: Bearer Token (JWT) - `Authorization: Bearer {token}`  
**Content-Type**: `application/json`  
**응답 형식**:
```json
{
  "success": true,
  "data": { ... },
  "error": null
}
```

---

## 🔐 Authentication (인증)

### POST /auth/signup
**설명**: 새 사용자 회원가입

**요청**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**응답** (201):
```json
{
  "success": true,
  "data": {
    "user_id": "uuid-xxx",
    "email": "user@example.com",
    "token": "eyJhbGc...",
    "created_at": "2026-07-02T10:30:00Z"
  },
  "error": null
}
```

**에러** (400):
```json
{
  "success": false,
  "data": null,
  "error": "Email already exists" 또는 "Password too weak"
}
```

---

### POST /auth/login
**설명**: 사용자 로그인

**요청**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**응답** (200):
```json
{
  "success": true,
  "data": {
    "user_id": "uuid-xxx",
    "email": "user@example.com",
    "token": "eyJhbGc...",
    "expires_at": "2026-07-09T10:30:00Z"
  },
  "error": null
}
```

**에러** (401):
```json
{
  "success": false,
  "data": null,
  "error": "Invalid email or password"
}
```

---

### POST /auth/logout
**설명**: 로그아웃

**인증**: Required ✅

**요청**: 빈 body

**응답** (200):
```json
{
  "success": true,
  "data": null,
  "error": null
}
```

---

### POST /auth/forgot-password
**설명**: 비밀번호 재설정 메일 발송

**요청**:
```json
{
  "email": "user@example.com"
}
```

**응답** (200):
```json
{
  "success": true,
  "data": {
    "message": "Password reset email sent to user@example.com"
  },
  "error": null
}
```

---

## 📝 Records (기록)

### POST /api/records
**설명**: 새 감정 기록 생성

**인증**: Required ✅

**요청**:
```json
{
  "situation": "팀플 회의에서 내 의견을 팀장이 무시한 것 같았다",
  "emotion": "불안",
  "intensity": 80,
  "automatic_thought": "내 능력이 부족해서 무시당하는 거구나",
  "fact": "팀장이 내 의견에 응답 안 함",
  "interpretation": "내 능력이 부족하기 때문",
  "cognitive_distortions": ["과잉일반화", "개인화"],
  "supporting_evidence": "지난 프로젝트에서도 피드백 못 받음",
  "contradicting_evidence": "다른 팀원도 같은 경험",
  "alternative_thought": "팀장이 바빴을 수도, 내 의견 품질이 부족했을 수도",
  "small_action": "다음 회의 전에 의견 정리해서 발표하기",
  "status": "draft" (선택) 또는 "completed"
}
```

**응답** (201):
```json
{
  "success": true,
  "data": {
    "id": "record-uuid-xxx",
    "user_id": "user-uuid-xxx",
    "situation": "팀플 회의에서...",
    "emotion": "불안",
    "intensity": 80,
    "automatic_thought": "...",
    "fact": "...",
    "interpretation": "...",
    "cognitive_distortions": ["과잉일반화", "개인화"],
    "supporting_evidence": "...",
    "contradicting_evidence": "...",
    "alternative_thought": "...",
    "small_action": "...",
    "status": "draft",
    "created_at": "2026-07-02T14:30:00Z",
    "updated_at": "2026-07-02T14:30:00Z"
  },
  "error": null
}
```

**에러** (400):
```json
{
  "success": false,
  "data": null,
  "error": "situation is required" 또는 "emotion must be one of ..."
}
```

---

### GET /api/records
**설명**: 사용자의 모든 감정 기록 조회 (페이징)

**인증**: Required ✅

**쿼리 파라미터**:
```
?page=1&limit=10&filter=all&sort=created_at,desc
```
- `page`: 페이지 번호 (기본값: 1)
- `limit`: 페이지당 기록 수 (기본값: 10)
- `filter`: "all" | "completed" | "draft" (기본값: all)
- `sort`: "created_at,desc" | "created_at,asc" | "intensity,desc"

**응답** (200):
```json
{
  "success": true,
  "data": {
    "records": [
      {
        "id": "record-uuid-1",
        "emotion": "불안",
        "intensity": 80,
        "situation": "팀플 회의에서...",
        "status": "completed",
        "created_at": "2026-07-02T14:30:00Z"
      },
      {
        "id": "record-uuid-2",
        "emotion": "자책",
        "intensity": 65,
        "situation": "발표 피드백...",
        "status": "draft",
        "created_at": "2026-07-01T22:15:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 24,
      "total_pages": 3
    }
  },
  "error": null
}
```

---

### GET /api/records/{id}
**설명**: 특정 기록 조회

**인증**: Required ✅

**응답** (200):
```json
{
  "success": true,
  "data": {
    "id": "record-uuid-xxx",
    "user_id": "user-uuid-xxx",
    "situation": "팀플 회의에서...",
    "emotion": "불안",
    "intensity": 80,
    "automatic_thought": "...",
    "fact": "...",
    "interpretation": "...",
    "cognitive_distortions": ["과잉일반화", "개인화"],
    "supporting_evidence": "...",
    "contradicting_evidence": "...",
    "alternative_thought": "...",
    "small_action": "...",
    "status": "completed",
    "created_at": "2026-07-02T14:30:00Z",
    "updated_at": "2026-07-02T15:00:00Z"
  },
  "error": null
}
```

**에러** (404):
```json
{
  "success": false,
  "data": null,
  "error": "Record not found"
}
```

---

### PATCH /api/records/{id}
**설명**: 기록 수정

**인증**: Required ✅

**요청** (모든 필드 선택):
```json
{
  "situation": "수정된 상황",
  "emotion": "자책",
  "intensity": 75,
  "automatic_thought": "...",
  "fact": "...",
  "interpretation": "...",
  "cognitive_distortions": ["결론도약"],
  "supporting_evidence": "...",
  "contradicting_evidence": "...",
  "alternative_thought": "...",
  "small_action": "...",
  "status": "completed"
}
```

**응답** (200):
```json
{
  "success": true,
  "data": {
    "id": "record-uuid-xxx",
    "situation": "수정된 상황",
    "emotion": "자책",
    "intensity": 75,
    "status": "completed",
    "updated_at": "2026-07-02T15:30:00Z"
    // ... 모든 필드
  },
  "error": null
}
```

---

### DELETE /api/records/{id}
**설명**: 기록 삭제

**인증**: Required ✅

**요청**: 빈 body

**응답** (200):
```json
{
  "success": true,
  "data": {
    "id": "record-uuid-xxx",
    "message": "Record deleted successfully"
  },
  "error": null
}
```

**에러** (404):
```json
{
  "success": false,
  "data": null,
  "error": "Record not found"
}
```

---

## 👤 User (사용자)

### GET /api/user
**설명**: 현재 사용자 정보 조회

**인증**: Required ✅

**응답** (200):
```json
{
  "success": true,
  "data": {
    "user_id": "user-uuid-xxx",
    "email": "user@example.com",
    "created_at": "2026-06-01T10:00:00Z"
  },
  "error": null
}
```

---

### PATCH /api/user/password
**설명**: 비밀번호 변경

**인증**: Required ✅

**요청**:
```json
{
  "current_password": "OldPassword123!",
  "new_password": "NewPassword456!"
}
```

**응답** (200):
```json
{
  "success": true,
  "data": {
    "message": "Password changed successfully"
  },
  "error": null
}
```

**에러** (401):
```json
{
  "success": false,
  "data": null,
  "error": "Current password is incorrect"
}
```

---

### DELETE /api/user
**설명**: 계정 삭제 (v1.1)

**인증**: Required ✅

**요청**:
```json
{
  "password": "password123"
}
```

**응답** (200):
```json
{
  "success": true,
  "data": {
    "message": "Account deleted successfully"
  },
  "error": null
}
```

---

## 🚨 에러 코드

| 코드 | 메시지 | 원인 |
|------|--------|------|
| 400 | Bad Request | 유효성 검사 실패 |
| 401 | Unauthorized | 인증 실패 또는 토큰 만료 |
| 403 | Forbidden | 권한 없음 (다른 사용자 기록 접근) |
| 404 | Not Found | 리소스 없음 |
| 500 | Internal Server Error | 서버 에러 |

---

## 📋 데이터 타입 정의

### Emotion (감정)
```typescript
type Emotion = '불안' | '자책' | '수치심' | '후회' | '분노' | '좌절' | '외로움';
```

### CognitiveDistortion (인지 왜곡)
```typescript
type CognitiveDistortion = 
  | '과잉일반화'
  | '결론도약'
  | '개인화'
  | '확대축소'
  | '흑백사고'
  | '라벨붙이기'
  | '감정적추론';
```

### RecordStatus (기록 상태)
```typescript
type RecordStatus = 'draft' | 'completed';
```

### Record (기록 전체)
```typescript
interface Record {
  id: string;
  user_id: string;
  situation: string;
  emotion: Emotion;
  intensity: number; // 0-100
  automatic_thought: string;
  fact: string;
  interpretation: string;
  cognitive_distortions: CognitiveDistortion[];
  supporting_evidence: string;
  contradicting_evidence: string;
  alternative_thought: string;
  small_action: string;
  status: RecordStatus;
  created_at: ISO8601DateTime;
  updated_at: ISO8601DateTime;
  deleted_at?: ISO8601DateTime; // soft delete
}
```

---

## ✅ 프론트엔드 구현 체크리스트

### Auth API 호출
- [ ] POST /auth/signup (회원가입 페이지)
- [ ] POST /auth/login (로그인 페이지)
- [ ] POST /auth/logout (헤더/마이페이지)
- [ ] POST /auth/forgot-password (비밀번호 찾기)

### Records API 호출
- [ ] POST /api/records (기록 작성 페이지 저장)
- [ ] GET /api/records (기록 목록 페이지)
- [ ] GET /api/records/{id} (기록 상세 페이지)
- [ ] PATCH /api/records/{id} (기록 수정)
- [ ] DELETE /api/records/{id} (기록 삭제)

### User API 호출
- [ ] GET /api/user (마이페이지)
- [ ] PATCH /api/user/password (비밀번호 변경)
- [ ] DELETE /api/user (계정 삭제)

---

## 🔧 백엔드 구현 체크리스트

### Authentication
- [ ] POST /auth/signup (Supabase Auth)
- [ ] POST /auth/login (Supabase Auth)
- [ ] POST /auth/logout (토큰 무효화)
- [ ] POST /auth/forgot-password (이메일 발송)

### Records CRUD
- [ ] POST /api/records (insert + RLS)
- [ ] GET /api/records (select + 페이징 + 필터)
- [ ] GET /api/records/{id} (select by id + RLS)
- [ ] PATCH /api/records/{id} (update + RLS)
- [ ] DELETE /api/records/{id} (soft delete + RLS)

### Error Handling
- [ ] 입력 검증 (email, password, intensity 범위 등)
- [ ] RLS 정책 적용 (다른 사용자 접근 불가)
- [ ] 에러 메시지 표준화
- [ ] 로깅 (에러, API 호출 시간 등)

---

**작성일**: 2026-07-02  
**최종 수정**: 2026-07-02
