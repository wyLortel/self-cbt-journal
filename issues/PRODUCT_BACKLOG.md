# Product Backlog - Self Mental

전체 기능 목록, 우선순위 기준으로 정렬. 각 이슈의 상세 조건은 폴더별 이슈 파일 참고.

---

## 백로그 요약

| Phase | 기능 그룹 | 항목 수 | 상태 |
|-------|---------|--------|------|
| **MVP** | 인증 (00-auth) | 4 | 🔴 Not Started |
| | 감정 기록 작성 (01-emotion-record) | 9 | 🔴 Not Started |
| | 기록 관리 (02-record-management) | 4 | 🔴 Not Started |
| | 기록 목록 (03-record-list) | 1 | 🔴 Not Started |
| | 마이페이지 (04-my-page) | 3 | 🔴 Not Started |
| | UI 공통 (05-ui-common) | 5 | 🔴 Not Started |
| | 데이터베이스 (06-database) | 2 | 🔴 Not Started |
| | API (07-api) | 8 | 🔴 Not Started |
| **MVP 소계** | | **36 이슈** | |
| **v1.1** | 검색/필터 | 3 | 🔵 Backlog |
| | 통계 | 2 | 🔵 Backlog |
| | 소셜 로그인 | 2 | 🔵 Backlog |
| **v2.0+** | AI 기능 | TBD | 🔵 Future |

---

## 우선순위 기준

### 1. 핵심 가치 (Critical)
- 사용자 가입/로그인 없으면 시작 불가
- 감정 기록 9단계 없으면 핵심 기능 구현 불가

### 2. 의존성 (Blocking)
- 데이터베이스 스키마 없으면 API 구현 불가
- 인증 없으면 기록 저장 불가

### 3. 완성도 (Completeness)
- UI 공통 컴포넌트 먼저 구현 → 페이지 구현 속도 빨라짐

---

## MVP 실행 순서

```
Week 1-2:
├─ 데이터베이스 설계 & 생성 (06-database)
├─ API 기본 구조 & 인증 (07-api, 00-auth)
└─ UI 공통 컴포넌트 (05-ui-common)

Week 2-3:
├─ 감정 기록 9단계 API & UI (07-api, 01-emotion-record)
└─ 기록 관리 (02-record-management)

Week 3-4:
├─ 기록 목록 (03-record-list)
├─ 마이페이지 (04-my-page)
├─ 배포 설정 (Vercel)
└─ 통합 테스트 & 버그 수정
```

---

## 이슈 상태 범례

| 상태 | 표기 | 의미 |
|------|------|------|
| Not Started | 🔴 | 아직 시작 안 함 |
| In Progress | 🟡 | 현재 진행 중 |
| Review | 🟠 | PR 리뷰 대기 중 |
| Completed | 🟢 | 완료 |
| Backlog | 🔵 | MVP 이후 예정 |
| Future | ⚪ | 구체화 필요 |

---

## 상세 백로그

### Phase: MVP

#### 00-auth (인증) — Priority: 🔴 Critical
기능 없으면 시작 불가. 가장 먼저 구현.

| ID | 이슈 | 우선순위 | 복잡도 | 상태 |
|----|------|----------|--------|------|
| auth-001 | [회원가입] 이메일/비밀번호 가입 폼 UI | P0 | 🟢 Low | 🔴 |
| auth-002 | [로그인] 이메일/비밀번호 로그인 API | P0 | 🟢 Low | 🔴 |
| auth-003 | [비밀번호 재설정] 이메일 기반 초기화 | P1 | 🟡 Mid | 🔴 |
| auth-004 | [로그아웃] 세션 종료 | P0 | 🟢 Low | 🔴 |

**상세**: `00-auth/` 폴더 참고

---

#### 01-emotion-record (감정 기록 작성) — Priority: 🔴 Critical
핵심 기능. 가장 복잡.

| ID | 이슈 | 우선순위 | 복잡도 | 상태 |
|----|------|----------|--------|------|
| record-001 | [1단계] 상황 입력 폼 | P0 | 🟢 Low | 🔴 |
| record-002 | [2단계] 감정 선택 UI (7개 감정) | P0 | 🟢 Low | 🔴 |
| record-003 | [3단계] 감정 강도 슬라이더 | P0 | 🟡 Mid | 🔴 |
| record-004 | [4단계] 자동 생각 입력 | P0 | 🟢 Low | 🔴 |
| record-005 | [5단계] 사실 vs 해석 분리 입력 | P0 | 🟡 Mid | 🔴 |
| record-006 | [6단계] 인지 왜곡 다중 선택 UI | P0 | 🟡 Mid | 🔴 |
| record-007 | [7단계] 찬성/반대 근거 입력 | P0 | 🟢 Low | 🔴 |
| record-008 | [8단계] 대안 생각 입력 | P0 | 🟢 Low | 🔴 |
| record-009 | [9단계] 작은 행동 입력 | P0 | 🟢 Low | 🔴 |

**상세**: `01-emotion-record/` 폴더 참고

---

#### 02-record-management (기록 관리) — Priority: 🔴 Critical

| ID | 이슈 | 우선순위 | 복잡도 | 상태 |
|----|------|----------|--------|------|
| manage-001 | [저장] 임시 저장 (자동 저장) | P0 | 🟡 Mid | 🔴 |
| manage-002 | [조회] 저장된 기록 상세 보기 | P0 | 🟢 Low | 🔴 |
| manage-003 | [수정] 기록 수정 페이지 | P0 | 🟡 Mid | 🔴 |
| manage-004 | [삭제] 기록 삭제 (재확인 팝업) | P0 | 🟢 Low | 🔴 |

**상세**: `02-record-management/` 폴더 참고

---

#### 03-record-list (기록 목록) — Priority: 🔴 Critical

| ID | 이슈 | 우선순위 | 복잡도 | 상태 |
|----|------|----------|--------|------|
| list-001 | [목록] 기록 목록 조회 (최신순, 페이징) | P0 | 🟡 Mid | 🔴 |

**상세**: `03-record-list/` 폴더 참고

---

#### 04-my-page (마이페이지) — Priority: 🔴 Critical (나중)

| ID | 이슈 | 우선순위 | 복잡도 | 상태 |
|----|------|----------|--------|------|
| mypage-001 | [프로필] 계정 정보 표시 | P1 | 🟢 Low | 🔴 |
| mypage-002 | [로그아웃] 마이페이지에서 로그아웃 | P0 | 🟢 Low | 🔴 |
| mypage-003 | [v1.1] 비밀번호 변경 | P2 | 🟢 Low | 🔵 |

**상세**: `04-my-page/` 폴더 참고

---

#### 05-ui-common (UI 공통 컴포넌트) — Priority: 🟡 High
모든 페이지의 기초. 먼저 구현하면 나머지 속도 빨라짐.

| ID | 이슈 | 우선순위 | 복잡도 | 상태 |
|----|------|----------|--------|------|
| ui-001 | [Header] 앱 헤더 컴포넌트 | P0 | 🟢 Low | 🔴 |
| ui-002 | [Sidebar] 사이드바 네비게이션 | P0 | 🟢 Low | 🔴 |
| ui-003 | [Button] Primary/Secondary/Danger 버튼 세트 | P0 | 🟢 Low | 🔴 |
| ui-004 | [Input] 텍스트/비밀번호 입력창 | P0 | 🟢 Low | 🔴 |
| ui-005 | [Toast/Modal] 알림 및 모달 컴포넌트 | P0 | 🟡 Mid | 🔴 |

**상세**: `05-ui-common/` 폴더 참고

---

#### 06-database (데이터베이스 설계) — Priority: 🟡 High (가장 먼저)
API 구현의 기초.

| ID | 이슈 | 우선순위 | 복잡도 | 상태 |
|----|------|----------|--------|------|
| db-001 | [Schema] emotion_records 테이블 생성 | P0 | 🟡 Mid | 🔴 |
| db-002 | [RLS] Row Level Security 정책 설정 | P0 | 🟠 High | 🔴 |

**상세**: `06-database/` 폴더 참고

---

#### 07-api (API 구현) — Priority: 🔴 Critical

| ID | 이슈 | 우선순위 | 복잡도 | 상태 |
|----|------|----------|--------|------|
| api-001 | [Auth] 회원가입 API (Supabase) | P0 | 🟡 Mid | 🔴 |
| api-002 | [Auth] 로그인 API | P0 | 🟡 Mid | 🔴 |
| api-003 | [Record] POST /api/records (새 기록 생성) | P0 | 🟡 Mid | 🔴 |
| api-004 | [Record] PATCH /api/records/{id} (수정) | P0 | 🟡 Mid | 🔴 |
| api-005 | [Record] GET /api/records/{id} (조회) | P0 | 🟡 Mid | 🔴 |
| api-006 | [Record] DELETE /api/records/{id} (삭제) | P0 | 🟡 Mid | 🔴 |
| api-007 | [Record] GET /api/records (목록) | P0 | 🟡 Mid | 🔴 |
| api-008 | [Error] 에러 처리 및 재시도 로직 | P1 | 🟡 Mid | 🔴 |

**상세**: `07-api/` 폴더 참고

---

### Phase: v1.1 (MVP 후)

#### 검색 & 필터링 — Priority: 🔵 Backlog
- search-001: 감정별 필터 UI
- search-002: 날짜범위 검색 API
- search-003: 검색 결과 페이지

#### 통계 대시보드 — Priority: 🔵 Backlog
- stats-001: 감정 분포 차트
- stats-002: 시간대별 기록 수 추이

#### 소셜 로그인 — Priority: 🔵 Backlog
- social-001: Google 로그인
- social-002: GitHub 로그인

---

### Phase: v2.0+ (장기)

#### AI 기능
- ai-001: 인지 왜곡 자동 감지
- ai-002: 대안 생각 자동 제안

#### 커뮤니티 & 공유
- community-001: 익명 공유 기능
- community-002: 댓글/피드백

---

## 스프린트 계획 (1 Sprint = 1 주)

### Sprint 1 (Week 1)
- db-001, db-002 (데이터베이스)
- ui-001 ~ ui-005 (공통 UI)
- auth-001, auth-002 (기본 인증)

**목표**: 기초 구조 완성, API 구현 시작 가능 상태

### Sprint 2 (Week 2)
- api-001 ~ api-007 (전체 API)
- record-001 ~ record-009 (1-9단계 UI)

**목표**: 핵심 기능 구현 완료

### Sprint 3 (Week 3)
- manage-001 ~ manage-004 (기록 관리)
- list-001 (기록 목록)
- mypage-001, mypage-002

**목표**: 전체 플로우 동작

### Sprint 4 (Week 4)
- 통합 테스트
- 버그 수정
- 배포 설정
- 성능 최적화

**목표**: MVP 출시 준비

---

## 백로그 관리 규칙

1. **이슈 추가**: 새 이슈는 해당 폴더에 마크다운으로 작성
2. **상태 변경**: `PRODUCT_BACKLOG.md`의 상태 업데이트
3. **우선순위 재검토**: 주간 (매월요일) PM이 검토
4. **완료 확인**: 이슈의 AC 모두 충족 시 🟢 Completed

---

## 다음 단계

- [ ] 각 이슈 상세 조건 작성 (Given-When-Then AC)
- [ ] 팀원과 백로그 리뷰
- [ ] Sprint 1 이슈 선별
- [ ] 각 이슈에 시간 추정 (Planning Poker)

---

**최종 수정**: 2026-07-02  
**담당자**: 정우영
