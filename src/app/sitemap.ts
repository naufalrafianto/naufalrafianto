import { getAllProjects } from "@/lib/mdx";

export default async function sitemap() {
    const projects = await getAllProjects();
    const BASE = "https://naufalrafianto.xyz";

    const projectUrls = projects.map((p) => ({
        url: `${BASE}/projects/${p.slug}`,
        lastModified: new Date(p.metadata.date ?? Date.now()),
    }));

    return [
        { url: BASE, lastModified: new Date() },
        ...projectUrls,
    ];
}