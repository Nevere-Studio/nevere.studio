'use client';

import styles from "./Footer.module.scss";
import { LinkTemplate } from '@/utils/types';
import CypherLink from '@/components/links/cypher';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useIsVisible } from "@/utils/functions";
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { El } from '@/utils/types';
import { charsSlideIn, magneticPull, drawDivider, revealWipe, fadeUpWords } from '@/utils/gsap/animations';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const s = styles;

function Footer() {
    const [footer, isFooterVisible] = useIsVisible(0.75);

    const slogan       = useRef<El.P>  (null);
    const availability = useRef<El.P>  (null);
    const divider      = useRef<El.Div>(null);
    const author       = useRef<El.P>  (null);
    const copyright    = useRef<El.P>  (null);

    const t = useTranslations('global');

    const links: LinkTemplate[] = [
        { href: '/',           label: t('links.home')       },
        { href: '/about',      label: t('links.about')      },
        { href: '/experience', label: t('links.experience') },
        { href: '/services',   label: t('links.services')   },
        { href: '/contact',    label: t('links.contact')    }
    ];

    const linksRef = useRef<(El.A | null)[]>([]);

    useGSAP(() => {
        if (typeof window == 'undefined') return;
        if (
            !footer.current       || 
            !slogan.current       || 
            !availability.current || 
            !divider.current      || 
            !author.current       || 
            !copyright.current
        ) return;

        const splitSlogan = magneticPull.prepare(slogan);
        const splitAvailability = charsSlideIn.prepare(availability);
        const splitAuthor = fadeUpWords.prepare(author);
        const splitCopyright = fadeUpWords.prepare(copyright);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: footer.current,
                start: '90% bottom'
            },
            delay: 0.1
        });

        tl.add(magneticPull.animate(splitSlogan));
        tl.add(charsSlideIn.animate(splitAvailability), "<0.1");
        tl.add(drawDivider(divider), '<0.5');
        tl.add(revealWipe(linksRef, { stagger: 0.2 }), '<0.1');
        tl.add(fadeUpWords.animate(splitAuthor), '<0.1');
        tl.add(fadeUpWords.animate(splitCopyright), '<0.2');
    }, { scope: footer });

    return (
        <footer className={s.Footer} ref={footer}>
            <section className={s.MainSection}>
                <div className={s.info}>
                    <Link href="/" className={s.logo} />
                    <p className={s.slogan} ref={slogan} dangerouslySetInnerHTML={{ __html: t('slogan') }}></p>
                    <p className={s.availability}><span className={s.indicator}></span><span className={s.text} ref={availability} dangerouslySetInnerHTML={{ __html: t('availability') }}></span></p>
                </div>

                <div className={s.divider} ref={divider} />

                <nav>
                    { links.map((link, index) => (
                        <CypherLink 
                            className={s.link}
                            label={link.label}
                            href={link.href}
                            key={index}
                            ref={el => { linksRef.current[index] = el }}
                        />
                    )) }
                </nav>
            </section>

            <div className={s.bottom}>
                <p className={s.author} ref={author}>{ t('footer.author.designed_and_engineered_by') } <a target='_blank'>{ t('footer.author.jakub_barczynski') }</a>. { t('footer.author.powered_by_nextjs') }</p>
                <p className={s.copyright} ref={copyright}>{ t('footer.copyright') }</p>
            </div>
        </footer>
    );
}

export default Footer;