import { promises as fs } from "fs";
import matter from "gray-matter";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "projects");

export interface ProjectMetadata {
    title: string;
    description: string;
    date: string;
    category: string;
    tags: string[];
}

export interface Project {
    slug: string;
    metadata: ProjectMetadata;
    content: string;
}

export async function getProject(slug: string): Promise<Project | null> {
    try {
        const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
        const source = await fs.readFile(filePath, "utf-8");
        const { content, data } = matter(source);

        return {
            slug,
            metadata: data as ProjectMetadata,
            content,
        };
    } catch {
        return null;
    }
}

export async function getAllProjects(): Promise<Project[]> {
    try {
        const files = await fs.readdir(CONTENT_DIR);
        const projects = await Promise.all(
            files
                .filter((f) => f.endsWith(".mdx"))
                .map((f) => getProject(f.replace(".mdx", "")))
        );
        return projects.filter((p): p is Project => p !== null);
    } catch {
        return [];
    }
}