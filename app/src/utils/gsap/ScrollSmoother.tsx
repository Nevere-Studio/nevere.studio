'use client';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useRef, useState, useEffect } from 'react';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

interface Props {
    children: React.ReactNode,
    effects?: boolean
}

function ScrollSmootherWrapper({ children, effects = false}: Props) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useGSAP(() => {
        if (typeof window === 'undefined') return;
        if (!wrapperRef.current || !contentRef.current) return;

        ScrollSmoother.create({
            wrapper: wrapperRef.current,
            content: contentRef.current,
            smooth: 1.5,
            smoothTouch: 0.1,
            effects: effects
        });
    });

    return (
        <div ref={wrapperRef} id="smooth-wrapper" style={{ position: 'fixed', overflow: 'hidden', width: '100%', height: '100%', inset: 0 }}>
            <div ref={contentRef} id="smooth-content">
                { children }
            </div>
        </div>
    );
}

export default ScrollSmootherWrapper;