import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

type Variant = "mobile" | "desktop";

interface AnimatedFrameProps {
    radius?: number;
    speed?: number;
    width?: string;
    height?: string;
    variant?: Variant;
    children?: React.ReactNode;
}

const Frame = styled.div<{
    $ax: number; $ay: number; $bx: number; $by: number;
    $width?: string; $height?: string; $variant?: Variant;
}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: ${({ $width }) => $width ?? "100%"};
    height: ${({ $height }) => $height ?? "100%"};
    color: var(--color-text);
    padding: 0px 20px;
    background-image:
        radial-gradient(360px 360px at ${({ $ax }) => $ax}% ${({ $ay }) => $ay}%, var(--color-accent), transparent 100%),
        radial-gradient(360px 360px at ${({ $bx }) => $bx}% ${({ $by }) => $by}%, var(--color-accent), transparent 100%);
    gap: 20px;
    text-align: center;
    font-family: "Delius", cursive;

    h1 {
        font-size: ${({ $variant }) => $variant === "desktop" ? "60px" : "30px"};
        font-weight: normal;
        user-select: none;
    }

    p {
        font-size: 20px;
        user-select: none;
    }
`;

export default function AnimatedFrame({
    radius = 60,
    speed = 0.8,
    width,
    height,
    variant = "desktop",
    children,
}: AnimatedFrameProps) {
    const [angle, setAngle] = useState(0);
    const rafRef = useRef<number | null>(null);
    const deg = Math.PI / 180;

    useEffect(() => {
        const loop = () => {
            setAngle(prev => prev >= 360 ? 0 : prev + speed);
            rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);
        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, [speed]);

    const ax = Number((50 + Math.cos(angle * deg) * radius).toFixed(2));
    const ay = Number((50 + Math.sin(angle * deg) * radius).toFixed(2));
    const bx = Number((50 + Math.cos((angle + 180) * deg) * radius).toFixed(2));
    const by = Number((50 + Math.sin((angle + 180) * deg) * radius).toFixed(2));

    return (
        <Frame $ax={ax} $ay={ay} $bx={bx} $by={by} $width={width} $height={height} $variant={variant}>
            {children}
        </Frame>
    );
}