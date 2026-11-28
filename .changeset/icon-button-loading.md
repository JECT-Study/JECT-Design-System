---
"@jects/jds": patch
---

**IconButton**

`loading` prop을 추가했습니다. 기존 호출부는 수정할 필요가 없습니다.

- `loading` — 기본값 `false`, 내용을 숨겨 너비를 유지한 채 아이콘 크기의 스피너를 가운데에 표시, `aria-busy`와 `aria-disabled`를 지정하고 클릭과 부모로의 클릭 전파, hover, pressed 오버레이를 막음, 포커스는 유지
- `disabled`와 함께 지정하면 `disabled` 우선, `asChild`와는 함께 쓸 수 없음
