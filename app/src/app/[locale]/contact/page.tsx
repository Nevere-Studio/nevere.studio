import styles from './page.module.scss';
import Slide from '@/components/Slide/Slide';
import { useTranslations } from 'next-intl';
import LiquidPlasma from '@/components/shaders/LiquidPlasma';
import ContactForm from '@/components/forms/ContactForm';
import emailBg from '@/../public/dotted-kihim-text/email.svg';
import Image from 'next/image';

const s = styles;

function Contact() {
    const t = useTranslations('contact.content');

    return (
        <>
            <Slide className={s.Hero}>
                <LiquidPlasma />
                <div className={s.content}>
                    <h1>Let's Build Something Out of This World</h1>
                    <p className={s.lead}>Fill out the form below or send a direct email. We respond to qualified inqueries within 24 hours.</p>
                </div>
            </Slide>

            <ContactForm />

            <Slide className={s.DirectContact}>
                <Image
                    src={emailBg}
                    alt='email'
                    className={s.bgImg}
                />
                <h2>Direct contact</h2>
                <p className={s.email}>contact@oryonstudio.dev</p>
            </Slide>
        </>
    );
}

export default Contact;