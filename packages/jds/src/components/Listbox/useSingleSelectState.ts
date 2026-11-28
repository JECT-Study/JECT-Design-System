import { useControllableState } from "hooks";
import { useMemo } from "react";

export const useSingleSelectState = (
  value: string | null | undefined,
  defaultValue: string | undefined,
  onChange?: (value: string | null) => void,
) => {
  const [selectedValue, select] = useControllableState<string | null>(
    value,
    defaultValue ?? null,
    onChange,
  );

  const selectedValues = useMemo(
    () => (selectedValue == null ? [] : [selectedValue]),
    [selectedValue],
  );

  return { selectedValue, selectedValues, select };
};
