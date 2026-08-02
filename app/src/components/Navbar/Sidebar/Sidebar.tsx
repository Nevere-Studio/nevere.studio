'use client';

import styles from './Sidebar.module.scss';
import CypherLink from '@/components/links/cypher';
import { useRef, useMemo } from 'react';
import { LinkTemplate } from '@/utils/types';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { El, Ref } from '@/utils/types';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { revealWipe } from '@/utils/gsap/animations';

const s = styles;

interface Props {
    open: boolean;
    setSidebarOpen: (open: boolean) => void;
}

function Sidebar({ open, setSidebarOpen } : Props) {
    const sidebar: Ref<El.Div | null> = useRef<El.Div>(null);
    const pathname = usePathname();
    const tlRef = useRef<gsap.core.Timeline>(null);

    useGSAP(() => {
        if (typeof window === 'undefined') return;

        const tl = gsap.timeline({ paused: true });
        tl.to(sidebar.current, {
            duration: 1,
                top: 0,
                ease: 'back.out(1)'
        });
        tl.add(revealWipe(linksRef, { stagger: 0.1 }), '<');

        tlRef.current = tl;

        return () => {
            tl.kill();
        }
    }, { scope: sidebar });

    useGSAP(() => {
        if (typeof window === 'undefined')  return;
        if (!tlRef.current) return;

        const tl = tlRef.current;

        if (open) {
            tl.timeScale(1);
            tl.play();
        } else {
            tl.timeScale(1.2);
            tl.reverse();
        }
    }, { dependencies: [open], scope: sidebar });

    const t = useTranslations('global.links');

    const links: LinkTemplate[] = useMemo(() => [
        { href: '/',           label: t('home')       },
        // { href: '/about',      label: t('about')      },
        // { href: '/experience', label: t('experience') },
        // { href: '/services',   label: t('services')   },
        { href: '/contact',    label: t('contact')    }
    ], [t]);

    const linksRef = useRef<(El.A | null)[]>([]);

    function createLink(link: LinkTemplate, index: number) {
        const isHome = pathname.length == 3 && link.href == '/';

        return (
            <CypherLink
                key={index}
                onClick={ () => setSidebarOpen(false) }
                className={s.link}
                href={link.href}
                label={link.label}
                active={pathname.substring(3) === link.href || isHome}
                ref={el => { linksRef.current[index] = el }}
            />
        );
    }

    return (
        <div className={s.Sidebar} ref={sidebar}>
            <nav className={s.Links}>
                { links.map(link => createLink(link, links.indexOf(link))) }
            </nav>
        </div>
    );
}

export default Sidebar;