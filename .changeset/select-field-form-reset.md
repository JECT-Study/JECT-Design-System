---
"@jects/jds": patch
---

**SelectField**

`SelectField.Input`이 속한 폼을 초기화하면 선택값이 최초 `defaultValue`로 돌아갑니다. `defaultValue`가 없으면 선택이 해제됩니다. 선택 해제는 `onChange`로 알리지 않습니다. 이전에는 초기화 전 선택값이 남았습니다. 소비처 코드는 수정하지 않아도 됩니다.
