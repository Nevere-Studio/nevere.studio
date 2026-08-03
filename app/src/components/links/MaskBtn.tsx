import s from './links.module.scss';
import type { LinkProps } from '@/utils/types';
import { Link } from '@/i18n/navigation';
import ArrowRightIcon from '@iconify-react/mdi/arrow-right';

interface Props extends LinkProps {
    type?: 'internal' | 'external'
}

function MaskBtn(props: Props) {
    const { type, className, children } = props;

    let typeClass;
    switch (type) {
        case 'internal':
            typeClass = s.internal;
            break;
        case 'external':
            typeClass = s.external;
            break;
        default:
            typeClass = s.internal;
            break;
    }

    return (
        <Link
            {...props}
            className={`${s.MaskBtn} ${className || ''}`}
        >
            <div className={s.dot} />
            <div className={s.text}>
                { children }
            </div>
            <ArrowRightIcon className={`${s.arrow} ${typeClass}`} />
        </Link>
    )
}

export default MaskBtn;