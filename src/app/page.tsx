// src/app/page.tsx
"use client";

import { useState } from "react";
import ProjectGrid from "./components/sections/home/ProjectGrid";
import SiteShell from "./components/layout/SiteShell";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  // Fin d'animation header
  const [introDone, setIntroDone] = useState(false);

  return (
    <SiteShell
      onCloseDetail={() => setSelectedProject(null)}
      selectedProject={selectedProject}
      setSelectedProject={setSelectedProject}
      setIntroDone={setIntroDone}
    >
      <main className="main">
        <ProjectGrid
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          introDone={introDone}
        />
      </main>
    </SiteShell>
  );
}
