'use client';

import OptionBtn from './OptionBtn';
import s from './forms.module.scss';
import type { Ref, El, Children } from '@/utils/types';
import { useState, useEffect } from 'react';
import { TextField } from './TextField';
import { HandleProgrammaticChange, ChangeEvent } from './types';

interface Props extends Children {
    options:                  string[];
    custom?:                  boolean;
    className?:               string;
    ref?:                     Ref<El.Div>;
    name:                     string;
    handleProgrammaticChange: HandleProgrammaticChange;
}

function Options({ children, options, className='', ref, handleProgrammaticChange, name, custom = false }: Props) {
    const [active, setActive] = useState<number | string>(0);

    useEffect(() => {
        handleProgrammaticChange(name, String(active));
    }, [active]);

    return (
        <div className={`${className} ${s.Options}`} ref={ref}>
            { options.map((option, i) => {
                return (
                    <OptionBtn 
                        active={active == i + 1}
                        key={i}
                        onClick={() => active == i + 1 ? setActive(0) : setActive(i + 1)}
                    >
                        { option }
                    </OptionBtn>
                );
            }) }

            { custom ? <TextField name={name} handleChange={(e: ChangeEvent) => setActive(`_${e.target.value}`)} placeholder='Custom' /> : '' }

            { children }
        </div>
    )
}

export default Options;