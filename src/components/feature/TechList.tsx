"use client";

import React, { useLayoutEffect, useRef } from "react";
import { MdCircle } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techStack = [
    {
        name: "React",
        color: "#61DAFB"
    },
    {
        name: "Next.js",
        color: "#f8f8f8"
    },
    {
        name: "Node.js",
        color: "#339933"
    },
    {
        name: "Nest.js",
        color: "#EE1744"
    },
    {
        name: "Golang",
        color: "#00ADD8"
    }
];

const TechList = (): JSX.Element => {
    const component = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Initial fade in
            gsap.fromTo(
                ".tech-row",
                {
                    opacity: 0,
                    y: 20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power2.out"
                }
            );

            // Horizontal scroll animation
            techStack.forEach((_, index) => {
                gsap.to(`.tech-row-${index}`, {
                    x: index % 2 === 0 ? -100 : 100,
                    scrollTrigger: {
                        trigger: component.current,
                        start: "top center",
                        end: "bottom center",
                        scrub: 1,
                        toggleActions: "play none none reverse"
                    }
                });
            });

            // Gentle floating animation
            gsap.to(".tech-item", {
                y: 10,
                duration: 2,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1,
                stagger: {
                    each: 0.2,
                    from: "random"
                }
            });
        }, component);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={component}
            className="relative h-screen flex items-center justify-center"

        >
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                    {techStack.map(({ name, color }, index) => (
                        <div
                            key={index}
                            className={`tech-row tech-row-${index} mb-8 flex items-center justify-center gap-4`}
                            aria-label={name}
                        >
                            {Array.from({ length: 10 }, (_, i) => (
                                <React.Fragment key={i}>
                                    <span
                                        className={`tech-item text-5xl font-bold uppercase tracking-tight transition-colors duration-300 md:text-7xl
                                        ${i === 4 ? 'opacity-100' : 'opacity-20'}`}
                                        style={{
                                            color: i === 4 ? color : 'currentColor',
                                            textShadow: i === 4 ? `0 0 20px ${color}40` : 'none'
                                        }}
                                    >
                                        {name}
                                    </span>
                                    <span className="text-2xl text-slate-600 md:text-3xl">
                                        <MdCircle />
                                    </span>
                                </React.Fragment>
                            ))}
                        </div>
                    ))}

                    {/* Gradient Overlays */}
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-1/4 bg-gradient-to-r from-slate-950 to-transparent" />
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-slate-950 to-transparent" />
                </div>
            </div>
        </section>
    );
};

export default TechList;