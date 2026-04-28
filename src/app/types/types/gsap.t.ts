import { RefObject } from "react";

export type UseHeaderAnimationParams = {
  headerRef: RefObject<HTMLElement | null>;
  nameRef: RefObject<HTMLParagraphElement | null>;
  statusRef: RefObject<HTMLParagraphElement | null>;
  timeRef: RefObject<HTMLDivElement | null>;
  linkRef: RefObject<HTMLUListElement | null>;
  setIntroDone: (value: boolean) => void;
};
