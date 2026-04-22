"use client";

import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { PropsShell } from "@/app/types/types/global.t";
import Contact from "../sections/Contact/Contact";
import About from "../sections/About/About";
import ProjectDetail from "../projects/ProjectDetail";

export default function SiteShell({
  children,
  selectedProject,
  setSelectedProject,
  onCloseDetail,
}: PropsShell) {
  const [open, setOpen] = useState<boolean>(false);
  const [openContact, setOpenContact] = useState<boolean>(false);

  return (
    <div className="page">
      <Header setOpen={setOpen} setOpenContact={setOpenContact} />

      {children}

      <Contact setOpenContact={setOpenContact} openContact={openContact} />
      <About setOpen={setOpen} open={open} />

      <ProjectDetail
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />

      <Footer
        onCloseDetail={onCloseDetail}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
    </div>
  );
}
