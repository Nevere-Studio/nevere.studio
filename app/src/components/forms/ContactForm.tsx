'use client';

import s from './ContactForm.module.scss';
import { useState, useEffect, useRef } from 'react';
import type { Ref, El } from '@/utils/types';

// I M A G E S
import Image from 'next/image';
import q1BgText from '@/../public/dotted-kihim-text/pages.svg';
import q2BgText from '@/../public/dotted-kihim-text/type.svg';
import q3BgText from '@/../public/dotted-kihim-text/creativity.svg';
import q4BgText from '@/../public/dotted-kihim-text/you.svg';
import summaryBgText from '@/../public/dotted-kihim-text/summary.svg';

// C O M P O N E N T S
import { HorizontalSection, HorizontalPanel, HorizontalSectionRef } from '../horizontal-scroll/horizontal-scroll';
import Slide from '@/components/Slide/Slide';
import TextField from '@/components/forms/TextField';
import Options from '@/components/forms/Options';
import Slider from '@/components/forms/Slider';
import SubmitBtn from './SubmitBtn';

// G S A P
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);
import { revealLeft, revealRight, revealUp, revealDown } from '@/utils/gsap/animations';

const PAGES_OPTIONS = ['1', '2-5', '6-10', '>10', "I don't know"];
const TYPES_OPTIONS = ['Informational', 'Web App', 'Ecommerce'];

function ContactForm() {
    // F O R M   F U N C T I O N A L I T Y
    const [formData, setFormData] = useState({
        pages:          'Not Specified',
        type:           'Not Specified',
        creativity:     '50',
        name:           'Not Specified',
        company:        'Not Specified',
        industry:       'Not Specified',
        contact:        'Not Specified',
        additionalInfo: '-'
    });
    const [convertedData, setConvertedData] = useState(formData);
    const [isSubmitting,  setIsSubmitting ] = useState<boolean>(false);
    const [result,        setResult       ] = useState<string> ('');

    function sanitizeText(value: string) {
        return value === '' ? 'Not Specified' : value;
    }

    function convertValue(value: string, endValues: string[]) {
        value = sanitizeText(value);
        return value.startsWith('_') ?
        value.substring(1)
        : ['Not Specified', ...endValues][Number(value)] || 'Not Specified';
    }

    const dataValid = Object.entries(formData).every(([key, value]: string[]) => {
        if (key === 'additionalInfo') return true;
        if (value === '') return false;
        else return value !== 'Not Specified';
    });

    useEffect(() => {
        setConvertedData({
            ...formData,
            pages:      convertValue(formData.pages, PAGES_OPTIONS),
            type:       convertValue(formData.type,  TYPES_OPTIONS),
            creativity: `${formData.creativity}%`,
            name:       sanitizeText(formData.name    ),
            company:    sanitizeText(formData.company ),
            industry:   sanitizeText(formData.industry),
            contact:    sanitizeText(formData.contact )
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
            subject: 'New Submission from Contact Form on oryonstudio.dev'
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
                setResult('Form Submitted Successfully!');
            } else {
                setResult(data.message || 'Something went wrong. Please try again or email us directly');
            }
        } catch (error) {
            console.log(error);
            setResult('An error occured. Please try again or email us directly');
        } finally {
            setIsSubmitting(false);
        }
    }

    // A N I M A T I O N S
    const horizontalSection = useRef<HorizontalSectionRef>(null);
    const form = useRef<HTMLFormElement>(null);

    const panel0 = useRef<El>(null);
    const panel1 = useRef<El>(null);
    const panel2 = useRef<El>(null);
    const panel3 = useRef<El>(null);
    const panel4 = useRef<El>(null);

    const modal0 = useRef<El.Div>(null);
    const modal1 = useRef<El.Div>(null);
    const modal2 = useRef<El.Div>(null);
    const modal3 = useRef<El.Div>(null);
    const modal4 = useRef<El.Div>(null);

    const blueRects0 = useRef<El.Div[]>([]);
    const blueRects1 = useRef<El.Div[]>([]);
    const blueRects2 = useRef<El.Div[]>([]);
    const blueRects3 = useRef<El.Div[]>([]);
    const blueRects4 = useRef<El.Div[]>([]);

    const horizontalPanels = [
        { panel: panel0, modal: modal0, blueRects: blueRects0 },
        { panel: panel1, modal: modal1, blueRects: blueRects1 },
        { panel: panel2, modal: modal2, blueRects: blueRects2 },
        { panel: panel3, modal: modal3, blueRects: blueRects3 },
    ];

    const summary = {
        panel: panel4,
        modal: modal4,
        blueRects: blueRects4
    };

    useGSAP(() => {
        if (typeof window === 'undefined') return;
        if (!horizontalSection.current || !form.current) return;
        if (!horizontalPanels[0].panel.current) return;
        if (!horizontalPanels[0].blueRects.current.length) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: horizontalPanels[0].panel.current,
                containerAnimation: horizontalSection.current?.tween,
                start: 'top top'
            }
        });

        tl.add(revealDown(horizontalPanels[0].modal));
    }, { scope: form, dependencies: [horizontalSection.current?.tween] });

    useGSAP(() => {
        if (typeof window === 'undefined') return;
        if (!horizontalSection.current || !form.current) return;
        if (!horizontalPanels[1].panel.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: horizontalPanels[1].panel.current,
                containerAnimation: horizontalSection.current?.tween,
                start: 'left 5%'
            }
        });

        tl.add(revealLeft(horizontalPanels[1].modal));
    }, { scope: form, dependencies: [horizontalSection.current?.tween] });

    useGSAP(() => {
        if (typeof window === 'undefined') return;
        if (!horizontalSection.current || !form.current) return;
        if (!horizontalPanels[2].panel.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: horizontalPanels[2].panel.current,
                containerAnimation: horizontalSection.current?.tween,
                start: 'left 5%'
            }
        });

        tl.add(revealUp(horizontalPanels[2].modal));
    }, { scope: form, dependencies: [horizontalSection.current?.tween] });

    useGSAP(() => {
        if (typeof window === 'undefined') return;
        if (!horizontalSection.current || !form.current) return;
        if (!horizontalPanels[3].panel.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: horizontalPanels[3].panel.current,
                containerAnimation: horizontalSection.current?.tween,
                start: 'left 5%'
            }
        });

        tl.add(revealRight(horizontalPanels[3].modal));
    }, { scope: form, dependencies: [horizontalSection.current?.tween] });


    return (
        <form className={s.ContactForm} onSubmit={handleSubmit} ref={form}>
            <HorizontalSection className={s.HorizontalSection} id="form" ref={horizontalSection as any}>
                <HorizontalPanel ref={horizontalPanels[0].panel}>
                    <div className={`${s.question} ${s.q1}`}>
                        <Image
                            className={s.bgText}
                            src={q1BgText}
                            alt="pages"
                        />
                        
                        <div className={s.blueRect} ref={(el: HTMLDivElement) => { horizontalPanels[0].blueRects.current[0] = el }} />

                        <div className={s.modal} ref={horizontalPanels[0].modal}>
                            <h2>How many pages do you need on your website?</h2>
                            <p>If you don't know the exact quantity or you need advice - don't worry! Just click "I don't know". We will assist you with the decision.</p>
                            
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
                            <h2>What type of website are you looking for?</h2>

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
                            <h2>How creative do you want it to be?</h2>
                            <div className={s.sliderModule}>
                                <div className={s.sliderWrapper}>
                                    <div className={s.leftEnd} />
                                    <div className={s.center} />
                                    <div className={s.rightEnd} />
                                    <div className={s.leftLimit} />
                                    <div className={s.rightLimit} />
                                    <div className={s.track} />
                                    <Slider className={s.slider} min={30} max={80} step={1} handleChange={handleChange} name="creativity" />
                                </div>

                                <div className={s.descriptions}>
                                    <p className={s.start}>Regular website</p>
                                    <p className={s.center}>Creative, but without sacrificing functionality</p>
                                    <p className={s.end}>Artistic</p>
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
                            <h2>Your information</h2>
                            <div className={s.form}>
                                <TextField placeholder='Full Name'   name="name"     handleChange={handleChange} />
                                <TextField placeholder='Company'     name="company"  handleChange={handleChange} />
                                <TextField placeholder='Industry'    name="industry" handleChange={handleChange} />
                                <TextField placeholder='Email/Phone' name="contact"  handleChange={handleChange} />
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
                <div className={`${s.blueRect} ${s.br2}`} ref={(el: HTMLDivElement) => { summary.blueRects.current[1] = el }} />
                <div className={`${s.blueRect} ${s.br3}`} ref={(el: HTMLDivElement) => { summary.blueRects.current[2] = el }} />

                <div className={s.modal}>
                    <h2>Summary</h2>
                    <div className={s.choices}>
                        <div className={s.choice}>
                            <p className={s.tag}>Pages:</p>
                            <p className={`${s.selected} ${convertedData.pages === 'Not Specified' ? s.invalid : ''}`}>{ convertedData.pages }</p>
                        </div>

                        <div className={s.choice}>
                            <p className={s.tag}>Type:</p>
                            <p className={`${s.selected} ${convertedData.type === 'Not Specified' ? s.invalid : ''}`}>{ convertedData.type }</p>
                        </div>

                        <div className={s.choice}>
                            <p className={s.tag}>Creativity:</p>
                            <p className={`${s.selected}`}>{ convertedData.creativity }</p>
                        </div>

                        <div className={s.choice}>
                            <p className={s.tag}>Your Name:</p>
                            <p className={`${s.selected} ${convertedData.name === 'Not Specified' ? s.invalid : ''}`}>{ convertedData.name }</p>
                        </div>

                        <div className={s.choice}>
                            <p className={s.tag}>Company:</p>
                            <p className={`${s.selected} ${convertedData.company === 'Not Specified' ? s.invalid : ''}`}>{ convertedData.company }</p>
                        </div>

                        <div className={s.choice}>
                            <p className={s.tag}>Industry:</p>
                            <p className={`${s.selected} ${convertedData.industry === 'Not Specified' ? s.invalid : ''}`}>{ convertedData.industry }</p>
                        </div>

                        <div className={s.choice}>
                            <p className={s.tag}>Contact:</p>
                            <p className={`${s.selected} ${convertedData.contact === 'Not Specified' ? s.invalid : ''}`}>{ convertedData.contact }</p>
                        </div>
                    </div>
                </div>
                <SubmitBtn disabled={isSubmitting || !dataValid} className={s.submitButton} />
            </Slide>
        </form>
    );
}

export default ContactForm;