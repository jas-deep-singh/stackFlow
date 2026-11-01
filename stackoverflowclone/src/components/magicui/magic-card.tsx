"use client";
import { cn } from "../../../lib/utils";
import {
    type CSSProperties,
    type ElementType,
    type HTMLAttributes,
    type ReactNode,
    createElement,
    useEffect,
    useRef,
    useState,
} from "react";

interface MousePosition {
    x: number;
    y: number;
}

function useMousePosition(): MousePosition {
    const [mousePosition, setMousePosition] = useState<MousePosition>({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        const handleMouseMove = (event: globalThis.MouseEvent) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return mousePosition;
}

interface MagicContainerProps {
    children?: ReactNode;
    className?: string;
}

const MagicContainer = ({ children, className }: MagicContainerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mousePosition = useMousePosition();

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const x = mousePosition.x - rect.left;
        const y = mousePosition.y - rect.top;
        const inside = x > 0 && x < rect.width && y > 0 && y < rect.height;

        Array.from(container.children).forEach(child => {
            if (!(child instanceof HTMLElement)) return;

            const childRect = child.getBoundingClientRect();
            child.style.setProperty("--mouse-x", `${x - childRect.left + rect.left}px`);
            child.style.setProperty("--mouse-y", `${y - childRect.top + rect.top}px`);
            child.style.setProperty("--opacity", inside ? "1" : "0");
        });
    }, [mousePosition]);

    return (
        <div className={cn("h-full w-full", className)} ref={containerRef}>
            {children}
        </div>
    );
};

interface MagicCardProps extends HTMLAttributes<HTMLDivElement> {
    as?: ElementType;
    size?: number;
    spotlight?: boolean;
    spotlightColor?: string;
    borderColor?: string;
    isolated?: boolean;
    background?: string;
}

const MagicCard = ({
    as: Component = "div",
    className,
    children,
    size = 600,
    spotlight = true,
    spotlightColor = "hsl(0 0% 98%)",
    borderColor = spotlightColor,
    isolated = true,
    background,
    style,
    ...props
}: MagicCardProps) => {
    const cardStyle = {
        ...style,
        "--mask-size": `${size}px`,
        "--border-color": borderColor,
    } as CSSProperties;

    return createElement(
        Component,
        {
            ...props,
            style: cardStyle,
            className: cn(
                "relative h-full w-full rounded-2xl p-6",
                isolated ? "isolate" : "z-0",
                spotlight &&
                    "bg-gray-300 dark:bg-gray-700 bg-[radial-gradient(var(--mask-size)_circle_at_var(--mouse-x)_var(--mouse-y),var(--border-color),transparent_100%)]",
                className
            ),
        },
        children,
        createElement("div", {
            className: "absolute inset-[1px] -z-20 rounded-2xl bg-white dark:bg-black/95",
            style: background ? { background } : undefined,
            "aria-hidden": true,
        })
    );
};

export { MagicCard, MagicContainer };