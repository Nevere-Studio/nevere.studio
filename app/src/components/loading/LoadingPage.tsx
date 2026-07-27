'use client';

import { Children } from '@/utils/types';
import styles from './LoadingPage.module.scss';
import { useState, useEffect } from 'react';

const s = styles;
const ROWS = 4;

function LoadingPage({ children }: Children) {
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        const handleLoad = () => {
            setLoaded(true);
        }

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => window.removeEventListener('load', handleLoad);
    }, []);

    return (
        <>
            <div className={`${s.grid} ${loaded ? s.loaded : ''}`}>
                { Array.from({ length: ROWS }).map((_, i) => (
                    <div key={i} className={s.block} />
                )) }

                <div className={s.branding}>
                    <h1>
                        <span className={s.oryon} >ORYON</span>
                        <span className={s.studio}>STUDIO</span>
                    </h1>
                </div>
            </div>
            { children }
        </>
    );
}

export default LoadingPage;