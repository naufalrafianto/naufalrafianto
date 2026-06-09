"use client";

import React, { PropsWithChildren } from "react";
import { GlowingEffect } from "./glowing-effect";

export const Card: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="overflow-hidden relative duration-700 border rounded-xl hover:bg-zinc-900/30 group md:gap-8 border-zinc-800 h-full p-px">
            <GlowingEffect
                blur={0}
                borderWidth={1.5}
                spread={60}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
            />

            <div className="relative h-full w-full rounded-[inherit] overflow-hidden bg-zinc-950/90 z-10">
                <div className="relative z-20 h-full w-full">
                    {children}
                </div>
            </div>
        </div>
    );
};