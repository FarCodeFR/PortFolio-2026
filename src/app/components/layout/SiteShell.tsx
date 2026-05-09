"use client";

import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { PropsShell } from "@/app/types/types/global.t";
import Contact from "../sections/Contact/Contact";
import About from "../sections/About/About";
import PageTransition from "./PageTransition";
import { TransitionProvider } from "@/app/context/TransitionContext";

export default function SiteShell({ children }: PropsShell) {
  const [open, setOpen] = useState<boolean>(false);
  const [openContact, setOpenContact] = useState<boolean>(false);

  return (
    <TransitionProvider>
      <PageTransition />
      <div className="page">
        <Header setOpen={setOpen} setOpenContact={setOpenContact} />
        {children}
        <Contact setOpenContact={setOpenContact} openContact={openContact} />
        <About setOpen={setOpen} open={open} />
        <Footer />
      </div>
    </TransitionProvider>
  );
}
