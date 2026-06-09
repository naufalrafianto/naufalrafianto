"use client";
import Image from "next/image";
import { cn } from "@/lib/cn";

type State = "unread" | "seen" | "live";

interface AvatarProps {
    src: string;
    alt: string;
    username?: string;
    state?: State;
    size?: "sm" | "md" | "lg" | "xl";
    isOwn?: boolean;
    onClick?: () => void;
    className?: string;
}

const sizeMap = {
    sm: { ring: 44, img: 36 },
    md: { ring: 72, img: 64 },
    lg: { ring: 96, img: 88 },
    xl: { ring: 128, img: 120 },
};

const ringStyle: Record<State, string> = {
    unread:
        "bg-[conic-gradient(#f09433,#e6683c,#dc2743,#cc2366,#bc1888,#833ab4,#fd1d1d,#fcb045,#f09433)]",
    seen: "bg-zinc-400",
    live: "[background:conic-gradient(#0095f6,#00b4d8,#0095f6)] animate-spin [animation-duration:3s]",
};

export function Avatar({
    src,
    alt,
    username,
    state = "unread",
    size = "md",
    isOwn = false,
    onClick,
    className,
}: AvatarProps) {
    const { ring, img } = sizeMap[size];

    return (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col items-center gap-2 cursor-pointer bg-transparent border-none p-0",
                className
            )}
        >
            <div className="relative inline-flex">
                <div
                    className={cn("rounded-full p-0.75 flex items-center justify-center aspect-square", ringStyle[state])}
                    style={{ width: ring, height: ring }}
                >
                    <div className="rounded-full p-0.5 bg-white dark:bg-zinc-950 w-full h-full flex items-center justify-center aspect-square overflow-hidden">
                        <Image
                            src={src}
                            alt={alt}
                            width={img}
                            height={img}
                            className="rounded-full object-cover w-full h-full"
                        />
                    </div>
                </div>

                {isOwn && (
                    <div className="absolute bottom-0 right-0 w-5.5 h-5.5 rounded-full bg-blue-500 border-[2.5px] border-white dark:border-zinc-950 flex items-center justify-center text-white text-sm leading-none font-light aspect-square">
                        +
                    </div>
                )}

                {state === "live" && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-[9px] font-medium px-1.5 py-px rounded border-[1.5px] border-white dark:border-zinc-950 tracking-wide z-10">
                        LIVE
                    </div>
                )}
            </div>

            {username && (
                <span
                    className={cn(
                        "text-xs max-w-16 truncate",
                        isOwn
                            ? "text-zinc-100 font-medium"
                            : "text-zinc-400"
                    )}
                >
                    {username}
                </span>
            )}
        </button>
    );
}