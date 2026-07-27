'use client';

import s from './horizontal-scroll.module.scss';
import { useRef } from 'react';
import type { El, Children, Ref } from '@/utils/types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// S E C T I O N
interface SectionProps extends Children {
    className?: string;
    id?:        string;
};

export function HorizontalSection({ children, className, id }: SectionProps) {
    const sectionRef = useRef<El>(null);
    const wrapperRef = useRef<El.Div>(null);

    useGSAP(() => {
        const wrapper = wrapperRef.current;
        const section = sectionRef.current;

        if (typeof window === 'undefined') return;
        if (!section || !wrapper) return;

        function getScrollAmount() {
            return -(wrapperRef.current!.scrollWidth - window.innerWidth);
        }

        const tween = gsap.to(wrapperRef.current, {
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

        return () => tween.kill();
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
interface PanelProps extends Children {
    className?: string;
    ref?:       Ref;
    id?:        string;
};

export function HorizontalPanel({ children, className, ref, id } : PanelProps) {
    return (
        <section className={`${className} ${s.panel}`} ref={ref} id={id}>
            {children}
        </section>
    );
}