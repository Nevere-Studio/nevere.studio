import type { Core, El, Ref } from '@/utils/types';
import styles from './Marquee.module.scss';

const s = styles;

function Marquee({ children, className, ref, id }: Core) {
    return (
        <div className={`${s.marquee} ${className}`} ref={ref as Ref<El.Div>} id={id}>
            <div className={s.track}>
                { children }
            </div>

            <div className={s.track}>
                { children }
            </div>
        </div>
    );
}

export default Marquee;