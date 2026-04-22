import type { Dispatch, SetStateAction } from "react";

export type AboutProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
