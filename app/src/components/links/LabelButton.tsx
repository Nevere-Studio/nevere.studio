import type { LinkProps } from '@/utils/types';
import styles from './links.module.scss';
import MaskBtn from '@/components/links/MaskBtn';

const s = styles;

interface Props extends LinkProps {
    dualLabel: {
        internal: string;
        external?: string;
    },
    type?: 'internal' | 'external',
}

function LabelButton({ href, ref, className, dualLabel, style, type }: Props) {
    return (
        <div className={`${s.labelBtn} ${className}`} style={style}>
            <MaskBtn 
                href={href} 
                type={type}
                ref={ref}
            >
                { dualLabel.internal }
            </MaskBtn>

            <div className={s.externalLabel}>
                { dualLabel.external }
            </div>
        </div>
    );
}

export default LabelButton;