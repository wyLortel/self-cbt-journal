# Component Structure - FSD (Feature-Sliced Design)

## 🏗️ FSD란?

**Feature-Sliced Design (FSD)**은 대규모 프론트엔드 프로젝트를 "기능 중심"으로 구조화하는 아키텍처 패턴입니다.
파일 종류별(components, pages, api)로 나누지 않고, **각 기능(auth, record-form, record-list)별로 폴더를 나누고** 
그 안에 필요한 모든 것(컴포넌트, 상태관리, API, 타입)을 모아둡니다.

**핵심 원칙**: 상위 레이어 → 하위 레이어만 import 가능 (단방향 의존성)

Self Mental은 기능 경계가 명확하고(auth, record-form, record-list 등) v1.1, v2.0으로 
계속 확장될 예정이므로 FSD가 최적입니다.

---

## 📁 전체 폴더 구조

```
src/
├── App.tsx                 ← 라우팅, 프로바이더 설정
│
├── 📁 processes/           ← 앱 레벨 흐름 (인증 가드, 리다이렉트 등)
│   ├── auth-guard.tsx      (보호된 라우트)
│   └── redirect.tsx        (로그인 후 이동 로직)
│
├── 📁 pages/               ← 페이지 (얇은 wrapper, 로직 없음)
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   ├── ForgotPasswordPage.tsx
│   ├── RecordFormPage.tsx
│   ├── RecordListPage.tsx
│   ├── RecordDetailPage.tsx
│   └── MyPage.tsx
│
├── 📁 widgets/             ← 여러 feature를 조합한 UI 블록
│   ├── Sidebar.tsx         (feature/auth의 로그아웃 + feature/mypage 링크 조합)
│   ├── AppHeader.tsx       (사용자 정보 표시)
│   ├── Navigation.tsx      (메뉴)
│   └── PublicHeader.tsx    (로그인 전 헤더)
│
├── 📁 features/            ← 사용자 기능 (비즈니스 로직의 핵심)
│   │
│   ├── 📁 auth/            (회원가입, 로그인, 비밀번호 재설정)
│   │   ├── ui/
│   │   │   ├── LoginForm.tsx
│   │   │   └── SignupForm.tsx
│   │   ├── model/
│   │   │   ├── authStore.ts      (Zustand)
│   │   │   └── types.ts          (AuthState 등)
│   │   ├── api/
│   │   │   └── useAuth.ts        (login, signup, logout 훅)
│   │   └── lib/
│   │       └── validation.ts     (이메일, 비밀번호 검증 - auth 특화)
│   │
│   ├── 📁 record-form/     (1-9단계 감정 기록 작성)
│   │   ├── ui/
│   │   │   ├── RecordFormContainer.tsx
│   │   │   ├── steps/
│   │   │   │   ├── Step1.tsx
│   │   │   │   ├── Step2.tsx
│   │   │   │   ├── Step3.tsx
│   │   │   │   ├── IntensitySlider.tsx  (입력 UI)
│   │   │   │   └── ... Step9.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── NavigationButtons.tsx
│   │   ├── model/
│   │   │   ├── recordFormStore.ts  (Zustand, 1-9단계 폼 상태)
│   │   │   └── types.ts            (RecordFormState 등)
│   │   ├── api/
│   │   │   └── useRecordForm.ts    (저장, 임시저장 로직)
│   │   └── lib/
│   │       └── constants.ts        (인지 왜곡 7가지 - record-form 특화)
│   │
│   ├── 📁 record-list/     (기록 목록, 필터, 페이징)
│   │   ├── ui/
│   │   │   ├── RecordList.tsx
│   │   │   ├── RecordCard.tsx
│   │   │   ├── FilterTabs.tsx
│   │   │   └── Pagination.tsx
│   │   ├── model/
│   │   │   └── recordListStore.ts  (필터 상태, 정렬 상태)
│   │   ├── api/
│   │   │   └── useRecordList.ts    (GET /api/records + 필터 로직)
│   │   └── lib/
│   │       └── format.ts
│   │
│   ├── 📁 record-detail/   (기록 상세, 수정, 삭제)
│   │   ├── ui/
│   │   │   ├── RecordDetail.tsx
│   │   │   ├── RecordSummaryPanel.tsx
│   │   │   └── EditModal.tsx
│   │   ├── api/
│   │   │   └── useRecordDetail.ts  (GET, PATCH, DELETE)
│   │   └── lib/
│   │       └── formatters.ts
│   │
│   └── 📁 mypage-settings/ (마이페이지, 프로필, 설정)
│       ├── ui/
│       │   ├── ProfileCard.tsx
│       │   ├── SettingsMenu.tsx
│       │   └── StatsCard.tsx
│       ├── api/
│       │   └── useMyPage.ts        (비밀번호 변경, 계정 삭제)
│       └── lib/
│           └── constants.ts        (메뉴 아이템)
│
├── 📁 entities/            ← 비즈니스 도메인 모델 (데이터 구조)
│   │
│   ├── 📁 user/            (사용자)
│   │   ├── model/
│   │   │   └── types.ts    (User 인터페이스)
│   │   └── api/
│   │       └── useUser.ts  (GET /api/user)
│   │
│   ├── 📁 record/          (감정 기록 - CRUD 엔드포인트 소유)
│   │   ├── model/
│   │   │   ├── types.ts           (Record, RecordInput 타입)
│   │   │   ├── constants.ts       (감정 7가지, 인지 왜곡 7가지)
│   │   │   └── recordAPI.ts       (Supabase 클라이언트로 CRUD)
│   │   └── api/
│   │       ├── useCreateRecord.ts (POST /api/records)
│   │       ├── useUpdateRecord.ts (PATCH /api/records/{id})
│   │       ├── useDeleteRecord.ts (DELETE /api/records/{id})
│   │       └── useFetchRecord.ts  (GET /api/records/{id})
│   │
│   └── 📁 emotion/         (감정 관련 도메인)
│       ├── model/
│       │   ├── types.ts    (Emotion, CognitiveDistortion 타입)
│       │   └── constants.ts (감정 색상, 아이콘 매핑)
│       └── ui/
│           ├── EmotionCard.tsx     (7개 감정 선택)
│           ├── EmotionBadge.tsx
│           └── CognitiveDistortionCard.tsx
│
├── 📁 shared/              ← 공유 자산 (모든 레이어에서 import 가능)
│   ├── 📁 ui/              (기본 UI 컴포넌트)
│   │   ├── Button.tsx      (Primary, Secondary, Danger, Text)
│   │   ├── Input.tsx       (Text, Password)
│   │   ├── Textarea.tsx
│   │   ├── Card.tsx        (Base, Info, Warning, Error)
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   ├── Toast.tsx
│   │   ├── Spinner.tsx
│   │   └── Slider.tsx
│   │
│   ├── 📁 hooks/           (공유 hooks)
│   │   ├── useFetch.ts
│   │   ├── useForm.ts
│   │   └── useLocalStorage.ts
│   │
│   ├── 📁 api/             (HTTP 클라이언트, 공유 API 로직)
│   │   ├── client.ts       (Axios/Fetch 설정)
│   │   └── types.ts        (APIResponse 타입)
│   │
│   ├── 📁 utils/           (유틸 함수)
│   │   ├── validation.ts   (이메일, 비밀번호 범용 검증)
│   │   ├── format.ts       (날짜, 숫자 포매팅)
│   │   └── cn.ts           (classname 유틸)
│   │
│   ├── 📁 constants/       (공유 상수)
│   │   ├── routes.ts       (라우트 경로)
│   │   └── config.ts       (API 베이스 URL 등)
│   │
│   ├── 📁 types/           (공유 타입)
│   │   ├── common.ts
│   │   └── api.ts
│   │
│   └── 📁 config/          (공유 설정)
│       └── routes.ts
│
└── 📁 styles/              ← 글로벌 스타일
    ├── globals.css         (Tailwind import, 글로벌 스타일)
    └── variables.css       (CSS 변수)
```

---

## 🎯 레이어별 책임 및 import 규칙

### 📍 shared/ (공유 자산)
**책임**: 모든 레이어가 사용할 수 있는 기본 자산
- UI 컴포넌트 (Button, Input, Card 등)
- 공유 hooks (useFetch, useForm)
- 공유 유틸 (validation, format)
- 공유 타입 정의

**import 규칙**: 
- ✅ 다른 shared/* import 가능
- ✅ 누구나 import 가능
- ❌ features, entities, pages import 불가

---

### 🏢 entities/ (비즈니스 도메인)
**책임**: 비즈니스 데이터 모델 (User, Record, Emotion 등) 및 CRUD API
- 타입 정의 (Record, User 인터페이스)
- 상수 (감정 목록, 인지 왜곡 목록)
- CRUD API 훅 (useCreateRecord, useUpdateRecord 등)
- 도메인 UI (EmotionCard, EmotionBadge - 재사용 가능)

**import 규칙**:
- ✅ shared/* import 가능
- ✅ features/*, widgets/*, pages/* 에서 import 가능
- ❌ features, pages, widgets import 불가

**예**:
```typescript
// entities/record/model/types.ts
export interface Record {
  id: string;
  user_id: string;
  emotion: Emotion;
  intensity: number;
  created_at: ISO8601;
}

// features/record-list/api/useRecordList.ts
import { Record } from '@entities/record/model/types'
```

---

### ⚡ features/ (사용자 기능)
**책임**: 사용자가 할 수 있는 행동 (회원가입, 기록 작성, 목록 조회 등)
- 기능별 UI (LoginForm, RecordList, RecordCard 등)
- 기능별 상태 관리 (authStore, recordFormStore)
- 기능별 API 호출 (useAuth, useRecordForm)
- 기능 특화 로직 (검증, 포맷팅)

**import 규칙**:
- ✅ shared/*, entities/* import 가능
- ❌ 다른 features import **불가** (features끼리 독립)
- ❌ pages import 불가

**예시**:
```typescript
// ✅ OK
import Button from '@shared/ui/Button'
import { Record } from '@entities/record/model/types'

// ❌ NOT OK
import LoginForm from '@features/auth/ui/LoginForm'  // 다른 feature 참조
```

---

### 🎨 widgets/ (복합 컴포넌트)
**책임**: 여러 feature/entity를 조합한 독립적인 UI 블록
- Sidebar (feature/auth의 로그아웃 + feature/mypage 링크 조합)
- AppHeader (user 정보 표시)

**import 규칙**:
- ✅ shared/*, entities/*, features/* import 가능
- ❌ pages import 불가

---

### 📄 pages/ (페이지)
**책임**: 라우트 단위 페이지 (거의 wrapper, 로직 없음)
- features 조합만
- 최소한의 상태 관리

**import 규칙**:
- ✅ shared/*, entities/*, features/*, widgets/* import 가능
- ❌ 다른 pages import 불가

**예**:
```typescript
// pages/RecordFormPage.tsx
import RecordFormContainer from '@features/record-form/ui'
import AppHeader from '@widgets/AppHeader'

export default function RecordFormPage() {
  return (
    <AppHeader />
    <RecordFormContainer />
  )
}
```

---

### 🔄 processes/ (앱 레벨 흐름)
**책임**: 여러 feature를 넘나드는 흐름 (인증 가드, 리다이렉트)

**import 규칙**:
- ✅ 모든 레이어 import 가능

---

## 📊 매핑 표 1: Conventional → FSD

| 기존 구조 | FSD 위치 |
|---------|---------|
| `components/ui/Button.tsx` | `shared/ui/Button.tsx` |
| `components/emotion/EmotionCard.tsx` | `entities/emotion/ui/EmotionCard.tsx` |
| `components/layout/Sidebar.tsx` | `widgets/Sidebar.tsx` |
| `pages/LoginPage.tsx` | `pages/LoginPage.tsx` (wrapper) + `features/auth/ui/LoginForm.tsx` (로직) |
| `pages/record/steps/Step1.tsx` | `features/record-form/ui/steps/Step1.tsx` |
| `store/authStore.ts` | `features/auth/model/authStore.ts` |
| `store/recordStore.ts` | `features/record-form/model/recordFormStore.ts` |
| `api/auth.ts` | `features/auth/api/useAuth.ts` |
| `api/records.ts` | `entities/record/api/*` (CRUD) + `features/record-list/api/useRecordList.ts` (목록 로직) |
| `types/record.ts` | `entities/record/model/types.ts` |
| `hooks/useFetch.ts` | `shared/hooks/useFetch.ts` |
| `constants/emotions.ts` | `entities/emotion/model/constants.ts` |
| `constants/routes.ts` | `shared/config/routes.ts` |

---

## 📊 매핑 표 2: issues/ → FSD features/entities

이 표는 `PRODUCT_BACKLOG.md`의 36개 이슈를 구현할 때 어느 폴더에 코드를 넣을지 가이드합니다.

| issues/ 폴더 | FSD 폴더 | 설명 |
|---------|---------|------|
| `00-auth/` (4개 이슈) | `features/auth/` | 회원가입, 로그인, 비밀번호 재설정 |
| `01-emotion-record/` (9개 이슈) | `features/record-form/` + `entities/emotion/` | 1-9단계 UI → record-form, 감정 데이터 → emotion |
| `02-record-management/` (4개 이슈) | `features/record-detail/` | 기록 조회, 수정, 삭제 |
| `03-record-list/` (1개 이슈) | `features/record-list/` | 기록 목록, 필터, 페이징 |
| `04-my-page/` (3개 이슈) | `features/mypage-settings/` | 프로필, 설정 |
| `05-ui-common/` (5개 이슈) | `shared/ui/` + `widgets/` | 공유 버튼, 입력, 카드 → shared, Sidebar, Header → widgets |
| `06-database/` (2개 이슈) | `entities/*/api/` + `shared/api/` | DB 스키마 → entities API 기초, RLS → entities API |
| `07-api/` (8개 이슈) | `entities/*/api/` + `features/*/api/` | CRUD 엔드포인트 → entities, 비즈니스 로직 → features |

---

## 🔀 데이터 흐름 (FSD 레이어 경유)

```
사용자 입력 (pages/RecordFormPage.tsx)
    ↓
features/record-form/ui/Step1.tsx (입력 UI 컴포넌트)
    ↓
features/record-form/api/useRecordForm.ts (form 상태 관리 + 로직)
    ↓
features/record-form/model/recordFormStore.ts (Zustand)
    ↓
entities/record/api/useCreateRecord.ts (CRUD, POST /api/records 호출)
    ↓
외부 API (Supabase) 또는 실패 → Toast 에러 표시
```

---

## 🧩 컴포넌트 의존성 트리

```
pages/LoginPage.tsx
    ↓
features/auth/ui/LoginForm.tsx
    ├── shared/ui/Input.tsx
    ├── shared/ui/Button.tsx
    └── features/auth/api/useAuth.ts
        └── shared/api/client.ts

pages/RecordFormPage.tsx
    ↓
features/record-form/ui/RecordFormContainer.tsx
    ├── features/record-form/ui/steps/Step1.tsx
    │   └── shared/ui/Textarea.tsx
    ├── features/record-form/ui/steps/Step2.tsx
    │   └── entities/emotion/ui/EmotionCard.tsx
    ├── features/record-form/ui/steps/Step3.tsx
    │   └── features/record-form/ui/IntensitySlider.tsx
    │       └── shared/ui/Slider.tsx
    └── features/record-form/api/useRecordForm.ts
        └── entities/record/api/useCreateRecord.ts
```

---

## ⚙️ Path Alias 설정 (tsconfig.json / vite.config.ts)

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@shared/*": ["src/shared/*"],
      "@entities/*": ["src/entities/*"],
      "@features/*": ["src/features/*"],
      "@widgets/*": ["src/widgets/*"],
      "@pages/*": ["src/pages/*"],
      "@processes/*": ["src/processes/*"]
    }
  }
}
```

```typescript
// vite.config.ts
import react from '@vitejs/plugin-react'
import path from 'path'

export default {
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, './src/shared'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@features': path.resolve(__dirname, './src/features'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@processes': path.resolve(__dirname, './src/processes'),
    },
  },
}
```

이제 깔끔하게 import 가능:
```typescript
import Button from '@shared/ui/Button'
import { useAuth } from '@features/auth/api/useAuth'
import { Record } from '@entities/record/model/types'
```

---

## ✅ 구현 체크리스트 (FSD 슬라이스 단위)

### Phase 1: shared/ + entities/ (기초)
- [ ] `shared/ui/*` (Button, Input, Card, Badge, Modal, Toast, Slider)
- [ ] `shared/hooks/*` (useFetch, useForm)
- [ ] `shared/utils/*` (validation, format)
- [ ] `entities/emotion/model/*` (타입, 상수, 색상 매핑)
- [ ] `entities/record/model/*` (타입, 상수)
- [ ] `entities/emotion/ui/*` (EmotionCard, EmotionBadge)

### Phase 2: entities API + features 기초
- [ ] `entities/record/api/*` (useCreateRecord, useUpdateRecord, useDeleteRecord, useFetchRecord)
- [ ] `entities/user/model/*`, `api/*`
- [ ] `features/auth/model/*` (authStore, types)
- [ ] `features/auth/ui/*` (LoginForm, SignupForm)
- [ ] `features/auth/api/*` (useAuth)

### Phase 3: features (핵심 기능)
- [ ] `features/record-form/*` (ui/steps, model, api)
- [ ] `features/record-list/*` (ui, model, api)
- [ ] `features/record-detail/*` (ui, api)
- [ ] `features/mypage-settings/*` (ui, api)

### Phase 4: widgets + pages + processes (통합)
- [ ] `widgets/Sidebar.tsx`
- [ ] `widgets/AppHeader.tsx`
- [ ] `pages/LoginPage.tsx`, `RecordFormPage.tsx` 등 (모두 얇은 wrapper)
- [ ] `processes/auth-guard.tsx`
- [ ] `App.tsx` (라우팅)

---

## 🎯 개발 시 참고 규칙

### 1️⃣ 단방향 의존성 (FSD 핵심)
```typescript
// ✅ OK: 하위 레이어 import
import Button from '@shared/ui/Button'
import { Record } from '@entities/record/model/types'

// ❌ NOT OK: 같은 레이어 또는 상위 레이어 import
import LoginForm from '@features/auth/ui/LoginForm'  // 같은 레이어의 다른 feature
import LoginPage from '@pages/LoginPage'              // 상위 레이어
```

### 2️⃣ Feature는 독립적으로
features의 각 폴더는 거의 독립적입니다. 로직 공유가 필요하면:
- ✅ `shared/`에서 공유 hook/util 만들기
- ✅ `entities/`에서 공유 API/타입 만들기
- ❌ `features/auth`에서 `features/record-form` import하기

### 3️⃣ UI 컴포넌트는 상태 없게 (Presentational)
```typescript
// ❌ 나쁜 예: Button이 스스로 상태 관리
function Button() {
  const [disabled, setDisabled] = useState(false)
}

// ✅ 좋은 예: Button은 props만 받음
function Button({ disabled }: { disabled: boolean }) {
}
```

### 4️⃣ 페이지는 거의 wrapper
```typescript
// pages/RecordFormPage.tsx
// 거의 이 정도만 (feature 조합)
export default function RecordFormPage() {
  return (
    <AppHeader />
    <RecordFormContainer />
  )
}
```

### 5️⃣ 형식을 갖춘 feature 구조 (필요 없는 세그먼트는 생략 가능)
```
features/auth/
├── ui/              (컴포넌트)
├── model/           (타입, store)
├── api/             (API 호출)
└── lib/             (auth 특화 유틸, validation)

entities/emotion/
├── model/           (타입, 상수)
├── ui/              (EmotionCard - 도메인 UI)
└── api/             (없어도 됨 - 조회만 하므로)
```

---

## 🚀 개발 시작 흐름

```
1. shared/ui/* 구현
   → 모든 페이지에서 필요한 기본 버튼, 입력, 카드 먼저

2. entities/* 구현
   → User, Record, Emotion 타입 + CRUD API

3. features/* 구현
   → auth (로그인) → record-form (기록) → record-list (목록) 순서

4. widgets/* + pages/* 조합
   → 각 페이지는 feature를 조합하는 wrapper만

5. App.tsx에서 라우팅 연결
   → 모든 pages를 라우트에 연결
```

---

## 📚 참고

- **FSD 공식 가이드**: https://feature-sliced.design/
- **Self Mental 백로그**: `PRODUCT_BACKLOG.md` (issues/ 폴더 참고)
- **API 명세**: `API_SPEC.md` (엔드포인트 정의)
- **디자인 시스템**: `design.md` (UI 토큰, 색상 등)

---

**작성일**: 2026-07-02  
**아키텍처**: Feature-Sliced Design (FSD)  
**상태**: Ready for Development
