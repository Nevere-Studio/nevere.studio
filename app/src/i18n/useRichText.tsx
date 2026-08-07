import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function useRichText(t: ReturnType<typeof useTranslations>) {
    return function(key: string, options: {} = {}) {
        return t.rich(key, {
            bold: chunks => <strong>{ chunks }</strong>,
            i: chunks => <i>{ chunks }</i>,
            ns: chunks => <Link href='/' className="a">{ chunks }</Link>,
            ...options
        });
    }
}