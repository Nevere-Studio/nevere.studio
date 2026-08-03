'use client';
import { useRef, useState, useMemo } from 'react';
import { gsap, CSSPlugin } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { El } from '@/utils/types';

gsap.registerPlugin(CSSPlugin, ScrollTrigger);

import s from './SectionTransition.module.scss';

interface Props {
    rows?: number;
    columns?: number;
    color?: string;
}


function generateOpacityBoard(rows: number, columns: number): (0 | 1)[][] {
    const board: (0 | 1)[][] = [];

    for (let r = 0; r < rows; r++) {
        const currentRow: (0 | 1)[] = [];
        
        for (let c = 0; c < columns; c++) {
            const probability = (r + 1) / rows;
            
            const cell = Math.random() < probability ? 1 : 0;
            currentRow.push(cell);
        }
        
        board.push(currentRow);
    }

    return board;
}

function SectionTransition({ rows = 5, columns = 20, color }: Props) {
    const sectionTransition = useRef<El.Div>(null);
    const rowsRef  = useRef<(El.Div | null)[]>([]);
    const cellsRef = useRef<(El.Div | null)[]>([]);


    const opacityBoard = useMemo(() => {
        return generateOpacityBoard(rows, columns);
    }, [rows, columns]);

    useGSAP(() => {
        if (!sectionTransition.current) return;

        gsap.to(cellsRef.current, {
            opacity: 1,
            ease: 'none',
            stagger: {
                amount: 0.5,
                from: 'random',
            },
            scrollTrigger: {
                trigger: sectionTransition.current,
                start: 'bottom bottom',
                end: 'top top',
                scrub: true
            },
        });
    }, { scope: sectionTransition });

    return (
        <div className={s.SectionTransition} ref={sectionTransition}>
            { Array.from({ length: rows }).map((_, rowIndex) => {
                    return (
                        <div className={s.row} key={`row-${rowIndex}`} ref={el => { rowsRef.current[rowIndex] = el }}>
                            {
                                Array.from({ length: columns }).map((_, colIndex) => {
                                    return (
                                        <div
                                            key={`${rowIndex}/${colIndex}`}
                                            className={s.cell}
                                            ref={ el => { cellsRef.current[rowIndex * columns + colIndex] = el }}
                                            style={{ backgroundColor: color, opacity: opacityBoard[rowIndex][colIndex] }}
                                        />
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SectionTransition;