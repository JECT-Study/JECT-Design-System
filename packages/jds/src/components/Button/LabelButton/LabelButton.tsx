import { clsx } from "clsx";
import { Slot } from "radix-ui";
import { forwardRef, type MouseEvent } from "react";
import { getLabelClassName } from "utils";

import { basicRoot, feedbackRoot, iconSizeMap } from "./labelButton.css";
import type { LabelButtonProps } from "./labelButton.types";
import { Icon } from "../../Icon";
import { ButtonSpinner, buttonContent, loadingRoot } from "../ButtonSpinner";

export const LabelButton = forwardRef<HTMLButtonElement, LabelButtonProps>(
  (
    {
      asChild = false,
      children,
      size = "md",
      hierarchy,
      feedback,
      prefixIcon,
      suffixIcon,
      disabled = false,
      loading = false,
      className,
      onClick,
      ...restProps
    },
    forwardedRef,
  ) => {
    const iconSize = iconSizeMap[size];
    const rootClassName = feedback
      ? feedbackRoot({ feedback, size })
      : basicRoot({ hierarchy: hierarchy ?? "primary", size });

    const isLoading = loading && !disabled && !asChild;

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (isLoading) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClick?.(event);
    };

    const Component = asChild ? Slot.Root : "button";
    const nativeButtonProps = asChild ? {} : { type: "button" as const, disabled };

    const content = [
      prefixIcon && <Icon key='prefix' name={prefixIcon} size={iconSize} />,
      <Slot.Slottable key='label'>{children}</Slot.Slottable>,
      suffixIcon && <Icon key='suffix' name={suffixIcon} size={iconSize} />,
    ];

    return (
      <Component
        ref={forwardedRef}
        {...nativeButtonProps}
        {...restProps}
        {...(isLoading && { "aria-disabled": true, "aria-busy": true })}
        onClick={handleClick}
        data-disabled={disabled || undefined}
        data-loading={isLoading || undefined}
        data-part='root'
        className={clsx(
          getLabelClassName({ size, weight: "bold" }),
          rootClassName,
          loadingRoot,
          className,
        )}
      >
        {asChild ? content : <span className={buttonContent}>{content}</span>}
        {isLoading && <ButtonSpinner size={iconSize} />}
      </Component>
    );
  },
);

LabelButton.displayName = "LabelButton";
