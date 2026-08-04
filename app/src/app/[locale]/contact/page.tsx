'use client';

import styles from './page.module.scss';
import Slide from '@/components/Slide/Slide';
import { useTranslations } from 'next-intl';
import LiquidPlasma from '@/components/shaders/LiquidPlasma';
import ContactForm from '@/components/forms/ContactForm';
import SectionTransition from '@/components/transitions/SectionTransition';
import emailBg from '@/../public/dotted-kihim-text/email.svg';
import Image from 'next/image';
import { useRef } from 'react';
import { El } from '@/utils/types'

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { skewIn, fadeUpWords, revealWipe, magneticPull } from '@/utils/gsap/animations';

const s = styles;

function Contact() {
    const t    = useTranslations('contact.content');
    const hero = useRef<El>(null);
    const h1   = useRef<El.H>(null);
    const lead = useRef<El.P>(null);

    const directContactSlide = useRef<El>(null);
    const directContactH2    = useRef<El.H>(null)
    const email              = useRef<El.P>(null);

    useGSAP(() => {
        const splitLead = fadeUpWords.prepare(lead);
        const tl = gsap.timeline();
        tl.add(skewIn(h1, { delay: 0.5 }));
        tl.add(fadeUpWords.animate(splitLead, { stagger: 0.05 }), '<0.2');
    }, { scope: hero });

    useGSAP(() => {
        const splitEmail = magneticPull.prepare(email);
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: directContactSlide.current,
                start: 'top 95%'
            }
        });
        tl.add(revealWipe(directContactH2));
        tl.add(magneticPull.animate(splitEmail), '<0.5');
    }, { scope: directContactSlide });

    return (
        <>
            <Slide className={s.Hero} ref={hero}>
                <LiquidPlasma />
                <div className={s.content}>
                    <h1 ref={h1}>{ t('hero') }</h1>
                    <p ref={lead} className={s.lead}>{ t('lead') }</p>
                </div>
            </Slide>

            <div className={s.ContactFormBg} style={{ backgroundColor: '#010E1B'}}>
                <ContactForm />
                <SectionTransition color="#161616" />
            </div>

            <Slide className={s.DirectContact} ref={directContactSlide}>
                <Image
                    src={emailBg}
                    alt='email'
                    className={s.bgImg}
                />
                <h2 ref={directContactH2}>{ t('direct_contact') }</h2>
                <p ref={email} className={s.email}>contact@nevere.studio</p>
            </Slide>
        </>
    );
}

export default Contact;