export type OpenType = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenContact: React.Dispatch<React.SetStateAction<boolean>>;
  setIntroDone: (value: boolean) => void;
};
