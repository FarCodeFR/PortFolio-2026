export type PropsShell = {
  children: React.ReactNode;
  selectedProject: number | null;
  onCloseDetail: () => void;
  setSelectedProject: (n: number) => void;
};

export type projectDetailProps = {
  onCloseDetail: () => void;
  selectedProject: number | null;
  setSelectedProject: (n: number) => void;
};

export type weatherAppProps = {
  projectDetailContentRef: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  slideCount: number;
};
