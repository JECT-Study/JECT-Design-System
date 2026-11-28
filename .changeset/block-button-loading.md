---
"@jects/jds": minor
---

**BlockButton**

`loading` prop을 추가하고, 버튼 내용을 감싸는 요소를 추가했습니다. 버튼의 직계 자식을 기준으로 스타일을 지정하던 소비처는 확인이 필요합니다.

**추가**

- `loading` — 기본값 `false`, 내용을 숨겨 너비를 유지한 채 아이콘 크기의 스피너를 가운데에 표시, `aria-busy`와 `aria-disabled`를 지정하고 클릭과 부모로의 클릭 전파, hover, pressed 오버레이를 막음, 포커스는 유지
- `disabled`와 함께 지정하면 `disabled` 우선, `asChild`와는 함께 쓸 수 없음

**동작 변경 (코드 수정 불필요)**

- 렌더 구조 — `asChild`가 아니면 아이콘과 레이블이 `button`의 직계 자식이 아니라 내부 `span`의 자식으로 렌더링, `button > [data-part='icon']` 같은 직계 자식 선택자나 루트의 `justify-content`로 아이콘과 레이블을 배치하던 스타일은 확인 필요
