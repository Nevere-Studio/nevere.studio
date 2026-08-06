import { useTranslations } from 'next-intl';

export default function useRichText(t: ReturnType<typeof useTranslations>) {
    return function(key: string, options: {} = {}) {
        return t.rich(key, {
            bold: chunks => <strong>{ chunks }</strong>,
            ...options
        });
    }
}