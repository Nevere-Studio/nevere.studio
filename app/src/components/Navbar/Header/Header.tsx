'use client';

import styles from './Header.module.scss';
import { useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

const s = styles;

interface Props {
    setSidebarOpen: (open: boolean) => void;
    sidebarOpen: boolean;
}

function Header({ setSidebarOpen, sidebarOpen }: Props) {
    const [hamburgerState, setHamburgerState] = useState(false);
    const [headerHidden, setHeaderHidden] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    function toggleHamburger() {
        if (!hasInteracted) {
            setHasInteracted(true);
        }
        if (!headerHidden) {
            setHamburgerState(prev => !prev);
        } else {
            setHamburgerState(false);
        }
    }

    useEffect(() => {
        setHamburgerState(sidebarOpen);
        if (sidebarOpen) {
            setHeaderHidden(false);
        }
    }, [sidebarOpen]);

    useEffect(() => {
        setSidebarOpen(hamburgerState);
    }, [hamburgerState, setSidebarOpen]);

    useEffect(() => {
        let lastScroll = 0;
        let ticked = false;

        function handleScroll() {
            if (!ticked) {
                window.requestAnimationFrame(() => {
                    const currentScroll = window.scrollY;

                    if (currentScroll > lastScroll && currentScroll > 100) {
                        setHeaderHidden(true);
                    } else {
                        setHeaderHidden(false);
                    }

                    lastScroll = currentScroll;
                    ticked = false;
                });

                ticked = true;
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const hamburgerClassName = [
        s.Hamburger,
        'btn',
        hasInteracted ? (hamburgerState ? s.active : s.inactive) : ''
    ].filter(Boolean).join(' ');

    return (
        <header className={s.Header} id="Header" style={{ transform: headerHidden ? 'translateY(-100%)' : 'translateY(0)' }}>
            <Link className={s.logo} href='/' onClick={() => {
                if (hamburgerState) setHasInteracted(true);
                setHamburgerState(false);
            }}>
                <div className={s.full} />
                <div className={s.short} />
                <div className={s.condensed} />
            </Link>

            <button className={hamburgerClassName} onClick={toggleHamburger}>
                <div className={s.TopBar}></div>
                <div className={s.MidBar1}></div>
                <div className={s.MidBar2}></div>
                <div className={s.BottomBar}></div>
            </button>
        </header>
    );
}

export default Header;