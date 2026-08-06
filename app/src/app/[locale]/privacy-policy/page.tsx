import s from './page.module.scss';
import { useTranslations } from 'next-intl';
import useRichText from '@/i18n/useRichText';
import Slide from '@/components/Slide/Slide';
import FoggyBlob from '@/components/shaders/FoggyBlob';

function PrivacyPolicy() {
    const t = useTranslations('privacy_policy.content');
    const rt = useRichText(t);

    return (
        <>
            <Slide className={s.Hero}>
                <FoggyBlob />
                <h1>{ t('page_under_construction') } <span className={s.pointer}>█</span></h1>
            </Slide>
        </>
    );
}

export default PrivacyPolicy;