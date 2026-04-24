import { RefObject } from "react";

export type UseHeaderAnimationParams = {
  headerRef: RefObject<HTMLElement | null>;
  nameRef: RefObject<HTMLParagraphElement | null>;
  statusRef: RefObject<HTMLParagraphElement | null>;
};
