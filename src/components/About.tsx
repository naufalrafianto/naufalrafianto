"use client";
import { Avatar } from "@/components/Avatar";
import React from "react";

const categorizedStacks = {
    Languages: [
        { label: "TypeScript", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
        { label: "Golang", color: "bg-sky-500/10 text-sky-400 border-sky-500/20" },
        { label: "Python", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
    ],
    Frontend: [
        { label: "React Native", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
        { label: "Next.js", color: "bg-zinc-500/10 text-zinc-300 border-zinc-500/20" },
        { label: "Vue.js", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
        { label: "Tailwind CSS", color: "bg-teal-500/10 text-teal-400 border-teal-500/20" },
    ],
    Backend: [
        { label: "Node.js", color: "bg-green-500/10 text-green-400 border-green-500/20" },
        { label: "NestJS", color: "bg-red-500/10 text-red-400 border-red-500/20" },
    ],
    Databases: [
        { label: "PostgreSQL", color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
        { label: "MySQL", color: "bg-sky-600/10 text-sky-400 border-sky-600/20" },
        { label: "Redis", color: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
    ],
    Cloud: [
        { label: "AWS", color: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
        { label: "GCP", color: "bg-blue-600/10 text-blue-400 border-blue-600/20" },
    ],
    DevOps: [
        { label: "Docker", color: "bg-blue-400/10 text-blue-300 border-blue-400/20" },
    ],
};


const experiences = [
    {
        role: "Lead Frontend Developer",
        company: "RSUD Syarifah Ambami Ratu Ebo",
        period: "Jul 2025 — Present",
        current: true,
    },
    {
        role: "Frontend Developer",
        company: "Good News From Indonesia (GNFI)",
        period: "May 2024 — Oct 2024",
        current: false,
    },
    {
        role: "Performance Engineering Intern",
        company: "PT Bank Mandiri",
        period: "Feb 2024 — Jul 2024",
        current: false,
    },
    {
        role: "Full-Stack Website Developer",
        company: "Olympiad of Biology ITS 2023",
        period: "Jul 2023 — Oct 2023",
        current: false,
    },
];

export function About() {
    return (
        <React.Fragment>
            <h2 className="text-3xl font-bold tracking-wide text-zinc-100 sm:text-4xl mb-6">
                About me
            </h2>

            <Avatar
                src="/image/IMG_2566.jpg"
                alt="profile"
                size="xl"
                state="seen"
                className="float-left mr-5 mb-2"
            />
            <p className="font-sans text-zinc-300 leading-relaxed">
                Hey, I&apos;m Naufal, Computer Engineering graduate from ITS Surabaya
                with years of experience building and leading production web systems
                in healthcare and media. I specialize in full-stack development and
                have a growing interest in AI/ML engineering.
            </p>

            {/* Stack */}
            <div className="clear-both mt-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
                    Stack
                </p>
                <div className="space-y-4">
                    {Object.entries(categorizedStacks).map(([category, items]) => (
                        <div key={category}>
                            <p className="text-xs font-medium text-zinc-400 mb-2">{category}</p>
                            <div className="flex flex-wrap gap-2">
                                {items.map((s) => (
                                    <span
                                        key={s.label}
                                        className={`text-xs px-2.5 py-1 rounded-full border ${s.color}`}
                                    >
                                        {s.label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Experience Timeline */}
            <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
                    Experience
                </p>

                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-1.25 top-2 bottom-2 w-px bg-zinc-800" />

                    <ul className="space-y-6">
                        {experiences.map((exp, i) => (
                            <li key={i} className="relative pl-6">
                                {/* Dot */}
                                <div
                                    className={`absolute left-0 top-1.5 w-2.75 h-2.75 rounded-full border-2 ${exp.current
                                        ? "bg-zinc-100 border-zinc-100"
                                        : "bg-zinc-950 border-zinc-600"
                                        }`}
                                />

                                <div className="flex flex-col gap-0.5">
                                    <span className="text-sm font-medium text-zinc-100 leading-snug">
                                        {exp.role}
                                    </span>
                                    <span className="text-sm text-zinc-400">{exp.company}</span>
                                    <span className="text-xs text-zinc-600 mt-0.5">{exp.period}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </React.Fragment>
    );
}