'use client';

import s from './forms.module.scss';
import { Core, Ref, El } from '@/utils/types';
import { useState, useEffect, useRef } from 'react';
import { gsap, CSSPlugin } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(CSSPlugin);

interface Props extends Core {
    disabled: boolean;
    label: string;
}

function SubmitBtn({ className, ref, style, disabled, label }: Props) {
    const labelText = useRef<El.P>(null);

    useGSAP(() => {
        if (label == '') {
            gsap.to(labelText.current, {
                width: 0,
                paddingRight: 0
            });
        } else {
            gsap.timeline()
            .to(labelText.current, {
                width: 0,
                marginInline: 0
            })
            .to(labelText.current, {
                width: 'auto',
                marginInline: 24
            });
        }
    }, { dependencies: [label] });

    return (
        <div className={`${className || ''} ${s.flareBtn} ${s.prior}`} ref={ref as Ref<El.Div>}>
            <div className={s.label}>
                <div className={s.btnContainer}>
                    <span className={s.glow} />
                    <span className={s.flare} />
                    <button
                        style={{ cursor: disabled ? 'not-allowed' : 'pointer', ...style }}
                        className={s.btn}
                        disabled={Boolean(disabled)}
                        type='submit'
                    > 
                        Submit
                    </button>
                </div>
                <p className={s.labelText} style={label !== '' ? { width: 'fit-content' } : { paddingRight: 0 }} ref={labelText}>
                    { label }
                </p>
            </div>
        </div>
    );
}

export default SubmitBtn;