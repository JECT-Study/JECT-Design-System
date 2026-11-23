import { Popover } from "radix-ui";
import type { FocusEventHandler, RefObject } from "react";
import type { AriaLabelProps } from "types";

import { TimePicker, type TimeValue } from "../../TimePicker";
import * as styles from "../timeField.css";
import type { TimeFieldInputProps } from "../timeField.types";
import { timeToValue, valueToTime } from "../timeField.utils";

interface TimeFieldPickerProps extends Pick<
  TimeFieldInputProps,
  "minuteStep" | "minTime" | "maxTime" | "withActionBar"
> {
  contentRef: RefObject<HTMLDivElement>;
  /** 시간 선택 팝오버의 이름. Radix가 role="dialog"로 노출하며, 시간 선택 버튼과 같게 읽힌다. */
  popoverName: AriaLabelProps;
  /** 팝오버 안 TimePicker(role="group")의 이름으로 쓰는 필드 라벨. 둘 다 없으면 TimePicker 기본 이름을 쓴다. */
  fieldLabel: string | undefined;
  fieldLabelledBy: string | undefined;
  onFocus: FocusEventHandler<HTMLDivElement>;
  onBlur: FocusEventHandler<HTMLDivElement>;
  /** "HH:mm" 형식의 값. 비어 있으면 선택된 시각이 없다. */
  value: string;
  /** 선택된 시각이 없을 때 한 열만 고르면 나머지 단위를 채울 기준 시각. 일부만 입력한 시각을 넘긴다. */
  referenceTime: TimeValue | undefined;
  /** 시간 선택에서 시각을 확정하면 "HH:mm" 값으로 호출된다. */
  onSelect: (value: string) => void;
  onCloseAutoFocus: (event: Event) => void;
  onInteractOutside: () => void;
}

const FOCUSABLE_COLUMN_SELECTOR = '[role="listbox"][tabindex="0"]';

// 입력은 분까지만 다루고 범위의 초를 무시한다. TimePicker도 같은 경계를 쓰도록 초를 버리고 넘긴다.
// 그대로 넘기면 minTime이 09:30:45일 때 09:30을 직접 입력할 수는 있지만 시간 선택에서는 고를 수 없다.
const toMinuteBoundary = (time: TimeValue | undefined): TimeValue | undefined =>
  time === undefined ? undefined : { ...time, second: 0 };

/**
 * @description 필드 박스 아래에 시간 선택을 띄우는 팝오버. `Popover.Root` 안에서 사용한다.
 * 입력값과 같은 "HH:mm" 값을 주고받고, `TimePicker`가 쓰는 시각 객체와의 변환은 여기서 한다.
 * TimePicker는 자기 role을 group으로 정하므로 asChild로 합치지 않고 감싸서, 팝오버가 버튼이 알린 dialog 역할을 유지하게 한다.
 */
export const TimeFieldPicker = ({
  contentRef,
  popoverName,
  fieldLabel,
  fieldLabelledBy,
  onFocus,
  onBlur,
  value,
  referenceTime,
  onSelect,
  withActionBar,
  minuteStep,
  minTime,
  maxTime,
  onCloseAutoFocus,
  onInteractOutside,
}: TimeFieldPickerProps) => {
  const handleChange = (time: TimeValue) => {
    onSelect(timeToValue(time));
  };

  // 첫 열(오전/오후)에서 시작한다. 열 안에서는 위아래, 열 사이는 좌우 방향키로 이동한다.
  const handleOpenAutoFocus = (event: Event) => {
    const column =
      contentRef.current?.querySelector<HTMLElement>(FOCUSABLE_COLUMN_SELECTOR) ?? null;
    if (column === null) return;

    event.preventDefault();
    column.focus();
  };

  return (
    <Popover.Portal>
      <Popover.Content
        ref={contentRef}
        align='start'
        sideOffset={4}
        collisionPadding={8}
        {...popoverName}
        className={styles.picker}
        onOpenAutoFocus={handleOpenAutoFocus}
        onCloseAutoFocus={onCloseAutoFocus}
        onInteractOutside={onInteractOutside}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <TimePicker
          aria-label={fieldLabel}
          aria-labelledby={fieldLabelledBy}
          format='hh:mm'
          value={valueToTime(value)}
          referenceTime={referenceTime}
          onChange={handleChange}
          withActionBar={withActionBar}
          minuteStep={minuteStep}
          minTime={toMinuteBoundary(minTime)}
          maxTime={toMinuteBoundary(maxTime)}
        />
      </Popover.Content>
    </Popover.Portal>
  );
};
