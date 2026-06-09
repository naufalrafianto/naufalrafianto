"use client";
import { cn } from "@/lib/cn";
import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
} from "react";

interface StarProps {
    x: number;
    y: number;
    radius: number;
    opacity: number;
    twinkleSpeed: number | null;
    twinkleOffset: number;
    vx: number;
    vy: number;
}

interface StarBackgroundProps {
    starDensity?: number;
    allStarsTwinkle?: boolean;
    twinkleProbability?: number;
    minTwinkleSpeed?: number;
    maxTwinkleSpeed?: number;
    className?: string;
    enableMovement?: boolean;
    minSpeed?: number;
    maxSpeed?: number;
}

export const StarsBackground: React.FC<StarBackgroundProps> = ({
    starDensity = 0.00015,
    allStarsTwinkle = true,
    twinkleProbability = 0.7,
    minTwinkleSpeed = 0.5,
    maxTwinkleSpeed = 1,
    className,
    enableMovement = true,
    minSpeed = 0.05,
    maxSpeed = 0.25,
}) => {
    const [stars, setStars] = useState<StarProps[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<StarProps[]>([]);
    const animationFrameIdRef = useRef<number>(0);

    const generateStars = useCallback(
        (width: number, height: number): StarProps[] => {
            const area = width * height;
            const numStars = Math.floor(area * starDensity);
            return Array.from({ length: numStars }, () => {
                const shouldTwinkle =
                    allStarsTwinkle || Math.random() < twinkleProbability;

                const angle = Math.random() * Math.PI * 2;
                const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);

                return {
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 0.6 + 0.4,
                    opacity: Math.random() * 0.5 + 0.5,
                    twinkleSpeed: shouldTwinkle
                        ? minTwinkleSpeed +
                        Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
                        : null,
                    twinkleOffset: Math.random() * Math.PI * 2,
                    vx: enableMovement ? Math.cos(angle) * speed : 0,
                    vy: enableMovement ? Math.sin(angle) * speed : 0,
                };
            });
        },
        [
            starDensity,
            allStarsTwinkle,
            twinkleProbability,
            minTwinkleSpeed,
            maxTwinkleSpeed,
            enableMovement,
            minSpeed,
            maxSpeed,
        ]
    );

    useEffect(() => {
        const updateStars = () => {
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");
                if (!ctx) return;

                const { width, height } = canvas.getBoundingClientRect();
                canvas.width = width;
                canvas.height = height;

                const newStars = generateStars(width, height);
                setStars(newStars);
                starsRef.current = newStars;
            }
        };

        updateStars();

        const canvas = canvasRef.current;
        const resizeObserver = new ResizeObserver(updateStars);
        if (canvas) {
            resizeObserver.observe(canvas);
        }

        return () => {
            if (canvas) {
                resizeObserver.unobserve(canvas);
            }
        };
    }, [generateStars]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        starsRef.current = stars;

        const render = (timestamp: number) => {
            const width = canvas.width;
            const height = canvas.height;

            ctx.clearRect(0, 0, width, height);

            const currentStars = starsRef.current;

            currentStars.forEach((star) => {
                if (star.twinkleSpeed !== null) {
                    star.opacity =
                        0.3 +
                        Math.abs(
                            Math.sin(
                                (timestamp * 0.001) / star.twinkleSpeed + star.twinkleOffset
                            )
                        ) * 0.7;
                }

                if (enableMovement) {
                    star.x += star.vx;
                    star.y += star.vy;

                    const buffer = star.radius + 1;
                    if (star.x < -buffer) star.x = width + buffer;
                    else if (star.x > width + buffer) star.x = -buffer;
                    if (star.y < -buffer) star.y = height + buffer;
                    else if (star.y > height + buffer) star.y = -buffer;
                }

                const verticalFade = 1 - (star.y / height) * (star.y / height);
                const finalOpacity = star.opacity * verticalFade;

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`;
                ctx.fill();

                if (star.radius > 0.8) {
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.radius * 2.5, 0, Math.PI * 2);
                    const gradient = ctx.createRadialGradient(
                        star.x, star.y, 0,
                        star.x, star.y, star.radius * 2.5
                    );
                    gradient.addColorStop(0, `rgba(255, 255, 255, ${finalOpacity * 0.3})`);
                    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
                    ctx.fillStyle = gradient;
                    ctx.fill();
                }
            });

            animationFrameIdRef.current = requestAnimationFrame(render);
        };

        animationFrameIdRef.current = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameIdRef.current);
        };
    }, [stars, enableMovement]);

    return (
        <canvas
            ref={canvasRef}
            className={cn("h-full w-full absolute inset-0 pointer-events-none", className)}
        />
    );
};