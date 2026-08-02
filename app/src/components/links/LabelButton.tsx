import type { LinkProps } from '@/utils/types';
import { Link } from '@/i18n/navigation';
import styles from './links.module.scss';

const s = styles;

interface Props extends LinkProps {
    dualLabel: {
        internal: string;
        external?: string;
    }
}

function LabelButton({ href, ref, className, dualLabel, style }: Props) {
    return (
        <div className={`${s.labelBtn} ${className}`} style={style}>
            <Link
                href={href}
                ref={ref}
                className={s.btn}
            >
                { dualLabel.internal }
            </Link>
            <div className={s.label}>
                { dualLabel.external }
            </div>
        </div>
    );
}

export default LabelButton;