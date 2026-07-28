import s from './forms.module.scss';
import { InputProps, HandleChange } from './types';
import { Ref } from '@/utils/types';

interface Props extends InputProps {
    handleChange: HandleChange
}

export function TextField({ className = '', ref, name = '', type = 'text', required = false, id = '', placeholder = '', handleChange }: Props) {
    return (
        <input className={`${className} ${s.TextField}`} name={name} type={type} required={required} placeholder={placeholder} id={id} ref={ref} onChange={handleChange} />
    );
}

export function TextArea({ className = '', ref, name = '', required = false, id = '', placeholder = '', handleChange }: Props & { ref: Ref<HTMLTextAreaElement> }) {
    return (
        <textarea className={`${className} ${s.TextArea}`} name={name} required={required} id={id} placeholder={placeholder} ref={ref}></textarea>
    )
}
