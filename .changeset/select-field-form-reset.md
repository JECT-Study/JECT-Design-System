---
"@jects/jds": minor
---

**SelectField**

`SelectField.Input`의 `onChange`가 선택 해제를 `null`로 전달합니다. `onChange`에 `string`만 받는 핸들러를 넘기던 코드는 타입을 넓혀야 합니다.

**소비처 영향 (코드 수정 필요)**

| AS-IS                               | TO-BE                                       |
| ----------------------------------- | ------------------------------------------- |
| `onChange: (value: string) => void` | `onChange: (value: string \| null) => void` |

```diff
- const [region, setRegion] = useState<string>("seoul");
+ const [region, setRegion] = useState<string | null>("seoul");

  <SelectField.Input options={options} value={region} onChange={setRegion} />
```

**동작 변경 (코드 수정 불필요)**

- 폼 초기화 시 선택값을 최초 `defaultValue`로 복원, `defaultValue`가 없으면 선택 해제
- 제어 모드에서 폼 초기화 시 `onChange(null)` 호출
- 이전에는 폼 초기화 후에도 초기화 전 선택값 유지
