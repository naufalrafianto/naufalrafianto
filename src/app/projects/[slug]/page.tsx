import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { getProject, getAllProjects } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx-components";




interface Props {
    params: Promise<{ slug: string }>;
}

const categoryColor: Record<string, string> = {
    "AI / ML": "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    Frontend: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    "Full Stack": "text-sky-400 bg-sky-500/10 border-sky-500/20",
};



export async function generateStaticParams() {
    const projects = await getAllProjects();
    return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const project = await getProject(slug);
    if (!project) return {};

    const { title, description, date, tags } = project.metadata;
    const url = `https://naufalrafianto.xyz/projects/${slug}`;

    return {
        title,
        description,
        keywords: tags ?? [],
        alternates: { canonical: url },
        openGraph: {
            title,
            description,
            url,
            type: "article",
            publishedTime: date,
            authors: ["Muhammad Naufal Rafianto"],
            images: [
                {
                    url: "/image/IMG_8073.jpg",
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}


export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const project = await getProject(slug);
    if (!project) notFound();

    const { metadata, content } = project;

    return (
        <main className="min-h-screen bg-linear-to-tl from-black via-zinc-900 to-black">
            <div className="max-w-2xl mx-auto px-6 py-20">

                {/* Back */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs text-zinc-600 hover:text-zinc-400 transition-colors mb-16 uppercase tracking-widest"
                >
                    <ArrowLeft size={12} />
                    Back
                </Link>

                {/* Meta */}
                <div className="mb-12 space-y-3">
                    <div className="flex items-center gap-3">
                        {metadata.category && (
                            <span
                                className={`text-xs px-2.5 py-1 rounded-full border ${categoryColor[metadata.category] ??
                                    "text-zinc-400 bg-zinc-800 border-zinc-700"
                                    }`}
                            >
                                {metadata.category}
                            </span>
                        )}
                        {metadata.date && (
                            <time className="text-xs text-zinc-600">
                                {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
                                    new Date(metadata.date)
                                )}
                            </time>
                        )}
                    </div>

                    {metadata.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {metadata.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs text-zinc-500 bg-zinc-800/40 border border-zinc-800 px-2.5 py-0.5 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Content */}
                <article className="prose-none">
                    <MDXRemote
                        source={content}
                        components={mdxComponents}
                        options={{
                            mdxOptions: {
                                remarkPlugins: [remarkGfm],
                                rehypePlugins: [
                                    [
                                        rehypePrettyCode,
                                        {
                                            theme: { light: "github-light", dark: "github-dark" },
                                            keepBackground: false,
                                        },
                                    ],
                                ],
                            },
                        }}
                    />
                </article>
            </div>
        </main>
    );
}