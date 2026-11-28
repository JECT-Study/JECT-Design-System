import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "tokens";
import { overlayHoverOpacity, overlayPressedOpacity } from "utils";

export const loadingRoot = style({
  selectors: {
    "&[data-loading]": {
      cursor: "progress",
      vars: {
        [overlayHoverOpacity]: "0",
        [overlayPressedOpacity]: "0",
      },
    },
  },
});

export const buttonContent = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "inherit",
  selectors: {
    "[data-loading] > &": { opacity: 0 },
  },
});

export const root = style({
  position: "absolute",
  inset: 0,
  margin: "auto",
  pointerEvents: "none",
});

export const track = style({
  opacity: `calc(${vars.scheme.semantic.opacity["29"]} / 100)`,
});

const tailRotate = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "50%": { transform: "rotate(360deg)" },
  "100%": { transform: "rotate(720deg)" },
});

const headRotate = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "50%": { transform: "rotate(430deg)" },
  "100%": { transform: "rotate(720deg)" },
});

const arc = style({
  transformBox: "view-box",
  transformOrigin: "50% 50%",
  animationDuration: "2s",
  animationTimingFunction: "ease",
  animationIterationCount: "infinite",
});

export const tail = style([arc, { animationName: tailRotate }]);

export const head = style([arc, { animationName: headRotate }]);
