// src/app/page.tsx
"use client";

import { useState } from "react";
import ProjectGrid from "./components/sections/home/ProjectGrid";
import SiteShell from "./components/layout/SiteShell";

export default function Home() {
  return (
    <SiteShell>
      <main className="main">
        <ProjectGrid />
      </main>
    </SiteShell>
  );
}
