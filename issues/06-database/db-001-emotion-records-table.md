# Issue: emotion_records 테이블 설계 및 생성

**이슈 ID**: db-001  
**우선순위**: P0 (Critical)  
**복잡도**: 🟡 Mid  
**상태**: 🔴 Not Started  
**예상 소요 시간**: 2-3시간  
**담당자**: (할당 대기)  

---

## 목적

Supabase PostgreSQL에 감정 기록 데이터를 저장할 테이블을 설계하고 생성한다.  
이 테이블이 없으면 전체 API 구현을 할 수 없으므로 **가장 먼저 해야 할 작업**.

---

## 배경

- spec-fixed.md에 데이터 모델이 정의되어 있음
- Supabase 프로젝트는 이미 생성됨 (인증 테이블은 자동 생성)
- 1-9단계 기록을 하나의 JSON 레코드로 저장

---

## 작업 내용

1. Supabase SQL 에디터에서 emotion_records 테이블 생성
2. 모든 컬럼 정의 (상황, 감정, 강도, 자동생각, 사실/해석, 인지왜곡, 근거, 대안, 행동)
3. 인덱스 생성 (user_id, created_at 조합)
4. 삭제 이력 관리 (soft delete, deleted_at 컬럼)
5. Supabase RLS 정책은 db-002에서 처리

---

## 완료 조건 (Acceptance Criteria)

### AC 1: 테이블 생성 완료
- **Given** 테이블이 아직 없는 상태
- **When** Supabase SQL로 emotion_records 테이블 생성 쿼리 실행
- **Then** 테이블이 생성되고 Supabase 콘솔에서 조회 가능

### AC 2: 모든 컬럼 생성
- **Given** 테이블이 생성된 상태
- **When** 각 컬럼(situation, emotion, intensity, automatic_thought, fact, interpretation, cognitive_distortions, supporting_evidence, contradicting_evidence, alternative_thought, small_action, status, created_at, updated_at, deleted_at)을 확인
- **Then** 모든 컬럼이 올바른 타입으로 생성됨

### AC 3: 인덱스 생성
- **Given** 테이블에 컬럼이 모두 있는 상태
- **When** 다음 인덱스 생성: `emotion_records(user_id, created_at)`, `emotion_records(user_id, deleted_at)`
- **Then** 쿼리 성능 테스트 시 인덱스가 사용됨 (EXPLAIN ANALYZE)

### AC 4: 타입 정의
- **Given** 테이블이 생성된 상태
- **When** 다음 컬럼 타입 확인:
  - user_id: UUID (Supabase auth.users와 FK)
  - emotion: enum('불안', '자책', '수치심', '후회', '분노', '좌절', '외로움')
  - intensity: integer (0-100)
  - cognitive_distortions: text[] (배열)
  - status: enum('draft', 'completed')
  - timestamps: created_at, updated_at, deleted_at (timezone aware)
- **Then** 모든 타입이 정확함

### AC 5: Foreign Key 설정
- **Given** users 테이블이 있는 상태
- **When** user_id → auth.users.id FK 설정 + ON DELETE CASCADE
- **Then** 사용자 삭제 시 해당 기록도 삭제됨

---

## 테이블 스키마

```sql
CREATE TABLE IF NOT EXISTS emotion_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- 1단계: 상황
  situation TEXT NOT NULL,
  
  -- 2단계: 감정
  emotion TEXT NOT NULL,
  -- 선택지: '불안', '자책', '수치심', '후회', '분노', '좌절', '외로움'
  
  -- 3단계: 감정 강도
  intensity INTEGER NOT NULL CHECK (intensity >= 0 AND intensity <= 100),
  
  -- 4단계: 자동 생각
  automatic_thought TEXT NOT NULL,
  
  -- 5단계: 사실 vs 해석
  fact TEXT NOT NULL,
  interpretation TEXT NOT NULL,
  
  -- 6단계: 인지 왜곡 (다중 선택, 배열로 저장)
  cognitive_distortions TEXT[] DEFAULT '{}',
  
  -- 7단계: 근거
  supporting_evidence TEXT NOT NULL,
  contradicting_evidence TEXT NOT NULL,
  
  -- 8단계: 대안 생각
  alternative_thought TEXT NOT NULL,
  
  -- 9단계: 작은 행동
  small_action TEXT NOT NULL,
  
  -- 상태
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'completed')),
  
  -- 타임스탬프
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

-- 인덱스
CREATE INDEX idx_emotion_records_user_id_created_at 
  ON emotion_records(user_id, created_at DESC);
  
CREATE INDEX idx_emotion_records_user_id_deleted_at 
  ON emotion_records(user_id, deleted_at);
```

---

## 참고 자료

- [Supabase SQL Editor](https://supabase.com/docs/reference/javascript/introduction)
- [PostgreSQL Enum Types](https://www.postgresql.org/docs/current/datatype-enum.html)
- [PostgreSQL Arrays](https://www.postgresql.org/docs/current/arrays.html)
- spec-fixed.md의 "5. 데이터 모델" 섹션

---

## 관련 이슈

- db-002: RLS 정책 설정
- api-003: POST /api/records 구현 (이 테이블 사용)
- api-004: PATCH /api/records/{id} 구현

---

## 체크리스트

- [ ] Supabase 콘솔 접근 확인
- [ ] SQL 문법 검토 (PostgreSQL 정규식)
- [ ] 데이터 타입 확인 (특히 enum, 배열)
- [ ] FK 및 제약 조건 테스트
- [ ] 인덱스 생성 및 성능 검증
- [ ] 샘플 데이터 삽입 테스트
- [ ] 팀원 리뷰

---

## 추가 노트

**삭제 처리**: 실제 삭제가 아니라 soft delete 사용
- `deleted_at` NULL이면 활성 기록
- `deleted_at`이 설정되면 논리적으로 삭제됨
- 쿼리할 때 WHERE deleted_at IS NULL 조건 항상 포함

**타임존**: 모든 timestamp는 `TIMESTAMP WITH TIME ZONE`으로 UTC 기준 저장

---

**작성일**: 2026-07-02  
**마지막 수정**: 2026-07-02
