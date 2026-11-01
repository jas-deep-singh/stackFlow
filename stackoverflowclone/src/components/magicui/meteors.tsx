"use client";
import clsx from "clsx";
import { useMemo, type CSSProperties } from "react";

interface MeteorsProps {
    number?: number;
}
export const Meteors = ({ number = 20 }: MeteorsProps) => {
    const meteorStyles = useMemo(
        () =>
            Array.from({ length: number }, (_, index) => {
                const random = (seed: number) => {
                    const value = Math.sin((index + 1) * seed * 12.9898) * 43758.5453;
                    return value - Math.floor(value);
                };

                return {
                    top: -5,
                    left: `${Math.floor(random(1) * 100)}%`,
                    animationDelay: `${random(2) + 0.2}s`,
                    animationDuration: `${Math.floor(random(3) * 8 + 2)}s`,
                } satisfies CSSProperties;
            }),
        [number]
    );

    return (
        <>
            {meteorStyles.map((style, idx) => (
                
                <span
                    key={idx}
                    className={clsx(
                        "pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-215 animate-meteor rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"
                    )}
                    style={style}
                >
                    {/* Meteor Tail */}
                    <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-12.5 -translate-y-1/2 bg-linear-to-r from-slate-500 to-transparent" />
                </span>
            ))}
        </>
    );
};

export default Meteors;