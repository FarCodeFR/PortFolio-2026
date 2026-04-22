import { useRef } from "react";
import styles from "./Contact.module.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Reseau from "../About/Reseau";
import { ContactProps } from "@/app/types/types/contact.t";
import { useKeyHandler } from "@/app/hooks/animations/useKeyHandler";

gsap.registerPlugin(useGSAP);

function Contact({ setOpenContact, openContact }: ContactProps) {
  const contactRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Fermeture avec echape
  useKeyHandler("Escape", () => setOpenContact(false), openContact);

  useGSAP(
    () => {
      const panel = contactRef.current;
      const shape = shapeRef.current;
      const content = contentRef.current;

      if (!panel || !shape || !content) return;

      gsap.killTweensOf([panel, shape, content]);
      let tl: gsap.core.Timeline | undefined;
      if (openContact) {
        panel.classList.add(styles.visible);

        const tl = gsap.timeline();

        tl.set(content, { opacity: 0, y: 20 })
          .to(shape, {
            keyframes: [
              // Phase 1
              {
                xPercent: -50,
                yPercent: -50,
                scale: 0,
                rotate: 0,
                duration: 0,
              },
              // Phase 2
              {
                scale: 30,
                rotate: 265,
                duration: 1.5,
                ease: "power2.inOut",
              },
              // Phase 3
              {
                scale: 150,
                rotate: 268,
                duration: 1,
                ease: "power2.inOut",
              },
            ],
            xPercent: -50,
            yPercent: -50,
          })
          .to(
            content,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.2",
          );
      } else {
        tl = gsap.timeline({
          onComplete: () => {
            panel.classList.remove(styles.visible);
          },
        });
        tl.to(content, {
          opacity: 0,
          y: 20,
          duration: 0.25,
          ease: "power2.in",
        }).to(shape, {
          xPercent: -50,
          yPercent: -50,
          scale: 0,
          rotate: 0,
          duration: 1.5,
          ease: "power2.inOut",
        });
      }
      return () => {
        tl?.kill();
      };
    },
    {
      scope: contactRef,
      dependencies: [openContact],
    },
  );

  return (
    <div ref={contactRef} className={styles.container_contact}>
      <div ref={shapeRef} className={styles.bg_shape} />
      <div ref={contentRef} className={styles.content}>
        <button type="button" onClick={() => setOpenContact(false)}>
          Fermer
        </button>
        <Reseau variant="contact" />
      </div>
    </div>
  );
}

export default Contact;
