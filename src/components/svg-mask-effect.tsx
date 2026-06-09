"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";

interface MousePosition {
    x: number | null;
    y: number | null;
}

export const MaskContainer = ({
    children,
    revealText,
    size = 10,
    revealSize = 600,
    className,
}: {
    children?: React.ReactNode;
    revealText?: React.ReactNode;
    size?: number;
    revealSize?: number;
    className?: string;
}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [mousePosition, setMousePosition] = useState<MousePosition>({ x: null, y: null });
    const containerRef = useRef<HTMLDivElement>(null);

    const updateMousePosition = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    useEffect(() => {
        const currentContainer = containerRef.current;
        if (!currentContainer) return;

        currentContainer.addEventListener("mousemove", updateMousePosition);
        return () => {
            currentContainer.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);

    const maskSize = isHovered ? revealSize : size;

    return (
        <motion.div
            ref={containerRef}
            className={cn("relative h-screen", className)}
            animate={{
                backgroundColor: isHovered ? "var(--slate-900)" : "var(--white)",
            }}
            transition={{
                backgroundColor: { duration: 0.3 },
            }}
        >
            <motion.div
                className="absolute flex h-full w-full items-center justify-center bg-black text-6xl mask-[url(/mask.svg)] mask-no-repeat mask-size-[40px] dark:bg-white"
                animate={{
                    maskPosition: mousePosition.x !== null && mousePosition.y !== null
                        ? `${mousePosition.x - maskSize / 2}px ${mousePosition.y - maskSize / 2}px`
                        : "0px 0px",
                    maskSize: `${maskSize}px`,
                }}
                transition={{
                    maskSize: { duration: 0.3, ease: "easeInOut" },
                    maskPosition: { duration: 0.15, ease: "linear" },
                }}
            >
                <div className="absolute inset-0 z-0 h-full w-full bg-black opacity-50 dark:bg-white" />
                <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="relative z-20 mx-auto max-w-4xl text-center text-4xl font-bold"
                >
                    {children}
                </div>
            </motion.div>

            <div className="flex h-full w-full items-center justify-center">
                {revealText}
            </div>
        </motion.div>
    );
};