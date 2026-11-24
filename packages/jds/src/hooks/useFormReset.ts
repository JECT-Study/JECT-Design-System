import { useEffect, type RefObject } from "react";

import { usePreservedCallback } from "./usePreservedCallback";

interface FormAssociatedElement {
  readonly form: HTMLFormElement | null;
}

export interface UseFormResetOptions {
  /** 폼에 연결된 컨트롤의 ref. 컨트롤이 속한 폼에 reset 리스너를 연결한다. */
  controlRef: RefObject<FormAssociatedElement>;
  /** 컨트롤의 `form` 속성. 값이 바뀌면 연결할 폼을 다시 찾는다. */
  form?: string;
  /** 취소되지 않은 reset의 기본 동작이 끝난 뒤 호출한다. */
  onReset: () => void;
}

/**
 * 컨트롤이 속한 폼이 reset되면 `onReset`을 호출한다.
 *
 * reset 기본 동작이 끝난 다음 태스크에서 호출하므로, native 값이 비워진 뒤에 내부 상태를 되돌릴 수 있고
 * 소비처가 `preventDefault()`로 초기화를 취소했는지도 이 시점에 확인한다.
 * 호출 전에 컨트롤이 제거되거나 다른 폼에 연결되면 이전 reset은 적용하지 않는다.
 */
export const useFormReset = ({ controlRef, form, onReset }: UseFormResetOptions) => {
  const handleReset = usePreservedCallback(onReset);

  useEffect(() => {
    const formElement = controlRef.current?.form ?? null;
    if (formElement === null) return;

    const resetTimers = new Set<ReturnType<typeof setTimeout>>();

    const handleFormReset = (event: Event) => {
      const timeoutId = setTimeout(() => {
        resetTimers.delete(timeoutId);
        if (event.defaultPrevented || controlRef.current?.form !== formElement) return;

        handleReset();
      }, 0);
      resetTimers.add(timeoutId);
    };

    formElement.addEventListener("reset", handleFormReset);
    return () => {
      formElement.removeEventListener("reset", handleFormReset);
      resetTimers.forEach(timeoutId => clearTimeout(timeoutId));
    };
  }, [controlRef, form, handleReset]);
};
