# 로그인 페이지 - UI 요소 분해 및 이슈 목록

**페이지**: Login Page (Image #2)  
**총 이슈 개수**: 8개  
**의존성**: ui-common (버튼, 입력창) 필요

---

## 🎨 페이지 구조 분해

```
┌─────────────────────────────────────┐
│  로그인 페이지                       │
├─────────────────────────────────────┤
│                                     │
│  ┌─ Header Section ─────────────┐  │
│  │ · Self Mental 로고            │  │
│  │ · 제목: "다시 돌아오신 걸"    │  │
│  │ · 부제: "오늘 마음이..."      │  │
│  └─────────────────────────────┘  │
│                                     │
│  ┌─ Social Login Section ────────┐ │
│  │ · Google 로그인 버튼           │ │
│  │ · GitHub 로그인 버튼           │ │
│  │ · "또는" 구분선                │ │
│  └─────────────────────────────┘ │
│                                     │
│  ┌─ Email/Password Section ──────┐ │
│  │ · 이메일 입력 필드             │ │
│  │ · 비밀번호 입력 필드           │ │
│  │ · 로그인 버튼                 │ │
│  │ · "비밀번호를 잊으셨나요?" 링크│ │
│  └─────────────────────────────┘ │
│                                     │
│  ┌─ Signup Link Section ─────────┐ │
│  │ · "아직 계정이 없나요? 회원가입"│ │
│  └─────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

---

## 📋 이슈 목록

### Group 1: Header & Layout

#### Issue UI-LOGIN-001: 로그인 페이지 레이아웃
**복잡도**: 🟢 Low | **소요시간**: 1시간

```markdown
# Issue: 로그인 페이지 전체 레이아웃

## 목적
중앙 정렬 카드 형태의 로그인 페이지 구조 구현

## 완료 조건 (Acceptance Criteria)

### AC 1: 페이지 구조
- Given 사용자가 /login 접근
- When 페이지 로드
- Then 다음이 보임:
  - 중앙 정렬된 흰색 카드 (max-width: 500px)
  - 카드는 rounded-3xl, shadow-xl
  - 좌우에 배경 일러스트 표시 (모바일에서는 숨김)

### AC 2: 반응형
- Given 모바일 기기 (375px)
- When 페이지 로드
- Then 카드가 전체 너비, 패딩 조정, 일러스트 숨김

### AC 3: 배경색
- Given 페이지 렌더링
- When 배경 확인
- Then 따뜻한 밝은 색상 (#F8F7F4 또는 유사)
```

---

#### Issue UI-LOGIN-002: 헤더 섹션 (로고 + 제목 + 부제)
**복잡도**: 🟢 Low | **소요시간**: 1시간

```markdown
# Issue: 로그인 페이지 헤더 (로고, 제목, 부제)

## 목적
Self Mental 로고, 제목, 부제를 적절한 크기와 간격으로 배치

## 설계 참고
- 로고: Self Mental 아이콘 + 텍스트
- 제목: "다시 돌아오신 걸 환영해요." (text-2xl, font-bold)
- 부제: "오늘 마음이 복잡했다면, 천천히 정리해볼까요?" (text-sm, text-gray-500)

## 완료 조건 (Acceptance Criteria)

### AC 1: 로고 표시
- Given 로그인 페이지 로드
- When 카드의 상단 중앙 확인
- Then Self Mental 로고가 text-center, 적절한 크기로 표시됨

### AC 2: 제목 렌더링
- Given 로고 아래
- When 텍스트 확인
- Then "다시 돌아오신 걸 환영해요." 텍스트가 text-2xl, font-bold, 중앙 정렬

### AC 3: 부제 렌더링
- Given 제목 아래
- When 텍스트 확인
- Then 부제가 text-sm, text-gray-500, 여러 줄 지원

### AC 4: 간격
- Given 로고, 제목, 부제 배치
- When space-y-3 등으로 간격 확인
- Then 각 요소 간 여유 있는 공간 (> 10px)
```

---

### Group 2: Social Login

#### Issue UI-LOGIN-003: Google 로그인 버튼
**복잡도**: 🟡 Mid | **소요시간**: 2시간

```markdown
# Issue: Google 로그인 버튼 구현

## 목적
Google OAuth 로그인 기능이 있는 버튼 UI 구현

## 작업 내용
1. Google 아이콘 표시
2. "Google로 계속하기" 텍스트
3. 클릭 시 Google OAuth 팝업

## 완료 조건 (Acceptance Criteria)

### AC 1: 버튼 렌더링
- Given 로그인 페이지에서 소셜 로그인 섹션
- When 버튼 확인
- Then 다음이 보임:
  - Google 아이콘 (좌측)
  - "Google로 계속하기" 텍스트 (중앙)
  - 전체 너비, h-12, border-1 border-gray-200, rounded-xl

### AC 2: Hover 상태
- Given 버튼에 마우스 오버
- When 상태 확인
- Then 배경색 변경 (bg-gray-50), border 색상 진해짐

### AC 3: Google OAuth 연결
- Given 사용자가 Google 버튼 클릭
- When 클릭 동작
- Then Google OAuth 로그인 창 표시

### AC 4: 회원가입 자동 처리
- Given Google 로그인 성공 (신규 사용자)
- When 콜백 처리
- Then 자동으로 회원 생성 후 대시보드로 리다이렉트

### AC 5: 기존 사용자 처리
- Given Google 로그인 성공 (기존 사용자)
- When 콜백 처리
- Then 대시보드로 리다이렉트
```

---

#### Issue UI-LOGIN-004: GitHub 로그인 버튼
**복잡도**: 🟡 Mid | **소요시간**: 2시간

```markdown
# Issue: GitHub 로그인 버튼 구현

## 목적
GitHub OAuth 로그인 기능이 있는 버튼 UI 구현

## 완료 조건 (Acceptance Criteria)

### AC 1: 버튼 렌더링
- Given 로그인 페이지에서 Google 버튼 아래
- When 버튼 확인
- Then 다음이 보임:
  - GitHub 아이콘 (좌측, 검은색 또는 흰색)
  - "GitHub로 계속하기" 텍스트
  - Google 버튼과 동일한 스타일 (h-12, rounded-xl, border)

### AC 2: Hover 상태
- Given 버튼에 마우스 오버
- When 상태 확인
- Then 배경색 변경 (bg-gray-50)

### AC 3: GitHub OAuth 연결
- Given 사용자가 GitHub 버튼 클릭
- When 클릭 동작
- Then GitHub OAuth 로그인 창 표시
```

---

#### Issue UI-LOGIN-005: 소셜 로그인 구분선 ("또는")
**복잡도**: 🟢 Low | **소요시간**: 30분

```markdown
# Issue: 소셜/이메일 로그인 구분선

## 목적
"또는" 텍스트와 선으로 두 로그인 방식 구분

## 설계
```
───────────  또는  ───────────
```

## 완료 조건 (Acceptance Criteria)

### AC 1: 구분선 렌더링
- Given Google, GitHub 버튼 아래
- When 섹션 확인
- Then 가로선 - "또는" - 가로선이 중앙 정렬로 표시

### AC 2: 스타일
- Given 구분선 요소 확인
- When 색상/너비 확인
- Then 가로선은 border-gray-200, "또는"는 text-gray-400 (text-sm)
```

---

### Group 3: Email/Password Login

#### Issue UI-LOGIN-006: 이메일 입력 필드
**복잡도**: 🟢 Low | **소요시간**: 1시간

```markdown
# Issue: 로그인 이메일 입력 필드

## 목적
유효성 검사를 포함한 이메일 입력 필드 구현

## 완료 조건 (Acceptance Criteria)

### AC 1: 필드 렌더링
- Given "또는" 구분선 아래
- When 입력 필드 확인
- Then 다음이 보임:
  - 레이블: "이메일" (text-sm, font-medium, text-gray-700)
  - 입력 필드: placeholder="이메일을 입력하세요" (h-12, w-full, rounded-xl)

### AC 2: 포커스 상태
- Given 입력 필드에 포커스
- When 상태 확인
- Then border-indigo-500, ring-4 ring-indigo-100 표시

### AC 3: 이메일 유효성 검사 (실시간)
- Given 유효하지 않은 이메일 입력 (예: "abc@")
- When 입력 후 다른 필드로 이동
- Then "유효한 이메일을 입력하세요" 에러 메시지 표시 (text-red-500, text-sm)

### AC 4: 유효한 이메일
- Given 유효한 이메일 입력 (예: "user@example.com")
- When 유효성 확인
- Then 에러 메시지 사라짐, 필드 정상 상태
```

---

#### Issue UI-LOGIN-007: 비밀번호 입력 필드
**복잡도**: 🟡 Mid | **소요시간**: 1.5시간

```markdown
# Issue: 로그인 비밀번호 입력 필드 (마스킹 + 표시/숨김 아이콘)

## 목적
비밀번호 보안과 사용성을 모두 고려한 입력 필드

## 완료 조건 (Acceptance Criteria)

### AC 1: 필드 렌더링
- Given 이메일 필드 아래
- When 필드 확인
- Then 다음이 보임:
  - 레이블: "비밀번호"
  - 입력 필드: type="password", placeholder="비밀번호를 입력하세요"
  - 우측에 눈 아이콘 (표시/숨김 토글)

### AC 2: 비밀번호 마스킹
- Given 사용자가 비밀번호 입력
- When 입력 중 확인
- Then 텍스트가 ●●●●●●●● 형태로 마스킹됨

### AC 3: 표시/숨김 토글
- Given 눈 아이콘 클릭
- When 아이콘 상태 변경
- Then 비밀번호가 평문으로 표시됨 (type="text")

### AC 4: 다시 숨기기
- Given 눈 아이콘을 다시 클릭
- When 아이콘 상태 변경
- Then 비밀번호가 다시 마스킹됨

### AC 5: 포커스 상태
- Given 입력 필드에 포커스
- When 상태 확인
- Then border-indigo-500, ring-4 ring-indigo-100 표시
```

---

#### Issue UI-LOGIN-008: 로그인 버튼 + 비밀번호 찾기 링크
**복잡도**: 🟡 Mid | **소요시간**: 2시간

```markdown
# Issue: 로그인 버튼 및 비밀번호 재설정 링크

## 목적
로그인 제출과 비밀번호 찾기 기능 구현

## 완료 조건 (Acceptance Criteria)

### AC 1: 로그인 버튼 렌더링
- Given 비밀번호 필드 아래
- When 버튼 확인
- Then Primary Button (h-12, w-full, bg-indigo-600, text-white, rounded-xl)
  텍스트는 "로그인"

### AC 2: 버튼 활성화 조건
- Given 이메일과 비밀번호가 모두 유효한 상태
- When 버튼 확인
- Then 버튼이 활성화 (cursor-pointer, hover:bg-indigo-700)

### AC 3: 버튼 비활성화
- Given 이메일 또는 비밀번호가 빈 상태
- When 버튼 확인
- Then 버튼이 비활성화 (cursor-not-allowed, bg-gray-200, text-gray-400)

### AC 4: 로딩 상태
- Given 사용자가 로그인 버튼 클릭
- When API 요청 중
- Then 버튼이 disabled, 로딩 스피너 표시 (또는 텍스트 "로그인 중...")

### AC 5: 로그인 성공
- Given 유효한 이메일/비밀번호
- When 로그인 버튼 클릭 → API 성공
- Then 대시보드 (/dashboard)로 자동 리다이렉트

### AC 6: 로그인 실패
- Given 잘못된 비밀번호 또는 없는 이메일
- When 로그인 버튼 클릭 → API 실패
- Then 에러 메시지 표시: "이메일 또는 비밀번호가 잘못되었습니다"
  + 버튼이 다시 활성화됨

### AC 7: 비밀번호 찾기 링크
- Given 로그인 버튼 아래
- When 텍스트 확인
- Then "비밀번호를 잊으셨나요?" (text-indigo-600, text-sm, cursor-pointer)
  + 클릭 시 /forgot-password로 이동
```

---

## 📊 이슈 간 의존성

```
UI-LOGIN-001 (레이아웃)
    ↓
UI-LOGIN-002 (헤더)
UI-LOGIN-003 (Google)
UI-LOGIN-004 (GitHub)
UI-LOGIN-005 (구분선)
    ↓
UI-LOGIN-006 (이메일)
UI-LOGIN-007 (비밀번호)
    ↓
UI-LOGIN-008 (로그인 버튼)
```

---

## ✅ 구현 순서

1. **UI-LOGIN-001** (레이아웃 틀)
2. **UI-LOGIN-002** (헤더)
3. **UI-LOGIN-005** (구분선 - 간단함)
4. **UI-LOGIN-006** (이메일 입력)
5. **UI-LOGIN-007** (비밀번호 입력)
6. **UI-LOGIN-008** (로그인 버튼)
7. **UI-LOGIN-003, UI-LOGIN-004** (소셜 로그인 - 병렬 가능)

---

**작성일**: 2026-07-02  
**페이지**: 로그인 페이지 (Image #2)  
**총 이슈**: 8개
```

예시로 보여드린 로그인 페이지 분해입니다. 각 이슈마다 Given-When-Then AC가 명확하게 들어가 있어요.

같은 방식으로 다른 페이지도 분해할까요? 어느 페이지를 우선으로 할지 알려주세요!

- **Image #1**: 랜딩 페이지 (hero, 5단계 플로우)
- **Image #4**: 기록 목록 페이지 (필터, 카드, 페이징)
- **Image #5**: 기록 작성 페이지 (감정 선택, 강도 슬라이더) ← **가장 복잡**