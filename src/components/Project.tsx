import Link from "next/link";
import { Card } from "./Card";

const projects = [
    {
        slug: "emr-hms",
        title: "EMR & HMS",
        description:
            "Migrated paper-based hospital workflows into a fully digital integrated platform, reducing patient registration time by 40% and cutting UX-related staff complaints by 60%.",
        date: "2025-07-01",
        tags: ["React.js", "Next.js", "Healthcare"],
        category: "Frontend",
        featured: true,
    },
    {
        slug: "blockchain-ticketing",
        title: "Concert Ticket Marketplace",
        description:
            "Decentralized ticketing platform on Ethereum Layer 2 to prevent fraud and double spending via smart contracts for ticket ownership, transfer, and controlled resale.",
        date: "2025-01-01",
        tags: ["Ethereum L2", "Smart Contract", "Next.js"],
        category: "Full Stack",
        featured: false,
    },
    {
        slug: "olimpiade-biology-its",
        title: "Olympiad of Biology ITS",
        description:
            "Full-stack competition platform built from scratch, replacing a fully manual process and serving 500+ participants across 30+ universities. Features RBAC with 3 user roles and a real-time admin dashboard for participant verification.",
        date: "2023-10-01",
        tags: ["Next.js", "TypeScript", "Golang", "RBAC"],
        category: "Full Stack",
        featured: false,
    },
    {
        slug: "hate-speech-detection",
        title: "Hate Speech & Offensive Language Detection",
        description:
            "Automated detection system trained on 24,783 tweets with a full ML pipeline: preprocessing, TF-IDF extraction, SMOTE balancing, and Grid Search tuning. Neural Network achieved 95.89% accuracy.",
        date: "2024-06-01",
        tags: ["Python", "Scikit-learn", "SVM", "Neural Network"],
        category: "AI / ML",
        featured: false,
    },
];

const categoryColor: Record<string, string> = {
    "AI / ML": "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    Frontend: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    "Full Stack": "text-sky-400 bg-sky-500/10 border-sky-500/20",
};

export const dynamic = "force-dynamic";

function formatDate(dateString: string) {
    return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
        new Date(dateString)
    );
}

export default function Projects() {
    const featured = projects.find((p) => p.featured)!;
    const rest = projects.filter((p) => !p.featured);

    return (
        <div className="relative w-full">
            <div className="mx-auto space-y-8 max-w-7xl md:space-y-16">

                {/* Grid Layout Sistem Bawaan */}
                <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">

                    {/* Kolom Kiri / Utama: Featured Project */}
                    <div className="lg:row-span-2 h-full">
                        <Card>
                            <Link href={`/projects/${featured.slug}`}>
                                <article className="relative flex flex-col justify-between w-full h-full p-4 md:p-8 min-h-87.5">
                                    <div>
                                        <div className="flex items-center justify-between gap-2">
                                            <time
                                                dateTime={new Date(featured.date).toISOString()}
                                                className="text-xs text-zinc-500"
                                                suppressHydrationWarning
                                            >
                                                {formatDate(featured.date)}
                                            </time>
                                            <span
                                                className={`text-xs px-2 py-0.5 rounded-full border ${categoryColor[featured.category]}`}
                                            >
                                                {featured.category}
                                            </span>
                                        </div>

                                        <h2 className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display">
                                            {featured.title}
                                        </h2>
                                        <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                                            {featured.description}
                                        </p>
                                    </div>

                                    <div className="mt-6">
                                        <div className="flex flex-wrap gap-1.5 mb-8">
                                            {featured.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-xs text-zinc-500 bg-zinc-800/50 px-2 py-0.5 rounded"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block text-sm">
                                            Read more <span aria-hidden="true">→</span>
                                        </p>
                                    </div>
                                </article>
                            </Link>
                        </Card>
                    </div>

                    {/* Sisa Project List */}
                    {rest.map((project, index) => (
                        <div
                            key={project.slug}
                            className={index === rest.length - 1 ? "lg:col-span-full" : ""}
                        >
                            <Card>
                                <Link href={`/projects/${project.slug}`}>
                                    <article className="relative w-full h-full p-4 md:p-8 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between gap-2">
                                                <time
                                                    dateTime={new Date(project.date).toISOString()}
                                                    className="text-xs text-zinc-500"
                                                    suppressHydrationWarning
                                                >
                                                    {formatDate(project.date)}
                                                </time>
                                                <span
                                                    className={`text-xs px-2 py-0.5 rounded-full border ${categoryColor[project.category]}`}
                                                >
                                                    {project.category}
                                                </span>
                                            </div>

                                            <h2 className="mt-4 text-xl font-bold text-zinc-100 group-hover:text-white font-display">
                                                {project.title}
                                            </h2>
                                            <p className="mt-2 leading-7 text-sm duration-150 text-zinc-400 group-hover:text-zinc-300">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-1.5 mt-4">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-xs text-zinc-500 bg-zinc-800/50 px-2 py-0.5 rounded"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </article>
                                </Link>
                            </Card>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}