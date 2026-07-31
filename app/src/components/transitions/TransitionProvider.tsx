'use client';

import { Children, El } from '@/utils/types';
import { useRef, useState } from 'react';
import styles from './TransitionProvider.module.scss';
import { gsap } from 'gsap';
import Orion from '@/components/Orion';

import dynamic from 'next/dynamic';
const TransitionRouter = dynamic(
    () => import('next-transition-router')
    .then(mod => mod.TransitionRouter),
    { ssr: false }
);

const s = styles;

const ROWS = 4;
const EASES = ['power1.out', 'power2.out', 'power3.out', 'power4.out'];

function TransitionProvider({ children }: Children) {
    const gridRef    = useRef <El.Div> (null);
    const headingRef = useRef <El.H>   (null);
    const blocksRef  = useRef <(El.Div | null)[]> ([]);
    const wordsRef   = useRef <(El     | null)[]> ([]);
    
    const [orionActive, setOrionActive] = useState<boolean>(false);

    const animate: {
        in:  (onComplete: () => void) => gsap.core.Timeline;
        out: (onComplete: () => void) => gsap.core.Timeline;
    } = {
        in: (onComplete: () => void) => {
            const blocks = blocksRef.current.filter(Boolean);
            const words  = wordsRef .current.filter(Boolean);

            const tl = gsap.timeline({ onComplete });
            setOrionActive(true);

            tl.set(blocks, {
                transformOrigin: 'left center',
                scaleX: 0
            });

            tl.set(words, {
                y: '100%'
            });

            blocks.forEach(block => {
                tl.to(block, {
                    scaleX: 1,
                    duration: 1,
                    ease: EASES[Math.floor(Math.random() * EASES.length)],
                }, '<0.1');
            });

            tl.to(words, {
                y: 0,
                stagger: 0.1,
                duration: 1,
                ease: 'power4.out'
            }, '<');

            return tl;
        },

        out: (onComplete: () => void) => {
            const blocks = blocksRef.current.filter(Boolean);
            const words  = wordsRef .current.filter(Boolean);

            const tl = gsap.timeline({ onComplete });
            setOrionActive(false);

            tl.set(blocks, {
                transformOrigin: 'right center',
                scaleX: 1
            });

            tl.set(words, {
                y: 0
            });

            tl.to(words, {
                y: '100%',
                duration: 0.5,
                stagger: {
                    each: 0.1,
                    from: 'end'
                },
                ease: 'power1.out'
            });

            blocks.forEach(block => {
                tl.to(block, {
                    scaleX: 0,
                    duration: 1,
                    ease: EASES[Math.floor(Math.random() * EASES.length)],
                }, '<0.1');
            }, '<0.9');
            
            return tl;
        }
    }

    return (
        <TransitionRouter 
            auto
            leave={next => {
                const tl = animate.in(next);
                return () => tl.kill();
            }}
            enter={next => {
                const tl = animate.out(next);
                return () => tl.kill();
            }}
        >
            <div className={s.grid} ref={gridRef}>
                { Array.from({ length: ROWS }).map((_, i) => (
                    <div 
                        key={i}
                        className={s.block}
                        ref={el => { blocksRef.current[i] = el }}
                    />
                )) }

                <div className={s.branding}>
                    <h1 ref={headingRef}><span className={s.nevere} ref={ el => { wordsRef.current[0] = el }}>NEVERE</span><span className={s.studio} ref={el => { wordsRef.current[1] = el }}>STUDIO</span></h1>
                    <div className={s.orion}>
                        <Orion active={orionActive} starColor='#333' pathColor='#333' />
                    </div>
                </div>
            </div>
            { children }
        </TransitionRouter>
    );
}

export default TransitionProvider;