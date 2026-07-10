# Self Mental Design System

## 0. 디자인 원칙

Self Mental은 감정이 힘든 순간 사용자가 자신의 생각을 차분히 정리하는 웹앱이다.

따라서 디자인은 다음 원칙을 따른다.

* 사용자를 압박하지 않는다.
* 의료/진단 앱처럼 딱딱하게 보이지 않는다.
* 명상앱처럼 너무 추상적이거나 흐릿하게 가지 않는다.
* 입력 흐름이 길어도 사용자가 길을 잃지 않도록 한다.
* 모든 컴포넌트는 부드럽고 안전한 느낌을 준다.
* 버튼, 카드, 입력, 선택 상태는 화면마다 흔들리지 않게 고정한다.

---

# 1. 컬러 토큰

## Primary

* name: primary
* value: `#4F46E5`
* usage: 주요 버튼, 선택 상태, 진행바, 링크, 활성 메뉴

## Primary Hover

* name: primary-hover
* value: `#4338CA`
* usage: 주요 버튼 hover

## Primary Light

* name: primary-light
* value: `#EEF2FF`
* usage: 선택된 메뉴 배경, 선택 카드 배경, 안내 박스

## Background

* name: background
* value: `#F8F7F4`
* usage: 전체 페이지 배경

## Surface

* name: surface
* value: `#FFFFFF`
* usage: 카드, 폼, 모달, 입력 영역

## Border

* name: border
* value: `#E5E7EB`
* usage: 카드 테두리, 입력창 테두리, 구분선

## Text Primary

* name: text-primary
* value: `#111827`
* usage: 제목, 주요 본문

## Text Secondary

* name: text-secondary
* value: `#4B5563`
* usage: 설명 문구, 보조 정보

## Text Muted

* name: text-muted
* value: `#9CA3AF`
* usage: placeholder, 비활성 텍스트, 작은 안내

## Success

* name: success
* value: `#16A34A`
* usage: 작성 완료, 저장 완료

## Warning

* name: warning
* value: `#F59E0B`
* usage: 임시 저장, 주의 안내

## Error

* name: error
* value: `#EF4444`
* usage: 입력 오류, 삭제, 위험 안내

## Error Light

* name: error-light
* value: `#FEF2F2`
* usage: 에러 배경

---

# 2. 감정 컬러

감정 색상은 강하게 쓰지 않는다.
전체 배경이 아니라 배지, 아이콘, 작은 포인트에만 사용한다.

## 불안

* background: `#FFF7ED`
* text: `#C2410C`
* accent: `#FB923C`

## 자책

* background: `#EEF2FF`
* text: `#4338CA`
* accent: `#6366F1`

## 수치심

* background: `#ECFDF5`
* text: `#047857`
* accent: `#34D399`

## 후회

* background: `#EFF6FF`
* text: `#1D4ED8`
* accent: `#60A5FA`

## 분노

* background: `#FEF2F2`
* text: `#B91C1C`
* accent: `#F87171`

## 좌절

* background: `#F3F4F6`
* text: `#4B5563`
* accent: `#9CA3AF`

## 외로움

* background: `#F5F3FF`
* text: `#6D28D9`
* accent: `#A78BFA`

---

# 3. 타이포그래피

## Font Family

* font: `Pretendard, system-ui, sans-serif`

## Page Title

* size: `text-4xl`
* weight: `font-bold`
* line-height: `leading-tight`
* color: `text-gray-900`

## Section Title

* size: `text-2xl`
* weight: `font-semibold`
* line-height: `leading-snug`
* color: `text-gray-900`

## Card Title

* size: `text-lg`
* weight: `font-semibold`
* color: `text-gray-900`

## Body

* size: `text-base`
* weight: `font-normal`
* line-height: `leading-7`
* color: `text-gray-700`

## Small Text

* size: `text-sm`
* weight: `font-normal`
* line-height: `leading-6`
* color: `text-gray-500`

## Caption

* size: `text-xs`
* weight: `font-normal`
* color: `text-gray-400`

---

# 4. 간격 규칙

## Page Padding

### Desktop

* padding-x: `px-10`
* padding-y: `py-8`

### Tablet

* padding-x: `px-6`
* padding-y: `py-6`

### Mobile

* padding-x: `px-4`
* padding-y: `py-4`

## Section Gap

* large: `gap-10`
* medium: `gap-6`
* small: `gap-4`

## Card Padding

* desktop: `p-8`
* mobile: `p-5`

## Form Gap

* between fields: `space-y-5`
* label to input: `space-y-2`
* button group: `gap-3`

---

# 5. Radius 규칙

## Small

* class: `rounded-lg`
* usage: 작은 배지, 태그

## Medium

* class: `rounded-xl`
* usage: 버튼, 입력창

## Large

* class: `rounded-2xl`
* usage: 카드, 폼 박스

## Extra Large

* class: `rounded-3xl`
* usage: 랜딩 히어로 카드, 큰 컨테이너

---

# 6. Shadow

## Card Shadow

* class: `shadow-sm`
* usage: 기본 카드

## Floating Card Shadow

* class: `shadow-xl shadow-gray-200/60`
* usage: 로그인 카드, 랜딩 예시 카드, 모달

---

# 7. 버튼 컴포넌트

## Primary Button

### Default

* height: `h-12`
* padding: `px-6`
* background: `bg-indigo-600`
* text: `text-white text-base font-semibold`
* radius: `rounded-xl`
* shadow: `shadow-sm`
* cursor: `cursor-pointer`

### Hover

* background: `hover:bg-indigo-700`

### Disabled

* background: `bg-gray-200`
* text: `text-gray-400`
* cursor: `cursor-not-allowed`

### Loading

* background: `bg-indigo-500`
* text: `text-white`

---

## Secondary Button

### Default

* height: `h-12`
* padding: `px-6`
* background: `bg-white`
* text: `text-gray-800 text-base font-semibold`
* border: `border border-gray-200`
* radius: `rounded-xl`

### Hover

* background: `hover:bg-gray-50`
* border: `hover:border-gray-300`

---

## Danger Button

### Default

* height: `h-12`
* padding: `px-6`
* background: `bg-red-500`
* text: `text-white text-base font-semibold`
* radius: `rounded-xl`

### Hover

* background: `hover:bg-red-600`

---

## Text Button

* text: `text-indigo-600 text-sm font-medium`
* hover: `hover:bg-indigo-50 hover:text-indigo-700`

---

# 8. 입력 컴포넌트

## Text Input

* height: `h-12`
* background: `bg-white`
* border: `border border-gray-200`
* radius: `rounded-xl`
* padding: `px-4`
* focus: `border-indigo-500 ring-4 ring-indigo-100`

---

## Textarea

* min-height: `min-h-[220px]`
* background: `bg-white`
* border: `border border-gray-200`
* radius: `rounded-2xl`
* padding: `p-5`
* focus: `border-indigo-500 ring-4 ring-indigo-100`

---

## Intensity Slider

* track: `h-2 bg-gray-200`
* filled: `bg-indigo-600`
* thumb: `h-6 w-6 bg-indigo-600 border-4 border-white shadow-md`
* number display: `text-5xl font-bold`

---

# 9. 카드 컴포넌트

## Base Card

* background: `bg-white`
* border: `border border-gray-100`
* radius: `rounded-2xl`
* padding: `p-6`
* shadow: `shadow-sm`
* hover: `hover:shadow-md hover:border-indigo-100`

---

## Record Card

* height: `min-h-[96px]`
* background: `bg-white`
* border: `border border-gray-100`
* radius: `rounded-2xl`
* padding: `p-5`
* hover: `hover:bg-gray-50 hover:shadow-md cursor-pointer`

### Status Badge

* draft: `bg-amber-50 text-amber-600`
* completed: `bg-green-50 text-green-600`

---

## Info Card

* background: `bg-indigo-50`
* border: `border border-indigo-100`
* text: `text-indigo-900`

---

## Warning Card

* background: `bg-amber-50`
* border: `border border-amber-100`
* text: `text-amber-900`

---

## Error Card

* background: `bg-red-50`
* border: `border border-red-100`
* text: `text-red-700`

---

# 10. 감정 선택 카드

## Emotion Card

* width: `w-[140px]`
* height: `h-[140px]`
* background: `bg-white`
* border: `border border-gray-200`
* radius: `rounded-2xl`
* shadow: `shadow-sm`
* hover: `hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer`

### Selected

* background: `bg-indigo-50`
* border: `border-indigo-500`
* ring: `ring-4 ring-indigo-100`
* check icon: 우측 상단

---

# 11. 배지

## Emotion Badge

* height: `h-7`
* padding: `px-3`
* radius: `rounded-full`
* text: `text-sm font-medium`
* format: `불안 80` (감정명 + 강도)

---

## Status Badge

* height: `h-7`
* padding: `px-3`
* radius: `rounded-full`
* text: `text-sm font-medium`

---

# 12. 인지 왜곡 카드

## Distortion Card

* background: `bg-white`
* border: `border border-gray-200`
* radius: `rounded-2xl`
* padding: `p-5`
* min-height: `min-h-[120px]`
* hover: `hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer`

### Selected

* background: `bg-indigo-50`
* border: `border-indigo-500`
* ring: `ring-4 ring-indigo-100`

---

# 13. Progress Bar

* wrapper: `w-full max-w-md`
* height: `h-2`
* background: `bg-gray-200`
* filled: `bg-indigo-600`
* radius: `rounded-full`
* step text: `text-indigo-600 font-bold text-lg` (예: 3 / 9)

---

# 14. 구조별 디자인

## Sidebar

* width: `w-72`
* background: `bg-white`
* border-right: `border-r border-gray-100`
* padding: `p-6`

### Nav Item

* default: `h-12 px-4 rounded-xl text-gray-600 font-medium`
* hover: `hover:bg-gray-50 hover:text-gray-900`
* active: `bg-indigo-50 text-indigo-600`

---

## Header

### Public Header (로그인 전)

* height: `h-20`
* background: `bg-white/80 backdrop-blur`
* border-bottom: `border-b border-gray-100`

### App Header (로그인 후)

* height: `h-20`
* background: `bg-white`
* border-bottom: `border-b border-gray-100`

---

## Modal

* overlay: `bg-black/30 backdrop-blur-sm`
* container: `max-w-md bg-white rounded-3xl p-8 shadow-xl`

---

# 15. Toast

## Success Toast

* background: `bg-white border border-green-100`
* icon: `text-green-600`

## Error Toast

* background: `bg-white border border-red-100`
* icon: `text-red-500`

## Warning Toast

* background: `bg-white border border-amber-100`
* icon: `text-amber-500`

---

# 16. 페이지별 레이아웃

## Landing Page

* hero: 좌측 텍스트 + 우측 일러스트
* example card: 하단 큰 카드
* CTA: Primary Button `지금 기록 시작하기`

---

## Login / Signup Page

* card: `max-w-lg rounded-3xl p-10 shadow-xl`
* centered layout

---

## Record List Page

* sidebar + content
* filter tabs: 전체, 작성 완료, 임시 저장
* record cards in grid
* empty state

---

## New Record Page

* app header
* progress bar (3 / 9)
* one step per screen
* bottom navigation fixed

---

## Record Detail Page

* main content + right summary panel
* emotion badge + date + status
* step sections as cards

---

## My Page

* sidebar + content
* profile card
* settings list
* privacy info card

---

# 17. 반응형 규칙

## Desktop

* sidebar visible
* content 2-column 가능
* record detail: main + right panel

## Tablet

* sidebar narrow or top menu
* record detail: 1-column

## Mobile

* sidebar hidden
* bottom tab or top menu
* full-width buttons: `w-full h-12`
* 기록 작성: 한 단계씩 전체 화면

---

# 18. 접근성

## Focus

* 모든 입력, 버튼, 선택 요소: `ring-4 ring-indigo-100`

## Keyboard

* Tab 이동 가능
* Enter로 다음 단계
* Esc로 모달 닫기

---

# 19. 문구 톤

* 부드럽게 질문한다
* 사용자를 평가하지 않는다
* "틀렸다" 같은 직접적인 표현 금지
* 행동을 유도: "그럴 수 있어요" → "나눠서 살펴볼까요?"

### 좋은 문구

* `무슨 일이 있었나요?`
* `그때 자동으로 떠오른 생각은 무엇이었나요?`
* `실제로 일어난 사실과 내 해석을 나눠볼까요?`
* `지금 할 수 있는 작은 행동 하나를 정해볼까요?`

---

# 20. 필수 체크리스트

## 핵심 컴포넌트

- [ ] Primary Button
- [ ] Secondary Button
- [ ] Danger Button
- [ ] Text Button
- [ ] Text Input
- [ ] Password Input
- [ ] Textarea
- [ ] Base Card
- [ ] Record Card
- [ ] Emotion Card
- [ ] Emotion Badge
- [ ] Distortion Card
- [ ] Intensity Slider
- [ ] Progress Bar
- [ ] Sidebar
- [ ] Header
- [ ] Modal
- [ ] Toast
- [ ] Status Badge

## 상태 정의

- [ ] Default 상태
- [ ] Hover 상태
- [ ] Disabled 상태
- [ ] Selected 상태
- [ ] Error 상태
- [ ] Loading 상태

## 페이지

- [ ] Landing Page
- [ ] Login Page
- [ ] Signup Page
- [ ] Password Reset Page
- [ ] Record List Page
- [ ] New Record Page
- [ ] Record Detail Page
- [ ] My Page
- [ ] Empty State
- [ ] Error State

---

# 21. 디자인 품질 기준

✓ 모든 주요 버튼: `h-12 rounded-xl`  
✓ 모든 입력창: `h-12 rounded-xl`  
✓ 모든 큰 카드: `rounded-2xl` 이상  
✓ 주요 CTA: `bg-indigo-600`  
✓ 선택 상태: `bg-indigo-50 border-indigo-500 ring-indigo-100`  
✓ 에러 상태: `border-red-500 ring-red-100`  
✓ 페이지 배경: `#F8F7F4` 또는 매우 밝은 gray  
✓ 감정 색상: 배지나 아이콘에만 제한적 사용  
✓ 심리 진단 표현 금지  
✓ 전문 상담 대체 아님을 명시  
