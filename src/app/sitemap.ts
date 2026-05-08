import { MetadataRoute } from "next";
import dataProjects from "@/app/data/project_info.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: "https://timothe.vercel.app",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
  const projectRoutes: MetadataRoute.Sitemap = dataProjects.map((project) => ({
    url: `https://timothe.vercel.app/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
