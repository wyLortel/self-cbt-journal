# 기록 목록 페이지 - UI 요소 분해 및 이슈 목록

**페이지**: Record List Page (Image #4)  
**총 이슈 개수**: 8개  
**의존성**: ui-common (사이드바, 헤더) + 기록 API

---

## 🎨 페이지 구조

```
┌──────────────┬──────────────────────────────────────┐
│  Sidebar     │  Main Content                        │
│  (Left)      │  (Right)                             │
├──────────────┼──────────────────────────────────────┤
│              │  Header                              │
│  · 기록 목록 │  "오늘 마음은 어땠나요?"             │
│  · 새 기록   │  [+ 새 기록 작성]                    │
│  · 마이페이지│                                       │
│              │  Filter Tabs                         │
│  · 로그아웃  │  [전체] [작성 완료] [임시 저장]      │
│              │                                       │
│              │  Record Cards (Grid)                 │
│              │  ┌─────────────────────┐             │
│              │  │ 불안 80              │             │
│              │  │ 팀플 회의에서...     │             │
│              │  │ 2025.07.02 14:30   │             │
│              │  │ 작성 완료            │             │
│              │  └─────────────────────┘             │
│              │  ┌─────────────────────┐             │
│              │  │ 자책 65              │             │
│              │  │ 발표 피드백...       │             │
│              │  └─────────────────────┘             │
│              │  ...                                  │
│              │                                       │
│              │  Pagination                          │
│              │  [< 1 2 3 4 ... >]                   │
│              │                                       │
└──────────────┴──────────────────────────────────────┘
```

---

## 📋 이슈 목록

### 공통 이슈

#### Issue UI-LIST-001: 기록 목록 페이지 전체 레이아웃
**복잡도**: 🟡 Mid | **소요시간**: 2시간

```markdown
# Issue: 기록 목록 페이지 레이아웃 (Sidebar + Main)

## 목적
사이드바 + 메인 콘텐츠 2열 레이아웃 구성

## 설계 참고
- 좌측 사이드바: w-72, bg-white, border-r
- 우측 메인: flex-1, max-w-5xl
- 데스크톱: 2열 | 모바일: 1열

## 완료 조건 (Acceptance Criteria)

### AC 1: 사이드바 렌더링
- Given 기록 목록 페이지 로드
- When 페이지 확인
- Then 좌측에 사이드바:
  - 배경: bg-white, border-r border-gray-100
  - 너비: w-72
  - 패딩: p-6

### AC 2: 네비게이션 메뉴
- Given 사이드바
- When 메뉴 확인
- Then 다음이 보임:
  - "기록 목록" (활성화, bg-indigo-50, text-indigo-600)
  - "새 기록 작성" (text-gray-600)
  - "마이페이지" (text-gray-600)
  - "로그아웃" (하단, text-red-500)

### AC 3: 메인 콘텐츠 영역
- Given 우측 영역
- When 확인
- Then 다음이 보임:
  - flex-1 너비, max-w-5xl
  - 배경: bg-stone-50
  - 패딩: px-8 py-8 (데스크톱), px-4 py-4 (모바일)

### AC 4: 모바일 반응형 (375px)
- Given 모바일 기기
- When 로드
- Then 사이드바 숨김, 상단 메뉴 바 표시
  또는 사이드바가 오버레이로 표시

### AC 5: 데스크톱 레이아웃 (1024px+)
- Given 데스크톱
- When 로드
- Then 사이드바와 메인이 나란히 표시
```

---

#### Issue UI-LIST-002: 페이지 헤더 (제목 + 새 기록 버튼)
**복잡도**: 🟢 Low | **소요시간**: 1시간

```markdown
# Issue: 기록 목록 페이지 헤더

## 목적
페이지 제목과 새 기록 작성 CTA 버튼

## 완료 조건 (Acceptance Criteria)

### AC 1: 제목 렌더링
- Given 메인 콘텐츠 상단
- When 텍스트 확인
- Then "오늘 마음은 어땠나요?" (text-3xl, font-bold, text-gray-900)

### AC 2: 부제
- Given 제목 아래
- When 텍스트 확인
- Then 작은 설명 (text-gray-600, text-sm)
  "원트 감정이 있다면, 짧게라도 정리해볼까요."

### AC 3: 새 기록 버튼
- Given 제목의 우측
- When 버튼 확인
- Then Primary Button (h-10, px-6, rounded-xl):
  - 텍스트: "+ 새 기록 작성"
  - 배경: bg-indigo-600, hover:bg-indigo-700
  - 클릭 시: /record-form 또는 모달 열기

### AC 4: 레이아웃 (Flexbox)
- Given 헤더 영역
- When 확인
- Then flex로 제목과 버튼이 양쪽으로 배치
  - 좌측: 제목 (flex-1)
  - 우측: 버튼 (flex-shrink-0)
```

---

#### Issue UI-LIST-003: 필터 탭 (전체 / 작성 완료 / 임시 저장)
**복잡도**: 🟡 Mid | **소요시간**: 1.5시간

```markdown
# Issue: 필터 탭 (상태별 필터)

## 목적
기록을 상태(전체/완료/임시저장)별로 필터링

## 설계
- 3개 탭: "전체", "작성 완료", "임시 저장"
- 활성 탭: bg-indigo-600, text-white, rounded-full
- 비활성: text-gray-600, hover:text-gray-900

## 완료 조건 (Acceptance Criteria)

### AC 1: 탭 렌더링
- Given 헤더 아래
- When 탭 확인
- Then 다음이 보임:
  - "전체" (기본값, 활성화)
  - "작성 완료" (비활성)
  - "임시 저장" (비활성)
  - 각 탭: h-10, px-4, rounded-full

### AC 2: 탭 선택 (클릭)
- Given "작성 완료" 탭 클릭
- When 클릭 실행
- Then 다음이 보임:
  - "작성 완료" 탭이 활성화 (bg-indigo-600, text-white)
  - "전체" 탭이 비활성화 (text-gray-600)
  - 기록 목록이 완료된 것만 표시

### AC 3: 필터링 동작
- Given "임시 저장" 탭 클릭
- When 클릭 실행
- Then status='draft'인 기록만 표시

### AC 4: 전체 탭
- Given "전체" 탭 클릭
- When 클릭 실행
- Then 필터 없이 모든 기록 표시 (최신순 정렬)

### AC 5: URL 상태 동기화 (Optional)
- Given 탭 선택
- When URL 확인
- Then URL이 ?filter=completed 형태로 변경 (북마크 가능)
```

---

### 카드 관련 이슈

#### Issue UI-LIST-004: 기록 카드 (개별)
**복잡도**: 🟡 Mid | **소요시간**: 2.5시간

```markdown
# Issue: 기록 목록 카드 (개별 기록)

## 목적
기록을 카드 형태로 표시 (감정, 제목, 날짜, 상태)

## 설계
- 크기: min-h-[96px]
- 레이아웃: 좌측 감정 배지 + 중앙 텍스트 + 우측 상태/날짜
- hover 시: bg-gray-50, shadow-md, cursor-pointer

## 완료 조건 (Acceptance Criteria)

### AC 1: 카드 구조
- Given 필터된 기록 목록
- When 각 카드 확인
- Then 다음이 보임:
  - 감정 배지 (좌측 상단)
  - 감정명 + 강도 (예: "불안 80")
  - 기록 내용 한 줄 요약 (상황의 첫 문장)
  - 날짜/시간 (우측 상단)
  - 상태 배지 (우측 하단: "작성 완료" or "임시 저장")

### AC 2: 감정 배지 색상
- Given 감정 배지
- When 감정 확인
- Then 각 감정별 색상:
  - 불안: bg-orange-100, text-orange-800
  - 자책: bg-indigo-50, text-indigo-700
  - 수치심: bg-emerald-50, text-emerald-700
  - 후회: bg-blue-50, text-blue-700
  - 분노: bg-red-50, text-red-700
  - 좌절: bg-gray-100, text-gray-700
  - 외로움: bg-purple-50, text-purple-700

### AC 3: 상태 배지
- Given 우측 하단
- When 상태 확인
- Then "작성 완료" or "임시 저장" 배지:
  - 완료: bg-green-50, text-green-600
  - 임시: bg-amber-50, text-amber-600

### AC 4: Hover 상태
- Given 카드에 마우스 오버
- When 상태 확인
- Then:
  - 배경: bg-gray-50
  - 그림자: shadow-md
  - cursor: cursor-pointer

### AC 5: 클릭 동작
- Given 카드 클릭
- When 클릭 실행
- Then 기록 상세 페이지로 이동 (/records/{id})

### AC 6: 긴 텍스트 처리
- Given 기록 내용이 매우 긺
- When 카드 렌더링
- Then 한 줄로 자르기 (overflow-hidden, truncate)
  예: "팀플 회의에서 내 의견을 팀장이..."
```

---

#### Issue UI-LIST-005: 기록 목록 그리드 레이아웃
**복잡도**: 🟢 Low | **소요시간**: 1시간

```markdown
# Issue: 기록 카드 그리드 배치

## 목적
기록 카드들을 그리드로 배치

## 설계
- 열 수: 데스크톱 1열 (max-width에 영향), 그냥 세로 리스트
- 간격: gap-4
- 정렬: 최신순 (created_at DESC)

## 완료 조건 (Acceptance Criteria)

### AC 1: 그리드 구조
- Given 기록 목록
- When 레이아웃 확인
- Then 카드들이 space-y-4로 세로 배치됨

### AC 2: 정렬 (최신순)
- Given 여러 기록이 있는 상태
- When 목록 확인
- Then 최신 기록이 맨 위에 표시됨 (created_at DESC)

### AC 3: 기본 카드 갯수
- Given 목록 페이지 로드
- When 화면 확인
- Then 화면에 보이는 기록: 약 5-6개 (페이징 필요)
```

---

### 페이징 관련 이슈

#### Issue UI-LIST-006: 페이징 (Pagination)
**복잡도**: 🟡 Mid | **소요시간**: 2시간

```markdown
# Issue: 페이징 (페이지 네비게이션)

## 목적
기록이 많을 때 페이지 단위로 표시

## 설계
- 페이지당 기록 수: 10개
- 페이징 UI: "< 1 2 3 ... >" 형태
- 현재 페이지: 파란색, 활성화
- 비활성 페이지: 회색, hover 시 변경

## 완료 조건 (Acceptance Criteria)

### AC 1: 페이징 UI 렌더링
- Given 기록이 10개 이상
- When 목록 하단 확인
- Then 다음이 보임:
  - 좌측 화살표 "<" (첫 페이지에서는 disabled)
  - 페이지 번호: "1 2 3 4 ... 12"
  - 우측 화살표 ">" (마지막 페이지에서는 disabled)

### AC 2: 현재 페이지 표시
- Given 2페이지 접속
- When 페이지 번호 확인
- Then "2"가 파란색 (bg-indigo-600, text-white, rounded-full)

### AC 3: 페이지 이동
- Given "3" 페이지 번호 클릭
- When 클릭 실행
- Then 3페이지의 기록이 로드됨
  + URL이 ?page=3로 변경

### AC 4: 이전/다음 화살표
- Given 현재 2페이지
- When "<" 화살표 클릭
- Then 1페이지로 이동

### AC 5: 첫/마지막 페이지 처리
- Given 1페이지
- When "<" 화살표 확인
- Then disabled 상태 (text-gray-300, cursor-not-allowed)

### AC 6: 마지막 페이지 처리
- Given 마지막 페이지 (예: 12)
- When ">" 화살표 확인
- Then disabled 상태

### AC 7: 페이지 로딩
- Given "3" 클릭하여 페이지 전환
- When API 로드 중
- Then 로딩 상태 표시 (스피너 또는 카드 스켈레톤)
```

---

#### Issue UI-LIST-007: 빈 상태 (Empty State)
**복잡도**: 🟢 Low | **소요시간**: 1시간

```markdown
# Issue: 기록이 없을 때 빈 상태 UI

## 목적
기록이 없거나 필터 결과가 0개일 때의 UX

## 설계
- 큰 아이콘 (📭 또는 일러스트)
- 제목: "아직 마음 기록이 없어요."
- 부제: "지금 떠오르는 상황 한 문장부터 시작해보세요."
- CTA 버튼: "첫 기록 작성하기"

## 완료 조건 (Acceptance Criteria)

### AC 1: 빈 상태 렌더링 (0개)
- Given 첫 가입 후 기록이 없는 상태
- When 기록 목록 페이지 로드
- Then 다음이 보임:
  - 중앙 정렬된 empty state:
  - 큰 아이콘 또는 일러스트
  - 제목: "아직 마음 기록이 없어요." (text-2xl, font-bold)
  - 부제: "지금 떠오르는 상황..." (text-gray-600, text-sm)

### AC 2: CTA 버튼
- Given empty state 하단
- When 버튼 확인
- Then "첫 기록 작성하기" Primary Button
  + 클릭 시: /record-form으로 이동

### AC 3: 필터 결과 0개
- Given "작성 완료" 탭 선택했는데 완료된 기록이 0개
- When 목록 확인
- Then empty state 표시:
  - 제목: "작성을 완료한 기록이 없어요."
  - 버튼: "새 기록 작성하기"

### AC 4: 필터별 메시지
- Given 다양한 필터 결과
- When 0개일 때
- Then 상황에 맞는 메시지:
  - 전체 0개: "아직 마음 기록이 없어요."
  - 완료 0개: "작성을 완료한 기록이 없어요."
  - 임시저장 0개: "임시 저장된 기록이 없어요."
```

---

#### Issue UI-LIST-008: 로딩 상태 및 에러 처리
**복잡도**: 🟡 Mid | **소요시간**: 1.5시간

```markdown
# Issue: 로딩 상태 및 API 에러 처리

## 목적
기록 조회 중 로딩 표시 및 에러 시 적절한 메시지

## 완료 조건 (Acceptance Criteria)

### AC 1: 초기 로딩 상태
- Given 기록 목록 페이지 처음 로드
- When API 요청 중
- Then 다음이 보임:
  - 카드 스켈레톤 5-6개 (회색 플레이스홀더)
  - 또는 로딩 스피너

### AC 2: 페이지 전환 로딩
- Given 페이징에서 다음 페이지 클릭
- When API 로드 중
- Then 로딩 스피너 또는 페이드 아웃/인 효과

### AC 3: API 실패 (500 에러)
- Given API 요청 실패
- When 에러 응답
- Then 에러 메시지 카드 표시:
  - 제목: "기록을 불러올 수 없습니다."
  - 버튼: "다시 시도" (onclick으로 재요청)

### AC 4: 네트워크 에러
- Given 인터넷 연결 끊김
- When 기록 조회 시도
- Then "네트워크 연결을 확인해주세요" 메시지

### AC 5: 권한 에러 (403)
- Given 다른 사용자의 기록 접근 시도
- When 403 응답
- Then "접근할 수 없는 기록입니다." 메시지
```

---

## 📊 이슈 요약

| ID | 이슈 | 복잡도 | 시간 | 상태 |
|----|------|--------|------|------|
| UI-LIST-001 | 페이지 레이아웃 | 🟡 | 2h | 🔴 |
| UI-LIST-002 | 헤더 (제목 + 버튼) | 🟢 | 1h | 🔴 |
| UI-LIST-003 | 필터 탭 | 🟡 | 1.5h | 🔴 |
| UI-LIST-004 | 기록 카드 (개별) | 🟡 | 2.5h | 🔴 |
| UI-LIST-005 | 그리드 레이아웃 | 🟢 | 1h | 🔴 |
| UI-LIST-006 | 페이징 | 🟡 | 2h | 🔴 |
| UI-LIST-007 | Empty State | 🟢 | 1h | 🔴 |
| UI-LIST-008 | 로딩/에러 처리 | 🟡 | 1.5h | 🔴 |
| **합계** | **8개** | | **12.5h** | |

---

## ✅ 구현 순서 (의존성)

```
1. UI-LIST-001 (레이아웃) 
   ↓
2. UI-LIST-002 (헤더)
3. UI-LIST-003 (필터 탭)
   ↓
4. UI-LIST-004 (카드) + UI-LIST-005 (그리드)
   ↓
5. UI-LIST-006 (페이징)
6. UI-LIST-007 (빈 상태)
7. UI-LIST-008 (로딩/에러)
```

---

**작성일**: 2026-07-02  
**페이지**: 기록 목록 페이지 (Image #4)  
**복잡도**: 🟡 Mid
