import { About } from "@/components/About";
import Projects from "@/components/Project";
import { ShootingStars } from "@/components/shooting-stars";
import { StarsBackground } from "@/components/stars-background";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";


export const metadata: Metadata = {
  title: "Home",
  description:
    "Portfolio of Muhammad Naufal Rafianto — Software Engineer specializing in frontend, full-stack, and AI/ML projects.",
  alternates: {
    canonical: "https://naufalrafianto.xyz",
  },
};


const NAV_LINKS = [
  { label: "Curriculum Vitae", href: "/cv.pdf", external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/naufal-rafianto-4159a8206", external: true },
  { label: "GitHub", href: "https://github.com/naufalrafianto", external: true },
];

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-linear-to-tl from-black via-zinc-900 to-black overflow-x-hidden selection:bg-zinc-800 selection:text-white">
      <section className="relative flex flex-col items-center justify-center w-full h-screen px-4 overflow-hidden">
        <div className="hidden md:block w-screen h-px animate-fade-left bg-linear-to-r from-zinc-500/0 via-zinc-400/40 to-zinc-500/0 mb-8" />
        <h1 className="py-5 px-2 text-5xl sm:text-7xl md:text-9xl text-transparent bg-white bg-clip-text font-display whitespace-nowrap cursor-default animate-title text-edge-outline ">
          Muhammad Naufal Rafianto
        </h1>
        <div className="hidden md:block w-screen h-px animate-fade-right bg-linear-to-r from-zinc-500/0 via-zinc-400/40 to-zinc-500/0 mt-8" />
        <nav className="flex items-center gap-6  animate-fade-in px-7 py-3 rounded-full border border-white/5 bg-zinc-900/60 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]">
          {NAV_LINKS.map((link, i) => (
            <React.Fragment key={link.href}>
              <Link
                href={link.href}
                {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                className="text-xs tracking-widest uppercase text-zinc-400 hover:text-white transition-all duration-300 hover:scale-105"
              >
                {link.label}
              </Link>
              {i < NAV_LINKS.length - 1 && (
                <span className="text-zinc-700 font-light select-none" aria-hidden="true">/</span>
              )}
            </React.Fragment>
          ))}
        </nav>
        <ShootingStars className="pointer-events-none" />
        <StarsBackground />
      </section>
      <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pb-24 animate-fade-in">
        <div className="w-full h-px bg-linear-to-r from-zinc-800 via-transparent to-transparent mb-16" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-stretch">
          <aside className="lg:col-span-1 h-full">
            <div className="lg:sticky lg:top-12 h-full bg-zinc-900/10 border border-zinc-900/50 rounded-2xl p-6 backdrop-blur-xs flex flex-col justify-between">
              <About />
            </div>
          </aside>
          <div className="lg:col-span-3 h-full">
            <Projects />
          </div>
        </div>
      </section>
    </main>
  );
}