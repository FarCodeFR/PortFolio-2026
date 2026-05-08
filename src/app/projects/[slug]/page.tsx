import { notFound } from "next/navigation";
import type { Metadata } from "next";
import dataProjects from "@/app/data/project_info.json";
import { ProjectDetailProps } from "../../types/types/global.t";
import ProjectDetail from "@/app/components/projects/ProjectDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ─── SSG : génère toutes les pages à build time ───────────────────────────────
// Next.js va pré-rendre /projects/weather-app, /projects/mazinger, etc.
// Résultat : pages statiques HTML → chargement instantané + indexation Google parfaite

export async function generateStaticParams() {
  return dataProjects.map((project) => ({
    slug: project.slug,
  }));
}

// ─── SEO : metadata unique par projet ─────────────────────────────────────────
// Google lit le <title> et la <meta description> générés ici
// L'image OpenGraph permet un beau preview sur les réseaux sociaux

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = dataProjects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Projet introuvable — Timothe Renard",
    };
  }

  return {
    title: `${project.title} — Timothe Renard`,

    // Le champ "about" de ton JSON devient la meta description
    // Idéalement 150-160 caractères pour Google
    description: project.about ?? undefined,

    openGraph: {
      title: `${project.title} — Timothe Renard`,
      description: project.about ?? undefined,
      images: project.image
        ? [
            {
              url: project.image,
              width: 1200,
              height: 600,
              alt: project.title,
            },
          ]
        : [],
      type: "website",
    },

    // Évite que Google indexe une page avec des données manquantes
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;

  // Switch project
  // const currentIndex = dataProjects.findIndex((p) => p.slug === project.slug);

  const currentIndex = dataProjects.findIndex((p) => p.slug === slug);
  const nextSlug = dataProjects[(currentIndex + 1) % dataProjects.length].slug;
  const nextTitle =
    dataProjects[(currentIndex + 1) % dataProjects.length].title;

  const project = dataProjects.find(
    (p) => p.slug === slug,
  ) as ProjectDetailProps;

  // Redirige vers 404 si le slug n'existe pas dans le JSON
  if (!project) return notFound();

  return (
    <ProjectDetail
      project={project}
      nextSlug={nextSlug}
      nextTitle={nextTitle}
    />
  );
}
