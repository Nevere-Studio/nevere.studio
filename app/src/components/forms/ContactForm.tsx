'use client';

import s from './ContactForm.module.scss';
import { useState, useEffect, useRef } from 'react';
import type { El } from '@/utils/types';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';

// I M A G E S
import Image from 'next/image';
import q1BgText from '@/../public/dotted-kihim-text/pages.svg';
import q2BgText from '@/../public/dotted-kihim-text/type.svg';
import q3BgText from '@/../public/dotted-kihim-text/creativity.svg';
import q4BgText from '@/../public/dotted-kihim-text/you.svg';
import q5BgText from '@/../public/dotted-kihim-text/additional-info.svg';
import summaryBgText from '@/../public/dotted-kihim-text/summary.svg';

// C O M P O N E N T S
import { HorizontalSection, HorizontalPanel } from '../horizontal-scroll/horizontal-scroll';
import Slide from '@/components/Slide/Slide';
import { TextField, TextArea } from '@/components/forms/text-fields';
import Options from '@/components/forms/Options';
import Slider from '@/components/forms/Slider';
import { SubmitBtn, Label } from './submit-button';

// G S A P
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);
import { revealLeft, revealRight, revealUp, revealDown } from '@/utils/gsap/animations';


function ContactForm() {
    const t = useTranslations('contact.content.form');
    const notSpecified = t('not_specified');

    const PAGES_OPTIONS = ['1', '2-5', '6-10', '>10', t('question1.answers.i_dont_know')];
    const TYPES_OPTIONS = [t('question2.answers.informational'), t('question2.answers.web_app'), t('question2.answers.ecommerce')];

    const pathname = usePathname();

    // F O R M   F U N C T I O N A L I T Y
    const [formData, setFormData] = useState({
        pages:          notSpecified,
        type:           notSpecified,
        creativity:     '50',
        name:           notSpecified,
        company:        notSpecified,
        industry:       notSpecified,
        contact:        notSpecified,
        additionalInfo: '-',
        lang:           pathname.substring(1, 3)
    });
    
    function convertLang(lang: string) {
        switch (lang) {
            case 'en':
                return 'English';
            case 'pl':
                return 'Polish';
            default:
                return 'English';
        }
    }

    const [convertedData, setConvertedData] = useState({
        'Pages Count':            formData.pages,
        'Website Type':           formData.type,
        'Creativity':             formData.creativity,
        'Name':                   formData.name,
        'Company Name':           formData.company,
        'Industry':               formData.industry,
        'Contact Method':         formData.contact,
        'Additional Information': formData.additionalInfo,
        'Language':               convertLang(formData.lang)
    });
    const [isSubmitting,  setIsSubmitting ] = useState<boolean>(false);
    const [result,        setResult       ] = useState<string>('');

    function sanitizeText(value: string) {
        return value === '' ? notSpecified : value;
    }

    function convertValue(value: string, endValues: string[]) {
        value = sanitizeText(value);
        return value.startsWith('_') ?
        value.substring(1)
        : [notSpecified, ...endValues][Number(value)] || notSpecified;
    }

    const dataValid = Object.entries(formData).every(([key, value]: string[]) => {
        if (key === 'additionalInfo') return true;
        if (value === '') return false;
        else return value !== notSpecified;
    });

    useEffect(() => {
        setConvertedData({
            'Pages Count':            convertValue(formData.pages, PAGES_OPTIONS),
            'Website Type':           convertValue(formData.type,  TYPES_OPTIONS),
            'Creativity':             `${formData.creativity}%`,
            'Name':                   sanitizeText(formData.name    ),
            'Company Name':           sanitizeText(formData.company ),
            'Industry':               sanitizeText(formData.industry),
            'Contact Method':         sanitizeText(formData.contact ),
            'Additional Information': formData.additionalInfo,
            'Language':               convertLang(pathname.substring(1, 3))
        });
    }, [formData]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function handleProgrammaticChange(name: string, value: string) {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setResult('Sending...');

        const payload = {
            access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
            ...convertedData,
            subject: 'New Submission from Contact Form on nevere.studio'
        };

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.success) {
                setResult(t('success'));
            } else {
                setResult(data.message || t('something_went_wrong'));
            }
        } catch (error) {
            console.log(error);
            setResult(t('error'));
        } finally {
            setIsSubmitting(false);
        }
    }

    // A N I M A T I O N S
    const [horizontalTween, setHorizontalTween] = useState<gsap.core.Tween | null>(null);

    const horizontalSection = useRef<El>(null);
    const form = useRef<HTMLFormElement>(null);

    const panel0 = useRef<El>(null);
    const panel1 = useRef<El>(null);
    const panel2 = useRef<El>(null);
    const panel3 = useRef<El>(null);
    const panel4 = useRef<El>(null);
    const panel5 = useRef<El>(null);

    const modal0 = useRef<El.Div>(null);
    const modal1 = useRef<El.Div>(null);
    const modal2 = useRef<El.Div>(null);
    const modal3 = useRef<El.Div>(null);
    const modal4 = useRef<El.Div>(null);
    const modal5 = useRef<El.Div>(null);

    const blueRects0 = useRef<El.Div[]>([]);
    const blueRects1 = useRef<El.Div[]>([]);
    const blueRects2 = useRef<El.Div[]>([]);
    const blueRects3 = useRef<El.Div[]>([]);
    const blueRects4 = useRef<El.Div[]>([]);
    const blueRects5 = useRef<El.Div[]>([]);

    const horizontalPanels = [
        { panel: panel0, modal: modal0, blueRects: blueRects0 },
        { panel: panel1, modal: modal1, blueRects: blueRects1 },
        { panel: panel2, modal: modal2, blueRects: blueRects2 },
        { panel: panel3, modal: modal3, blueRects: blueRects3 },
        { panel: panel4, modal: modal4, blueRects: blueRects4 },
    ];

    const summary = {
        panel: panel5,
        modal: modal5,
        blueRects: blueRects5
    };

    useGSAP(() => {
        if (typeof window === 'undefined') return;
        if (!horizontalTween) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: horizontalPanels[0].panel.current,
                containerAnimation: horizontalTween,
                start: '70% 90%',
                invalidateOnRefresh: true
            }
        });

        console.log(tl.scrollTrigger);

        tl.add(revealLeft(horizontalPanels[0].blueRects));
        tl.add(revealDown(horizontalPanels[0].modal), '<0.2');
    }, { scope: form, dependencies: [horizontalTween] });

    useGSAP(() => {
        if (typeof window === 'undefined') return;
        if (!horizontalTween) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: horizontalPanels[1].panel.current,
                containerAnimation: horizontalTween,
                start: '70% 90%',
                invalidateOnRefresh: true
            }
        });

        tl.add(revealLeft(horizontalPanels[1].blueRects.current[0]));
        tl.add(revealRight(horizontalPanels[1].blueRects.current[1]), '<0.2');
        tl.add(revealLeft(horizontalPanels[1].modal), '<0.2');
    }, { scope: form, dependencies: [horizontalTween], revertOnUpdate: true });

    useGSAP(() => {
        if (typeof window === 'undefined') return;
        if (!horizontalTween) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: horizontalPanels[2].panel.current,
                containerAnimation: horizontalTween,
                start: '70% 90%',
                invalidateOnRefresh: true
            }
        });

        tl.add(revealDown(horizontalPanels[2].blueRects.current[0]));
        tl.add(revealUp(horizontalPanels[2].blueRects.current[1]), '<0.2');
        tl.add(revealUp(horizontalPanels[2].modal), '<0.2');
    }, { scope: form, dependencies: [horizontalTween], revertOnUpdate: true });

    useGSAP(() => {
        if (typeof window === 'undefined') return;
        if (!horizontalTween) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: horizontalPanels[3].panel.current,
                containerAnimation: horizontalTween,
                start: '70% 90%',
                invalidateOnRefresh: true
            }
        });

        tl.add(revealDown(horizontalPanels[3].blueRects.current[0]));
        tl.add(revealLeft(horizontalPanels[3].blueRects.current[1]), '<0.2');
        tl.add(revealRight(horizontalPanels[3].modal), '<0.2');
    }, { scope: form, dependencies: [horizontalTween], revertOnUpdate: true });

    useGSAP(() => {
        if (typeof window === 'undefined') return;
        if (!summary.panel.current || !form.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: summary.panel.current,
                start: 'top top',
                invalidateOnRefresh: true
            }
        });

        tl.add(revealDown(summary.blueRects.current[0]));
        tl.add(revealRight(summary.modal), '<0.2');
    }, { scope: summary.panel });

    useGSAP(() => {
        if (typeof window === 'undefined') return;
        if (!horizontalTween) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: horizontalPanels[4].panel.current,
                containerAnimation: horizontalTween,
                start: '70% 90%',
                invalidateOnRefresh: true
            }
        });

        tl.add(revealDown(horizontalPanels[4].blueRects.current[0]));
        tl.add(revealLeft(horizontalPanels[4].blueRects.current[1]), '<0.2');
        tl.add(revealRight(horizontalPanels[4].modal), '<0.2');
    }, { scope: form, dependencies: [horizontalTween], revertOnUpdate: true });

    return (
        <form className={s.ContactForm} onSubmit={handleSubmit} ref={form}>
            <HorizontalSection className={s.HorizontalSection} id="form" ref={horizontalSection} setHorizontalTween={setHorizontalTween}>
                <HorizontalPanel ref={horizontalPanels[0].panel}>
                    <div className={`${s.question} ${s.q1}`}>
                        <Image
                            className={s.bgText}
                            src={q1BgText}
                            alt="pages"
                        />
                        
                        <div className={s.blueRect} ref={(el: HTMLDivElement) => { horizontalPanels[0].blueRects.current[0] = el }} />

                        <div className={s.modal} ref={horizontalPanels[0].modal}>
                            <h2>{ t('question1.question') }</h2>
                            <p>{ t('question1.tip') }</p>
                            
                            <div className={s.form}>
                                <Options options={PAGES_OPTIONS} handleProgrammaticChange={handleProgrammaticChange} name="pages" custom={true} />
                            </div>
                        </div>
                    </div>
                </HorizontalPanel>

                <HorizontalPanel ref={horizontalPanels[1].panel}>
                    <div className={`${s.question} ${s.q2}`}>
                        <Image
                            className={s.bgText}
                            src={q2BgText}
                            alt="type"
                        />

                        <div className={`${s.blueRect} ${s.br1}`} ref={(el: HTMLDivElement) => { horizontalPanels[1].blueRects.current[0] = el }} />
                        <div className={`${s.blueRect} ${s.br2}`} ref={(el: HTMLDivElement) => { horizontalPanels[1].blueRects.current[1] = el }} />

                        <div className={s.modal} ref={horizontalPanels[1].modal}>
                            <h2>{ t('question2.question') }</h2>

                            <div className={s.form}>
                                <Options options={TYPES_OPTIONS} handleProgrammaticChange={handleProgrammaticChange} name="type" custom={true} />
                            </div>
                        </div>
                    </div>
                </HorizontalPanel>

                <HorizontalPanel ref={horizontalPanels[2].panel}>
                    <div className={`${s.question} ${s.q3}`}>
                        <Image
                            className={s.bgText}
                            src={q3BgText}
                            alt="creativity"
                        />

                        <div className={`${s.blueRect} ${s.br1}`} ref={(el: HTMLDivElement) => { horizontalPanels[2].blueRects.current[0] = el }} />
                        <div className={`${s.blueRect} ${s.br2}`} ref={(el: HTMLDivElement) => { horizontalPanels[2].blueRects.current[1] = el }} />

                        <div className={s.modal} ref={horizontalPanels[2].modal}>
                            <h2>{ t('question3.question') }</h2>
                            <div className={s.sliderModule}>
                                <div className={s.sliderWrapper}>
                                    <div className={s.leftEnd} />
                                    <div className={s.center} />
                                    <div className={s.rightEnd} />
                                    <div className={s.leftLimit} />
                                    <div className={s.rightLimit} />
                                    <div className={s.track} />
                                    <Slider className={s.slider} min={30} max={100} step={1} handleChange={handleChange} name="creativity" />
                                </div>

                                <div className={s.descriptions}>
                                    <p className={s.start}>{ t('question3.answers.0%') }</p>
                                    <p className={s.center}>{ t('question3.answers.50%') }</p>
                                    <p className={s.end}>{ t('question3.answers.100%') }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </HorizontalPanel>

                <HorizontalPanel ref={horizontalPanels[3].panel}>
                    <div className={`${s.question} ${s.q4}`}>
                        <Image
                            className={s.bgText}
                            src={q4BgText}
                            alt="you"
                        />

                        <div className={`${s.blueRect} ${s.br1}`} ref={(el: HTMLDivElement) => { horizontalPanels[3].blueRects.current[0] = el }} />
                        <div className={`${s.blueRect} ${s.br2}`} ref={(el: HTMLDivElement) => { horizontalPanels[3].blueRects.current[1] = el }} />

                        <div className={s.modal} ref={horizontalPanels[3].modal}>
                            <h2>{ t('question4.question') }</h2>
                            <div className={s.form}>
                                <TextField placeholder={t('question4.answers.full_name')} name="name"     handleChange={handleChange} />
                                <TextField placeholder={t('question4.answers.company')}   name="company"  handleChange={handleChange} />
                                <TextField placeholder={t('question4.answers.industry')}  name="industry" handleChange={handleChange} />
                                <TextField placeholder={t('question4.answers.contact')}   name="contact"  handleChange={handleChange} />
                            </div>
                        </div>
                    </div>
                </HorizontalPanel>

                <HorizontalPanel ref={horizontalPanels[4].panel}>
                    <div className={`${s.question} ${s.q5}`}>
                        <Image
                            className={s.bgText}
                            src={q5BgText}
                            alt="additional information"
                        />

                        <div className={`${s.blueRect} ${s.br1}`} ref={(el: HTMLDivElement) => { horizontalPanels[4].blueRects.current[0] = el }} />
                        <div className={`${s.blueRect} ${s.br2}`} ref={(el: HTMLDivElement) => { horizontalPanels[4].blueRects.current[1] = el }} />

                        <div className={s.modal} ref={horizontalPanels[4].modal}>
                            <h2>{ t('question5.question') }</h2>
                            <p>{ t('question5.tip1') }</p>
                            <p>{ t('question5.tip2') }</p>
                            <div className={s.form}>
                                <TextArea handleChange={handleChange} name='additionalInfo' placeholder={t('question5.message')} />
                            </div>
                        </div>
                    </div>
                </HorizontalPanel>
            </HorizontalSection>

            <Slide className={s.summary} ref={summary.panel}>
                <Image
                    className={s.bgText}
                    src={summaryBgText}
                    alt="summary"
                />

                <div className={`${s.blueRect} ${s.br1}`} ref={(el: HTMLDivElement) => { summary.blueRects.current[0] = el }} />

                <div className={s.modal} ref={summary.modal}>
                    <h2>{ t('summary.heading') }</h2>
                    <div className={s.choices}>
                        <div className={s.choice}>
                            <p className={s.tag}>{ t('summary.pages') }</p>
                            <p className={`${s.selected} ${convertedData['Pages Count'] === notSpecified ? s.invalid : ''}`}>{ convertedData['Pages Count'] }</p>
                        </div>

                        <div className={s.choice}>
                            <p className={s.tag}>{ t('summary.type') }</p>
                            <p className={`${s.selected} ${convertedData['Website Type'] === notSpecified ? s.invalid : ''}`}>{ convertedData['Website Type'] }</p>
                        </div>

                        <div className={s.choice}>
                            <p className={s.tag}>{ t('summary.creativity') }</p>
                            <p className={`${s.selected}`}>{ convertedData['Creativity'] }</p>
                        </div>

                        <div className={s.choice}>
                            <p className={s.tag}>{ t('summary.full_name') }</p>
                            <p className={`${s.selected} ${convertedData['Name'] === notSpecified ? s.invalid : ''}`}>{ convertedData['Name'] }</p>
                        </div>

                        <div className={s.choice}>
                            <p className={s.tag}>{ t('summary.company') }</p>
                            <p className={`${s.selected} ${convertedData['Company Name'] === notSpecified ? s.invalid : ''}`}>{ convertedData['Company Name'] }</p>
                        </div>

                        <div className={s.choice}>
                            <p className={s.tag}>{ t('summary.industry') }</p>
                            <p className={`${s.selected} ${convertedData['Industry'] === notSpecified ? s.invalid : ''}`}>{ convertedData['Industry'] }</p>
                        </div>

                        <div className={s.choice}>
                            <p className={s.tag}>{ t('summary.contact') }</p>
                            <p className={`${s.selected} ${convertedData['Contact Method'] === notSpecified ? s.invalid : ''}`}>{ convertedData['Contact Method'] }</p>
                        </div>

                        <p className={s.PrivacyPolicy}>{ t('summary.privacy_policy_mention.0') }<Link href="/privacy-policy" className="a">{ t('summary.privacy_policy_mention.1') }</Link></p>
                    </div>
                </div>
                <SubmitBtn disabled={isSubmitting || !dataValid} className={s.submitButton} />
                <Label text={result} className={s.label} />
            </Slide>
        </form>
    );
}

export default ContactForm;