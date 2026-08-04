import s from './forms.module.scss';
import { Core, Ref, El } from '@/utils/types';
import { useTranslations } from 'next-intl';
import ArrowRightIcon from '@iconify-react/mdi/arrow-right';
import { motion } from 'motion/react';

interface SubmitBtnProps extends Core {
    disabled: boolean;
}

export function SubmitBtn({ className, ref, style, disabled }: SubmitBtnProps) {
    const t = useTranslations('contact.content.form.summary');

    return (
        <button
            className={`${s.SubmitBtn} ${className || ''} ${disabled ? s.disabled : s.enabled}`}
            type="submit"
            style={style}
            disabled={disabled}
            ref={ref as Ref<El.Btn>}
        >
            <div className={s.dot} />
            <div className={s.text}>
                { t('submit') }
            </div>
            <ArrowRightIcon className={s.arrow} />
        </button>
    );
}

interface LabelProps extends Core {
    text: string;
}

export function Label({ className, ref, style, text }: LabelProps) {
    return (
        <motion.div
            className={`${className || ''}
            ${s.Label}`}
            ref={ref as Ref<El.Div>}
            style={style}
            layout
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            { text }
        </motion.div>
    );
}