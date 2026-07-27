'use client';

import { HorizontalSection, HorizontalPanel } from '../horizontal-scroll/horizontal-scroll';
import s from './ContactForm.module.scss';
import Slide from '@/components/Slide/Slide';
import Image from 'next/image';
import q1BgText from '@/../public/dotted-kihim-text/pages.svg';
import q2BgText from '@/../public/dotted-kihim-text/type.svg';
import q3BgText from '@/../public/dotted-kihim-text/creativity.svg';
import q4BgText from '@/../public/dotted-kihim-text/you.svg';
import summaryBgText from '@/../public/dotted-kihim-text/summary.svg';
import TextField from '@/components/forms/TextField';
import Options from '@/components/forms/Options';
import Slider from '@/components/forms/Slider';
import { useState,  useEffect } from 'react';
import SubmitBtn from './SubmitBtn';

function ContactForm() {
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
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [result,       setResult      ] = useState<string> ('');
    const [dataValid,    setDataValid   ] = useState<boolean>(false);

    useEffect(() => {
        Object.entries(formData).forEach(([key, value]: string[]) => {
            if (key !== 'additionalInfo' && value === 'Not Specified') setDataValid(false);
            else setDataValid(true);
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
            ...formData,
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


    return (
        <form className={s.ContactForm} onSubmit={handleSubmit}>
            <HorizontalSection className={s.HorizontalSection} id="form">
                <HorizontalPanel>
                    <div className={`${s.question} ${s.q1}`}>
                        <Image
                            className={s.bgText}
                            src={q1BgText}
                            alt="pages"
                        />
                        
                        <div className={s.blueRect} />

                        <div className={s.modal}>
                            <h2>How many pages do you need on your website?</h2>
                            <p>If you don't know the exact quantity or you need advice - don't worry! Just click "I don't know". We will assist you with the decision.</p>
                            
                            <div className={s.form}>
                                <Options options={['1', '2-5', '6-10', '>10', "I don't know"]} handleProgrammaticChange={handleProgrammaticChange} name="pages" custom={true} />
                            </div>
                        </div>
                    </div>
                </HorizontalPanel>

                <HorizontalPanel>
                    <div className={`${s.question} ${s.q2}`}>
                        <Image
                            className={s.bgText}
                            src={q2BgText}
                            alt="type"
                        />

                        <div className={`${s.blueRect} ${s.br1}`} />
                        <div className={`${s.blueRect} ${s.br2}`} />

                        <div className={s.modal}>
                            <h2>What type of website are you looking for?</h2>

                            <div className={s.form}>
                                <Options options={['Informational', 'Web App', 'Ecommerce']} handleProgrammaticChange={handleProgrammaticChange} name="type" custom={true} />
                            </div>
                        </div>
                    </div>
                </HorizontalPanel>

                <HorizontalPanel>
                    <div className={`${s.question} ${s.q3}`}>
                        <Image
                            className={s.bgText}
                            src={q3BgText}
                            alt="creativity"
                        />

                        <div className={`${s.blueRect} ${s.br1}`} />
                        <div className={`${s.blueRect} ${s.br2}`} />

                        <div className={s.modal}>
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

                <HorizontalPanel>
                    <div className={`${s.question} ${s.q4}`}>
                        <Image
                            className={s.bgText}
                            src={q4BgText}
                            alt="you"
                        />

                        <div className={`${s.blueRect} ${s.br1}`} />
                        <div className={`${s.blueRect} ${s.br2}`} />

                        <div className={s.modal}>
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

            <Slide className={s.summary}>
                <Image
                    className={s.bgText}
                    src={summaryBgText}
                    alt="summary"
                />

                <div className={`${s.blueRect} ${s.br1}`} />
                <div className={`${s.blueRect} ${s.br2}`} />
                <div className={`${s.blueRect} ${s.br3}`} />

                <div className={s.modal}>
                    <h2>Summary</h2>
                    <div className={s.choices}>
                        <div className={s.choice}>
                            <p className={s.tag}>Pages:</p>
                            <p>{
                                formData.pages.startsWith('_') ?
                                formData.pages.substring(1)
                                : ['Not Specified', '1', '2-5', '6-10', '>10'][Number(formData.pages)] || 'Not Specified'
                            }</p>
                        </div>

                        <div className={s.choice}>
                            <p className={s.tag}>Type:</p>
                            <p className={s.selected}>{
                                formData.type.startsWith('_') ?
                                formData.type.substring(1)
                                : ['Not Specified', 'Informational', 'Web Application', 'Ecommerce'][Number(formData.pages)] || 'Not Specified'
                            }</p>
                        </div>

                        <div className={s.choice}>
                            <p className={s.tag}>Creativity:</p>
                            <p className={s.selected}>{`${formData.creativity}%`}</p>
                        </div>

                        <div className={s.choice}>
                            <p className={s.tag}>Your Name:</p>
                            <p className={s.selected}>{formData.name}</p>
                        </div>

                        <div className={s.choice}>
                            <p className={s.tag}>Company:</p>
                            <p className={s.selected}>{formData.company}</p>
                        </div>

                        <div className={s.choice}>
                            <p className={s.tag}>Industry:</p>
                            <p className={s.selected}>{formData.industry}</p>
                        </div>

                        <div className={s.choice}>
                            <p className={s.tag}>Contact:</p>
                            <p className={s.selected}>{formData.contact}</p>
                        </div>
                    </div>
                </div>
                <SubmitBtn disabled={isSubmitting || !dataValid} />
            </Slide>
        </form>
    );
}

export default ContactForm;