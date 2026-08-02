import styles from './Slide.module.scss';
import { Children, Ref } from '@/utils/types';

const s = styles;

interface Props extends Children {
    className?: string;
    ref?: Ref;
    id?: string;
    style?: React.CSSProperties;
}

function GridSlide({ children, className, ref, id, style } : Props) {
    return (
        <section className={`${className} ${s.GridSlide}`} ref={ref} id={id} style={style}>
            {children}
        </section>
    );
}

export default GridSlide;