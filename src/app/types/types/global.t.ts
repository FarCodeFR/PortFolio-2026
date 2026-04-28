export type PropsShell = {
  children: React.ReactNode;
  selectedProject: number | null;
  onCloseDetail: () => void;
  setSelectedProject: (n: number) => void;
  setIntroDone: (value: boolean) => void;
};

export type ProjectDetailProps = {
  onCloseDetail: () => void;
  selectedProject: number | null;
  setSelectedProject: (n: number) => void;
};

export type WeatherAppProps = {
  projectDetailContentRef: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  slideCount: number;
};
