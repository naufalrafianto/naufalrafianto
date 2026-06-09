'use client';

import gsap from 'gsap';
import React from 'react';
import { motion, Variants } from "motion/react";

export const Name = () => {
    const names = {
        first: 'Muhammad',
        middle: 'Naufal',
        last: 'Rafianto'
    };

    const component = React.useRef(null);

    const letterVariants: Variants = {
        hover: {
            color: 'rgb(20, 184, 166)',
            scaleX: [1, 1.2, 0.9, 1.05, 1],
            scaleY: [1, 0.8, 1.1, 0.95, 1],
            transition: {
                duration: 0.8,
                ease: ["easeInOut", "easeInOut", "easeInOut", "easeInOut"],
                times: [0, 0.3, 0.6, 0.8, 1],
            },
        },
        tap: {
            color: 'rgb(20, 184, 166)',
            scaleX: [1, 1.2, 0.9, 1.05, 1],
            scaleY: [1, 0.8, 1.1, 0.95, 1],
            transition: {
                duration: 0.8,
                ease: ["easeInOut", "easeInOut", "easeInOut", "easeInOut"],
                times: [0, 0.3, 0.6, 0.8, 1],
            },
        }
    };

    const renderLetters = (name: string, key: string) => {
        if (!name) return null;
        return name.split('').map((letter, index) => (
            <motion.span
                key={`${key}-${index}`}
                className="name-animation inline-block cursor-pointer touch-none hover:text-teal-400 transition-colors duration-300"
                variants={letterVariants}
                whileHover="hover"
                whileTap="tap"
                style={{
                    WebkitTapHighlightColor: 'transparent',
                }}
            >
                {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
        ));
    };

    React.useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.timeline().fromTo(
                '.name-animation',
                {
                    y: 50,
                    opacity: 0,
                    rotateX: -90,
                },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    delay: 0.2,
                    ease: 'back.out(1.7)',
                    duration: 1.2,
                    transformOrigin: 'center center',
                    stagger: {
                        each: 0.05,
                        from: 'start',
                    },
                }
            );
        }, component);
        return () => ctx.revert();
    }, []);

    return (
        <div className="relative w-full px-4" ref={component}>
            <div className="relative mx-auto max-w-4xl">
                <h1
                    className="group relative z-20 text-center font-bold leading-none"
                    aria-label={`${names.first} ${names.middle} ${names.last}`}
                >
                    <div className="absolute -left-4 top-1/2 h-24 w-24 rounded-full bg-teal-500/10 blur-xl transition-all duration-500 group-hover:bg-teal-500/20 md:block hidden" />
                    <div className="absolute -right-4 top-1/2 h-24 w-24 rounded-full bg-purple-500/10 blur-xl transition-all duration-500 group-hover:bg-purple-500/20 md:block hidden" />

                    <div className="flex flex-col items-center md:hidden space-y-1">
                        <div className="relative">
                            <span className="text-3xl text-slate-100 font-extrabold">
                                {renderLetters(names.first, 'first')}
                            </span>
                        </div>
                        <div className="relative">
                            <span className="text-3xl text-teal-300 font-semibold">
                                {renderLetters(names.middle, 'middle')}
                            </span>
                        </div>
                        <div className="relative">
                            <span className="text-3xl text-slate-200 font-bold">
                                {renderLetters(names.last, 'last')}
                            </span>
                        </div>
                    </div>

                    <div className="relative z-30 hidden md:inline-block">
                        <span className="text-[clamp(2rem,6vw,4rem)] text-slate-100 font-extrabold whitespace-nowrap">
                            {renderLetters(`${names.first} ${names.middle} ${names.last}`, 'full')}
                        </span>
                        <div className="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-transparent via-teal-400/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                </h1>
            </div>
        </div>
    );
};