import type { ComponentPropsWithoutRef } from "react";

import type { FieldKbdKeys, FieldProps, FieldStatus } from "../Field";
import type { OptionVariant, SelectOption } from "../Listbox";

export interface SelectFieldProps extends Omit<FieldProps, "status"> {
  status?: Exclude<FieldStatus, "success">;
}

interface SelectFieldInputBaseProps extends Omit<
  ComponentPropsWithoutRef<"input">,
  "id" | "type" | "value" | "defaultValue" | "onChange" | "required"
> {
  /** 필수 입력 여부. aria-required로 반영한다. */
  required?: boolean;
  options: SelectOption[];
  placeholder?: string;
  /** 항목 검색 가능 여부 */
  searchable?: boolean;
  variant?: OptionVariant;
  /** 입력과 화살표 사이에 표시하는 단축키. 최대 4개까지 지정할 수 있다. */
  kbd?: FieldKbdKeys;
}

interface SelectFieldInputControlledProps {
  /** 선택한 옵션의 값. `null`이면 선택하지 않은 상태다. */
  value: string | null;
  defaultValue?: never;
  /** 선택이 바뀔 때 호출한다. 폼 초기화로 선택이 해제되면 `null`을 전달한다. */
  onChange: (value: string | null) => void;
}

interface SelectFieldInputUncontrolledProps {
  value?: never;
  /** 최초 마운트의 선택값이자 폼 reset 기준. 이후 prop 변경은 반영하지 않는다. */
  defaultValue?: string;
  /** 선택이 바뀔 때 호출한다. 폼 초기화로 선택이 해제되면 `null`을 전달한다. */
  onChange?: (value: string | null) => void;
}

export type SelectFieldInputProps = SelectFieldInputBaseProps &
  (SelectFieldInputControlledProps | SelectFieldInputUncontrolledProps);
