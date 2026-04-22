import type { Dispatch, SetStateAction } from "react";

export type ContactProps = {
  openContact: boolean;
  setOpenContact: Dispatch<SetStateAction<boolean>>;
};

export type ReseauContactProps = {
  openContact: boolean;
};
