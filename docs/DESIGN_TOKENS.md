# Design Tokens - Quick Reference

개발할 때 자주 쓰는 클래스 조합과 색상값을 한눈에 볼 수 있습니다.

---

## 자주 쓰는 Tailwind 조합

### 버튼

```
Primary:    h-12 px-6 rounded-xl bg-indigo-600 text-white font-semibold 
            hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400

Secondary:  h-12 px-6 rounded-xl bg-white text-gray-800 font-semibold 
            border border-gray-200 hover:bg-gray-50 
            disabled:bg-gray-100 disabled:text-gray-400

Danger:     h-12 px-6 rounded-xl bg-red-500 text-white font-semibold 
            hover:bg-red-600 disabled:bg-red-100

Text:       px-2 py-1 rounded-md text-indigo-600 text-sm font-medium 
            hover:bg-indigo-50 hover:text-indigo-700

Mobile:     w-full h-12 (모든 버튼)
```

### 입력

```
Input:      h-12 px-4 rounded-xl bg-white border border-gray-200 
            text-gray-900 placeholder:text-gray-400
            focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 
            focus:outline-none disabled:bg-gray-100

Textarea:   min-h-[220px] p-5 rounded-2xl bg-white border border-gray-200 
            text-gray-900 placeholder:text-gray-400
            focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 
            focus:outline-none resize-none
```

### 카드

```
Base Card:  rounded-2xl bg-white border border-gray-100 shadow-sm p-6 
            hover:shadow-md hover:border-indigo-100

Record Card: rounded-2xl bg-white border border-gray-100 shadow-sm p-5 
             min-h-[96px] hover:bg-gray-50 hover:shadow-md cursor-pointer

Info Card:  rounded-2xl bg-indigo-50 border border-indigo-100 p-5 
            text-indigo-900

Error Card: rounded-2xl bg-red-50 border border-red-100 p-5 
            text-red-700
```

### 선택 상태 (공통)

```
Selected:   bg-indigo-50 border border-indigo-500 
            ring-4 ring-indigo-100
```

### 감정 배지

```
불안:      bg-orange-100 text-orange-800      (accent: orange-400)
자책:      bg-indigo-50 text-indigo-700       (accent: indigo-500)
수치심:     bg-emerald-50 text-emerald-700     (accent: emerald-400)
후회:      bg-blue-50 text-blue-700           (accent: blue-400)
분노:      bg-red-50 text-red-700             (accent: red-400)
좌절:      bg-gray-100 text-gray-700          (accent: gray-400)
외로움:     bg-purple-50 text-purple-700       (accent: purple-400)
```

---

## 컬러 값 (Hex & RGB)

### 기본 색상

| 용도 | Hex | Tailwind | RGB |
|------|-----|----------|-----|
| Primary | #4F46E5 | indigo-600 | 79, 70, 229 |
| Primary Hover | #4338CA | indigo-700 | 67, 56, 202 |
| Primary Light | #EEF2FF | indigo-50 | 238, 242, 255 |
| Background | #F8F7F4 | stone-50 | 248, 247, 244 |
| Surface | #FFFFFF | white | 255, 255, 255 |
| Border | #E5E7EB | gray-200 | 229, 231, 235 |

### 텍스트

| 용도 | Hex | Tailwind |
|------|-----|----------|
| Primary | #111827 | gray-900 |
| Secondary | #4B5563 | gray-700 |
| Muted | #9CA3AF | gray-400 |

### 상태

| 용도 | Hex | Tailwind |
|------|-----|----------|
| Success | #16A34A | green-600 |
| Warning | #F59E0B | amber-500 |
| Error | #EF4444 | red-500 |

---

## 간격 규칙

```
Page Padding
  Desktop:  px-10 py-8
  Tablet:   px-6 py-6
  Mobile:   px-4 py-4

Card Padding
  Desktop:  p-8
  Mobile:   p-5
  Normal:   p-6

Section Gap
  Large:    gap-10
  Medium:   gap-6
  Small:    gap-4

Form
  Fields:   space-y-5
  Label:    space-y-2
  Buttons:  gap-3
```

---

## Radius 규칙

```
Small:      rounded-lg      (배지, 태그)
Medium:     rounded-xl      (버튼, 입력)
Large:      rounded-2xl     (카드)
XLarge:     rounded-3xl     (큰 카드, 모달)
```

---

## Shadow 규칙

```
Default:    shadow-sm
Hover:      shadow-md
Floating:   shadow-xl shadow-gray-200/60
```

---

## Focus Ring (모든 인터랙티브 요소)

```
focus:ring-4 focus:ring-indigo-100
focus:border-indigo-500
focus:outline-none
```

---

## 에러 상태 (공통)

```
border-red-500 ring-4 ring-red-100
text-red-500 (에러 메시지)
```

---

## 폰트

```
Font Family:  Pretendard, system-ui, sans-serif

Page Title:   text-4xl font-bold leading-tight
Section:      text-2xl font-semibold leading-snug
Card Title:   text-lg font-semibold
Body:         text-base font-normal leading-7
Small:        text-sm font-normal leading-6
Caption:      text-xs font-normal
```

---

## 반응형 중단점 (Tailwind 기본값)

```
sm:   640px
md:   768px
lg:   1024px
xl:   1280px
2xl:  1536px

예시:
md:grid-cols-2    // 768px 이상에서 2열
lg:w-1/2          // 1024px 이상에서 50% 너비
```

---

## 자주 쓰는 조합

### 페이지 래퍼

```tsx
<div className="min-h-screen bg-stone-50 px-4 py-4 md:px-6 md:py-6 lg:px-10 lg:py-8">
  {/* content */}
</div>
```

### 카드 그리드

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* cards */}
</div>
```

### 폼 필드

```tsx
<div className="space-y-5">
  <div className="space-y-2">
    <label className="text-base font-semibold text-gray-900">
      라벨
    </label>
    <input 
      type="text"
      className="h-12 px-4 rounded-xl bg-white border border-gray-200 
                 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
    />
  </div>
</div>
```

### 버튼 그룹

```tsx
<div className="flex gap-3">
  <button className="h-12 px-6 rounded-xl bg-indigo-600 text-white">
    확인
  </button>
  <button className="h-12 px-6 rounded-xl bg-white border border-gray-200">
    취소
  </button>
</div>
```

---

## 자주 하는 실수 & 체크

❌ 버튼이 `h-10` 사용  
✓ `h-12` 사용

❌ 카드가 `rounded-lg` 사용  
✓ `rounded-2xl` 이상 사용

❌ Focus ring 없음  
✓ `focus:ring-4 focus:ring-indigo-100` 필수

❌ 색상을 정의되지 않은 것으로 사용 (예: `blue-800`)  
✓ 이 문서의 색상만 사용

❌ 선택 상태를 배경색만으로 표현  
✓ border + ring 조합 사용

---

## 참고

더 자세한 내용은 `design.md`를 참고하세요.  
Tailwind config 설정은 `tailwind.config.ts`를 참고하세요.
