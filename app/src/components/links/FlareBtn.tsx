'use client';

import s from './links.module.scss';
import type { LinkProps } from '@/utils/types';
import Link from 'next/link';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { gsap } from 'gsap';

gsap.registerPlugin(ScrollSmoother);

interface Props extends LinkProps {
    prior?: boolean;
}

function FlareBtn({ children, href, className, ref, style, prior = false }: Props) {
    return (
        <div className={`${className || ''} ${s.flareBtn} ${prior ? s.prior : ''}`}>
            <span className={s.glow} />
            <span className={s.flare} />
            <Link
                href={href}
                ref={ref}
                style={style}
                className={s.link}
            > 
                { children }
            </Link>
        </div>
    );
}

export default FlareBtn;