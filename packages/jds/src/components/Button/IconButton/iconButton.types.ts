import type { ComponentPropsWithoutRef, ReactElement } from "react";
import type { AriaLabelProps } from "types";

import type { IconName } from "../../Icon";

export const ICON_BUTTON_SIZE_OPTIONS = [
  "2xs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
] as const;
export const ICON_BUTTON_HIERARCHY_OPTIONS = [
  "accent",
  "primary",
  "secondary",
  "tertiary",
] as const;

export type IconButtonSize = (typeof ICON_BUTTON_SIZE_OPTIONS)[number];
export type IconButtonHierarchy = (typeof ICON_BUTTON_HIERARCHY_OPTIONS)[number];

interface IconButtonBaseProps extends Omit<
  ComponentPropsWithoutRef<"button">,
  "aria-label" | "aria-labelledby" | "children" | "disabled"
> {
  "data-part"?: never;
  icon: IconName;
  size?: IconButtonSize;
  condensed?: boolean;
}

interface IconButtonBasicProps {
  hierarchy?: IconButtonHierarchy;
  accentColor?: never;
}

interface IconButtonAccentProps {
  hierarchy: "accent";
  accentColor?: { normal: string; disabled?: string };
}

interface IconButtonNativeProps {
  asChild?: false;
  disabled?: boolean;
  loading?: boolean;
  children?: never;
}

interface IconButtonCustomProps {
  asChild: true;
  disabled?: never;
  loading?: never;
  children: ReactElement;
}

/**
 * `asChild`는 `disabled`, `loading`과 동시에 사용할 수 없다.
 *
 * asChild로 라우팅 컴포넌트를 전달하면 이동을 자식 요소가 제어하므로,
 * 비활성 상태는 asChild 없이 `<IconButton disabled>`로 표현한다.
 *
 * `loading`은 내용을 숨기고 스피너를 표시하며 클릭을 막는다. 포커스는 유지한다.
 * `disabled`와 함께 지정하면 `disabled`가 우선한다.
 *
 * asChild로 전달한 요소의 children은 무시하고 `icon`만 렌더링한다.
 * 요소는 비워서 전달하고, 접근 이름은 `aria-label`로 지정한다.
 *
 * @example
 * <IconButton asChild icon='home' aria-label='홈으로'>
 *   <Link href='/' />
 * </IconButton>
 */
export type IconButtonProps = IconButtonBaseProps &
  AriaLabelProps &
  (IconButtonBasicProps | IconButtonAccentProps) &
  (IconButtonNativeProps | IconButtonCustomProps);
