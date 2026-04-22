// src/app/page.tsx
"use client";

import { useState } from "react";
import ProjectGrid from "./components/sections/home/ProjectGrid";
import SiteShell from "./components/layout/SiteShell";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <SiteShell
      onCloseDetail={() => setSelectedProject(null)}
      selectedProject={selectedProject}
      setSelectedProject={setSelectedProject}
    >
      <main className="main">
        <ProjectGrid
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      </main>
    </SiteShell>
  );
}
