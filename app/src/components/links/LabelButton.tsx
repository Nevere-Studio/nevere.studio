import type { LinkProps, El } from '@/utils/types';
import styles from './links.module.scss';
import MaskBtn from '@/components/links/MaskBtn';
import { forwardRef } from 'react';

const s = styles;

interface Props extends LinkProps {
    dualLabel: {
        internal: string;
        external?: string;
    },
    type?: 'internal' | 'external',
}

const LabelButton = forwardRef<El.Div, Props>(({ href, className, dualLabel, style, type }, ref) => {
    return (
        <div className={`${s.labelBtn} ${className}`} style={style} ref={ref}>
            <MaskBtn 
                href={href} 
                type={type}
            >
                { dualLabel.internal }
            </MaskBtn>

            <div className={s.externalLabel}>
                { dualLabel.external }
            </div>
        </div>
    );
});

LabelButton.displayName = 'LabelButton';

export default LabelButton;