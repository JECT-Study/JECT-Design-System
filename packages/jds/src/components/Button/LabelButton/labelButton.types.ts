import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";

import type { IconName } from "../../Icon";

export const LABEL_BUTTON_SIZE_OPTIONS = ["xs", "sm", "md", "lg"] as const;
export const LABEL_BUTTON_HIERARCHY_OPTIONS = [
  "accent",
  "primary",
  "secondary",
  "tertiary",
] as const;
export const LABEL_BUTTON_FEEDBACK_OPTIONS = ["positive", "destructive"] as const;

export type LabelButtonSize = (typeof LABEL_BUTTON_SIZE_OPTIONS)[number];
export type LabelButtonHierarchy = (typeof LABEL_BUTTON_HIERARCHY_OPTIONS)[number];
export type LabelButtonFeedback = (typeof LABEL_BUTTON_FEEDBACK_OPTIONS)[number];

export interface BaseLabelButtonProps extends Omit<
  ComponentPropsWithoutRef<"button">,
  "children" | "disabled"
> {
  "data-part"?: never;
  size?: LabelButtonSize;
  prefixIcon?: IconName;
  suffixIcon?: IconName;
}

interface LabelButtonBasicProps {
  hierarchy?: LabelButtonHierarchy;
  feedback?: never;
}

interface LabelButtonFeedbackProps {
  feedback?: LabelButtonFeedback;
  hierarchy?: never;
}

interface LabelButtonNativeProps {
  asChild?: false;
  disabled?: boolean;
  loading?: boolean;
  children: ReactNode;
}

interface LabelButtonCustomProps {
  asChild: true;
  disabled?: never;
  loading?: never;
  children: ReactElement;
}

/**
 * `asChild`는 `disabled`, `loading`과 동시에 사용할 수 없다.
 *
 * asChild로 라우팅 컴포넌트를 전달하면 이동을 자식 요소가 제어하므로,
 * 비활성 상태는 asChild 없이 `<LabelButton disabled>`로 표현한다.
 *
 * `loading`은 내용을 숨기고 스피너를 표시하며 클릭을 막는다. 포커스는 유지한다.
 * `disabled`와 함께 지정하면 `disabled`가 우선한다.
 */
export type LabelButtonProps = BaseLabelButtonProps &
  (LabelButtonBasicProps | LabelButtonFeedbackProps) &
  (LabelButtonNativeProps | LabelButtonCustomProps);
