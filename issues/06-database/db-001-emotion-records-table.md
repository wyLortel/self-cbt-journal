# Issue: emotion_records 테이블 설계 및 생성

**이슈 ID**: db-001  
**우선순위**: P0 (Critical)  
**복잡도**: 🟡 Mid  
**상태**: 🔴 Not Started  
**예상 소요 시간**: 2-3시간  
**담당자**: (할당 대기)  

---

## 목적

MySQL + Prisma에서 감정 기록 데이터를 저장할 테이블을 설계하고 마이그레이션한다.  
이 테이블이 없으면 전체 API 구현을 할 수 없으므로 **가장 먼저 해야 할 작업**.

---

## 배경

- spec-fixed.md에 데이터 모델이 정의되어 있음
- Prisma 스키마로 MySQL 테이블을 자동 생성
- 1-9단계 기록을 하나의 JSON/TEXT 레코드로 저장

---

## 작업 내용

1. Prisma 스키마에 EmotionRecord 모델 정의
2. 모든 컬럼 정의 (상황, 감정, 강도, 자동생각, 사실/해석, 인지왜곡, 근거, 대안, 행동)
3. 인덱스 생성 (userId, createdAt 조합)
4. 삭제 이력 관리 (soft delete, deletedAt 컬럼)
5. `npx prisma migrate dev --name add_emotion_records` 실행

---

## 완료 조건 (Acceptance Criteria)

### AC 1: 모델 정의 완료
- **Given** EmotionRecord 모델이 prisma/schema.prisma에 정의되지 않은 상태
- **When** EmotionRecord 모델을 스키마에 추가하고 마이그레이션 실행
- **Then** MySQL에 emotion_records 테이블이 생성됨

### AC 2: 모든 컬럼 생성
- **Given** 테이블이 생성된 상태
- **When** 각 컬럼(situation, emotion, intensity, automatic_thought, fact, interpretation, cognitive_distortions, supporting_evidence, contradicting_evidence, alternative_thought, small_action, status, created_at, updated_at, deleted_at)을 확인
- **Then** 모든 컬럼이 올바른 타입으로 생성됨

### AC 3: 인덱스 생성
- **Given** 테이블에 컬럼이 모두 있는 상태
- **When** 다음 인덱스 생성: `emotion_records(userId, createdAt)`, `emotion_records(userId, deletedAt)`
- **Then** 쿼리 성능이 최적화됨

### AC 4: 타입 정의
- **Given** 테이블이 생성된 상태
- **When** 다음 컬럼 타입 확인:
  - userId: String @db.Char(36) (User FK)
  - emotion: String (enum 값: '불안', '자책', '수치심', '후회', '분노', '좌절', '외로움')
  - intensity: Int (0-100)
  - cognitive_distortions: String (JSON or TEXT로 배열 저장)
  - status: String (enum 값: 'draft', 'completed')
  - timestamps: createdAt, updatedAt, deletedAt (DateTime)
- **Then** 모든 타입이 정확함

### AC 5: Foreign Key 설정
- **Given** users 테이블이 있는 상태
- **When** userId → users(id) FK 설정 + onDelete Cascade
- **Then** 사용자 삭제 시 해당 기록도 삭제됨

---

## Prisma 스키마 정의 (예시)

```typescript
model EmotionRecord {
  id                       String   @id @default(uuid()) @db.Char(36)
  userId                   String   @db.Char(36)
  
  // 1단계: 상황
  situation                String   @db.Text

  // 2단계: 감정
  emotion                  String

  // 3단계: 감정 강도
  intensity                Int      // 0-100

  // 4단계: 자동 생각
  automaticThought         String   @db.Text

  // 5단계: 사실 vs 해석
  fact                     String   @db.Text
  interpretation           String   @db.Text

  // 6단계: 인지 왜곡 (JSON 배열로 저장)
  cognitivDistortions      String   @default("[]") @db.Text

  // 7단계: 근거
  supportingEvidence       String   @db.Text
  contradictingEvidence    String   @db.Text

  // 8단계: 대안 생각
  alternativeThought       String   @db.Text

  // 9단계: 작은 행동
  smallAction              String   @db.Text

  // 상태
  status                   String   @default("draft")

  // 타임스탬프
  createdAt                DateTime @default(now())
  updatedAt                DateTime @updatedAt
  deletedAt                DateTime?

  // FK
  user                     User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, createdAt])
  @@index([userId, deletedAt])
  @@map("emotion_records")
}
```

---

## 참고 자료

- [Prisma Schema Reference](https://www.prisma.io/docs/orm/prisma-schema)
- [MySQL Data Types](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#model-field-scalar-types)
- spec-fixed.md의 "5. 데이터 모델" 섹션

---

## 관련 이슈

- db-002: 애플리케이션 레벨 접근 제어 문서 갱신
- api-003: POST /api/records 구현 (이 테이블 사용)
- api-004: PATCH /api/records/{id} 구현

---

## 체크리스트

- [ ] Prisma 스키마에 EmotionRecord 모델 추가
- [ ] `npx prisma migrate dev --name add_emotion_records` 실행
- [ ] MySQL에서 emotion_records 테이블 생성 확인
- [ ] 데이터 타입 확인 (특히 cognitive_distortions JSON 저장)
- [ ] FK 및 제약 조건 테스트
- [ ] 인덱스 생성 및 성능 검증
- [ ] 샘플 데이터 삽입 테스트
- [ ] 팀원 리뷰

---

## 추가 노트

**삭제 처리**: 실제 삭제가 아니라 soft delete 사용
- `deletedAt` NULL이면 활성 기록
- `deletedAt`이 설정되면 논리적으로 삭제됨
- 쿼리할 때 WHERE deletedAt IS NULL 조건 항상 포함

**타임존**: 모든 timestamp는 UTC 기준 저장 (JavaScript의 Date 객체는 자동으로 UTC 기준)

**인지 왜곡**: JSON 문자열로 저장 (예: `["흑백사고", "재앙화"]`)
- 저장: `JSON.stringify(selectedDistortions)`
- 조회: `JSON.parse(record.cognitivDistortions)`

---

**작성일**: 2026-07-02  
**마지막 수정**: 2026-07-08
