# Issue: [1단계] 상황 입력 폼 UI 구현

**이슈 ID**: record-001  
**우선순위**: P0 (Critical)  
**복잡도**: 🟢 Low  
**상태**: 🔴 Not Started  
**예상 소요 시간**: 2시간  
**담당자**: (할당 대기)  

---

## 목적

사용자가 감정 기록의 **첫 번째 단계 (상황 입력)**를 완료할 수 있는 UI를 구현한다.  
이 단계는 기록 작성의 입구이므로 진입장벽을 낮게 유지해야 함.

---

## 배경

- spec-fixed.md: 1단계는 "무슨 일이 있었는가?"를 텍스트로 입력
- design.md: Textarea 컴포넌트 정의 (min-h-[220px], rounded-2xl)
- 기록 작성 페이지는 9단계를 순차적으로 보여줌
- 진행도 표시: "1 / 9"

---

## 작업 내용

1. Step1Container 컴포넌트 생성
2. Textarea 입력 필드 (최대 1000자)
3. 캐릭터 카운터 (현재/최대)
4. 가이드 텍스트 ("무슨 일이 있었나요?")
5. 다음 버튼 (1단계 완료 후 활성화)
6. 상태 저장 (Zustand)

---

## 완료 조건 (Acceptance Criteria)

### AC 1: Textarea 렌더링
- **Given** 기록 작성 페이지 로드 (1단계)
- **When** 페이지 표시
- **Then** 큰 Textarea가 표시되고, 플레이스홀더는 "무슨 일이 있었나요?"

### AC 2: 입력 제한 (1000자)
- **Given** Textarea에 포커스
- **When** 1000자 이상 입력 시도
- **Then** 입력이 멈추고 "최대 1000자입니다" 경고 표시

### AC 3: 캐릭터 카운터
- **Given** Textarea에 텍스트 입력
- **When** 100자 입력
- **Then** 오른쪽 하단에 "100 / 1000" 표시, 색상 정상 (회색)

### AC 4: 경고 색상 (900자 이상)
- **Given** Textarea에 900자 이상 입력
- **When** 캐릭터 카운터 확인
- **Then** 색상이 주황색(warning)으로 변경 ("900 / 1000")

### AC 5: 다음 버튼 활성화
- **Given** 1단계 폼
- **When** 1글자 이상 입력
- **Then** "다음" 버튼이 활성화 (파란색, cursor-pointer)

### AC 6: 다음 버튼 비활성화
- **Given** 1단계 폼
- **When** 입력창이 비어있음
- **Then** "다음" 버튼이 비활성화 (회색, cursor-not-allowed)

### AC 7: 입력 상태 저장
- **Given** Textarea에 "팀플 회의에서..."라고 입력
- **When** 페이지 떠나고 돌아옴
- **Then** 입력한 텍스트가 그대로 유지 (Zustand store)

### AC 8: 모바일 반응형
- **Given** 모바일 기기에서 기록 작성 접근
- **When** 1단계 UI 로드
- **Then** Textarea와 버튼이 전체 너비이고, 터치하기 쉬운 크기

---

## 설계 참고

```
┌──────────────────────┐
│  1 / 9               │  ← 진행도
├──────────────────────┤
│                      │
│ 무슨 일이 있었나요?  │  ← 가이드 문구
│                      │
│ ┌────────────────────┐
│ │                    │
│ │ 팀플 회의에서 내   │
│ │ 의견을...          │
│ │                    │
│ │              100/  │
│ │              1000  │
│ └────────────────────┘
│                      │
│ [이전] [다음]        │
└──────────────────────┘
```

---

## 구현 예시

```typescript
// src/pages/RecordForm/Step1.tsx
import { useState, useEffect } from 'react';
import { useRecordStore } from '@/store/recordStore';

export const Step1 = ({ onNext }: { onNext: () => void }) => {
  const { situation, setSituation } = useRecordStore();
  const [count, setCount] = useState(situation?.length || 0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, 1000);
    setSituation(value);
    setCount(value.length);
  };

  const isWarning = count > 900;
  const isComplete = count > 0;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      {/* 진행도 */}
      <div className="mb-8 text-sm font-semibold text-indigo-600">
        1 / 9
      </div>

      {/* 가이드 문구 */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        무슨 일이 있었나요?
      </h2>

      {/* Textarea */}
      <div className="relative mb-6">
        <textarea
          value={situation}
          onChange={handleChange}
          placeholder="상황을 자세히 적어주세요..."
          className={`
            w-full min-h-[220px] p-5 rounded-2xl border-2
            text-gray-900 placeholder:text-gray-400
            focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100
            ${isWarning ? 'border-amber-500' : 'border-gray-200'}
          `}
        />

        {/* 캐릭터 카운터 */}
        <div
          className={`
            absolute bottom-5 right-5 text-sm font-medium
            ${isWarning ? 'text-amber-500' : 'text-gray-400'}
          `}
        >
          {count} / 1000
        </div>
      </div>

      {/* 버튼 그룹 */}
      <div className="flex gap-3">
        <button className="h-12 px-6 rounded-xl border border-gray-200 font-semibold">
          이전
        </button>
        <button
          onClick={onNext}
          disabled={!isComplete}
          className={`
            h-12 px-6 rounded-xl font-semibold text-white
            ${isComplete
              ? 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          다음
        </button>
      </div>
    </div>
  );
};
```

---

## Zustand Store 정의

```typescript
// src/store/recordStore.ts
import { create } from 'zustand';

interface RecordState {
  situation: string;
  emotion: string;
  intensity: number;
  // ... (2-9단계 필드)
  setSituation: (s: string) => void;
  setEmotion: (e: string) => void;
  // ...
}

export const useRecordStore = create<RecordState>((set) => ({
  situation: '',
  emotion: '',
  intensity: 0,

  setSituation: (situation: string) => set({ situation }),
  setEmotion: (emotion: string) => set({ emotion }),
  // ...
}));
```

---

## 테스트 계획

### 단위 테스트
```typescript
test('should render textarea with placeholder', () => {
  const { getByPlaceholderText } = render(<Step1 onNext={jest.fn()} />);
  expect(getByPlaceholderText('상황을 자세히...')).toBeInTheDocument();
});

test('should show character counter', () => {
  const { getByText } = render(<Step1 onNext={jest.fn()} />);
  expect(getByText('0 / 1000')).toBeInTheDocument();
});

test('should disable next button when empty', () => {
  const { getByRole } = render(<Step1 onNext={jest.fn()} />);
  const nextBtn = getByRole('button', { name: '다음' });
  expect(nextBtn).toBeDisabled();
});
```

### 통합 테스트
- 입력 → 상태 저장 → 페이지 떠났다가 복귀 → 상태 복구 확인

---

## 관련 이슈

- record-002 ~ record-009: 2-9단계 UI
- ui-004: Textarea 컴포넌트 (이미 완료 필요)
- design.md: Textarea 디자인 정의

---

## 참고 자료

- design.md의 "8. 입력 컴포넌트 > Textarea"
- DESIGN_TOKENS.md의 Textarea 클래스 조합
- Zustand 공식: https://github.com/pmndrs/zustand

---

## 체크리스트

- [ ] Step1 컴포넌트 생성
- [ ] Textarea 입력창 구현
- [ ] 캐릭터 카운터
- [ ] 경고 색상 (900자 이상)
- [ ] 다음 버튼 활성화/비활성화 로직
- [ ] Zustand store 연결
- [ ] 모바일 반응형 테스트
- [ ] 단위 테스트
- [ ] 팀원 리뷰

---

**작성일**: 2026-07-02  
**마지막 수정**: 2026-07-02
