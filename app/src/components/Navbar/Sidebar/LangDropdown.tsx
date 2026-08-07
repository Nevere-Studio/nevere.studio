'use client';

import s from './Sidebar.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import type { El, Ref } from '@/utils/types';
import type { Locale } from '@/i18n/types';
import { GB, PL } from 'country-flag-icons/react/3x2';
import { motion, AnimatePresence } from 'motion/react';

const LANGS: {
    code: Locale,
    flag: React.ReactNode
}[] = [
    {
        code: 'en',
        flag: <GB style={{ height: '1.5rem'}} />
    },
    {
        code: 'pl',
        flag: <PL style={{ height: '1.5rem'}} />
    }
];

function LangDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropDownRef = useRef<El.Div>(null);

    const router = useRouter();

    const pathname = usePathname();
    const currentLocale: Locale = pathname.slice(1, 3) as Locale || 'en';
    const noLocalePathname = pathname.slice(3);
    const [localeIndex, setLocaleIndex] = useState(0);

    useEffect(() => {
        let index = 0;
        const lang = LANGS.filter(lang => lang.code === currentLocale);
        index = LANGS.indexOf(lang[0]);
        setLocaleIndex(index);
    }, [pathname]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown',   handleKeyDown     );

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown',   handleKeyDown     );
        };
    }, []);

    const handleSelect = (lang: Locale) => {
        setIsOpen(false);
        router.replace(`/${lang}/${noLocalePathname}`);
    }

    return (
        <div ref={dropDownRef} className={s.LangDropdown}>
            <button
                type="button"
                onClick={() => setIsOpen(prev => !prev)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                className={s.trigger}
            >
                { LANGS[localeIndex].flag }
                <div className={s.triangle} />
            </button>

            <AnimatePresence initial={false}>
                { isOpen && (
                    <motion.ul role="listbox" aria-label="languages" className={s.picker} initial={{ height: 0 }} animate={{ height: 'auto', transition: { ease: 'easeOut'} }} exit={{ height: 0, transition: { ease: 'easeOut'} }}>
                        {
                            LANGS.map(lang => lang !== LANGS[localeIndex] && (
                                <li
                                    key={lang.code}
                                    role="option"
                                    aria-selected={LANGS[localeIndex].code === lang.code}
                                    onClick={() => handleSelect(lang.code)}
                                    className={s.option}
                                >
                                    { lang.flag }
                                </li>
                            ))
                        }
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}

export default LangDropdown;