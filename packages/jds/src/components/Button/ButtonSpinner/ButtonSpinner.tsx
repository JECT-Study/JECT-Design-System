import { clsx } from "clsx";

import * as styles from "./buttonSpinner.css";
import type { IconSize } from "../../Icon";
import { sizeMap } from "../../Icon/IconMap";

interface ButtonSpinnerProps {
  size: IconSize;
  className?: string;
}

const ARC_PATH = "M8 2A6 6 0 0 1 13.638 5.948";

export const ButtonSpinner = ({ size, className }: ButtonSpinnerProps) => {
  const pixelSize = sizeMap[size];

  return (
    <svg
      aria-hidden
      data-part='spinner'
      width={pixelSize}
      height={pixelSize}
      viewBox='0 0 16 16'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      className={clsx(styles.root, className)}
    >
      <circle cx={8} cy={8} r={6} className={styles.track} />
      <path d={ARC_PATH} className={styles.tail} />
      <path d={ARC_PATH} className={styles.head} />
    </svg>
  );
};
