import s from './forms.module.scss';
import { InputProps, HandleChange } from './types';

interface Props extends InputProps {
    handleChange: HandleChange
}

function TextField({ className = '', ref, name = '', type = 'text', required = false, id = '', placeholder = '', handleChange }: Props) {
    return (
        <input className={`${className} ${s.TextField}`} name={name} type={type} required={required} placeholder={placeholder} id={id} ref={ref} onChange={handleChange} />
    );
}

export default TextField;