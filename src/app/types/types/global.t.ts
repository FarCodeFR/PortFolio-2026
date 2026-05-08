export type PropsShell = {
  children: React.ReactNode;
};

export type HomeProjectProps = {
  projectDetailContentRef: React.RefObject<HTMLDivElement | null>;
  projectInfoRef: React.RefObject<HTMLDivElement | null>;
};

export interface ProjectDetailProps {
  id: number;
  slug: string;
  title: string;
  headline: string;
  tag: string;
  category: string;
  year: string;
  image: string;
  about: string | null;
  role: string | null;
  stack: string[];
  mission: string | null;
  challenge: string | null;
  result: string | null;
  learning: string | null;
  github: string | null;
  live: string | null;
  background: string;
  image_mission: string;
  caroussel: string[];
  alt: string;
  detailImages?: string[];
  project?: string;
}
