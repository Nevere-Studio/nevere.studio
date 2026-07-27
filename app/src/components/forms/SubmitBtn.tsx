'use client';

import s from './forms.module.scss';
import { Core, Ref, El } from '@/utils/types';

interface Props extends Core {
    disabled: boolean;
}

function SubmitBtn({ className, ref, style, disabled }: Props) {
    return (
        <div className={`${className || ''} ${s.flareBtn} ${s.prior}`} ref={ref as Ref<El.Div>}>
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
    );
}

export default SubmitBtn;