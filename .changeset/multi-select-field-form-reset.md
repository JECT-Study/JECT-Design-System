---
"@jects/jds": patch
---

**MultiSelectField**

`MultiSelectField.Input`이 속한 폼을 초기화하면 선택값이 최초 `defaultValue`로 돌아갑니다. 제어 모드에서는 `onChange`가 빈 배열로 호출됩니다. 이전에는 초기화 전 선택값이 남았습니다. 소비처 코드는 수정하지 않아도 됩니다.
