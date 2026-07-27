import type { Children, El, Ref } from '@/utils/types';
import s from './forms.module.scss';

interface Props extends Children {
    active: boolean;
    className?: string;
    ref?: Ref<El.Btn>;
    onClick?: () => void;
}

function OptionBtn({ children, active, className = '', ref, onClick }: Props) {
    return (
        <button className={`${s.OptionBtn} ${active ? s.active : ''} ${className}`} ref={ref} onClick={onClick} type="button">
            { children }
        </button>
    );
}

export default OptionBtn;