'use client';

import s from './horizontal-scroll.module.scss';
import { useRef } from 'react';
import type { El, Core } from '@/utils/types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface Props extends Core {
    setHorizontalTween?: (tween: gsap.core.Tween) => void;
}

// S E C T I O N
export function HorizontalSection({ children, className = '', id, ref, setHorizontalTween }: Props) {
    const sectionRef = useRef<El>(null);
    const wrapperRef = useRef<El.Div>(null);
    const tweenRef = useRef<gsap.core.Tween>(null);

    useGSAP(() => {
        const wrapper = wrapperRef.current;
        const section = sectionRef.current;

        if (typeof window === 'undefined') return;
        if (!section || !wrapper) return;

        function getScrollAmount() {
            return -(wrapperRef.current!.scrollWidth - window.innerWidth);
        }

        tweenRef.current = gsap.to(wrapperRef.current, {
            x: getScrollAmount,
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                pin: true,
                scrub: 1,
                end: () => `+=${wrapper.scrollWidth - window.innerWidth}`,
                invalidateOnRefresh: true
            }
        });

        if (setHorizontalTween) setHorizontalTween(tweenRef.current);

        return () => tweenRef.current?.kill();
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className={`${s.section} ${className || ''}`} id={id}>
            <div ref={wrapperRef} className={s.wrapper}>
                { children }
            </div>
        </section>
    );
}

// P A N E L
export function HorizontalPanel({ children, className, ref, id } : Core) {
    return (
        <section className={`${className} ${s.panel}`} ref={ref} id={id}>
            {children}
        </section>
    );
}