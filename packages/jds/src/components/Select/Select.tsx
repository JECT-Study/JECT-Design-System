import { forwardRef } from "react";

import type { SelectProps } from "./select.types";
import { Listbox, useListbox, useSingleSelectState } from "../Listbox";

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      variant = "label",
      label,
      disabled = false,
      width,
      height,
      maxHeight,
      options,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
    },
    ref,
  ) => {
    // Select에는 선택을 해제하는 경로가 없으므로 선택한 값만 onChange로 알린다.
    const { selectedValues, select } = useSingleSelectState(value, defaultValue, next => {
      if (next != null) onChange?.(next);
    });

    const { listboxRef, behavior, getFocusableListboxProps } = useListbox({
      selectedValues,
      disabled,
      onSelect: select,
    });

    return (
      <Listbox
        ref={ref}
        behavior={behavior}
        selectionMode='single'
        variant={variant}
        label={label}
        width={width}
        height={height}
        maxHeight={maxHeight}
        listboxRef={listboxRef}
        listboxProps={getFocusableListboxProps()}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
      >
        {options.map(option => (
          <Listbox.Option
            key={option.value}
            value={option.value}
            caption={option.caption}
            suffix={option.suffix}
            disabled={option.disabled}
          >
            {option.label}
          </Listbox.Option>
        ))}
      </Listbox>
    );
  },
);

Select.displayName = "Select";
