import Marquee from "./Marquee";
import Image from 'next/image';
import styles from './Marquee.module.scss';
import { useTranslations } from 'next-intl';
import type { Core, Ref, El } from '@/utils/types';

const s = styles;

function CollabsMarquee({ className, ref, id }: Core) {
    const t = useTranslations('home.content.hero');

    return (
        <div className={`${s.collabsMarquee} ${className}`} ref={ref as Ref<El.Div>} id={id}>
            <div className={s.text}>
                <p className={s.black}>{ t('our_clients') }</p>
                <p className={s.white}>{ t('our_clients') }</p>
            </div>
            <Marquee>
                <Image className={s.item} width={750}  height={301} alt="Biogas Solutions"    src="https://www.biogassolutions.pl/img/brand/logo.svg" />
                <Image className={s.item} width={1734} height={540} alt="Lumi"                src="/collabs/lumi.png"                                 />
                <Image className={s.item} width={1288} height={158} alt="SIMERIS RACING"      src="/collabs/simeris-racing.svg"                       />
                <Image className={s.item} width={440}  height={212} alt="Parysek Investments" src="/collabs/parysek-investments.svg"                  />
                <div className={s.item}>
                    <Image className={s.img} width={688}  height={230} alt="RBE" src="/collabs/rbe.svg" />
                    <div className={s.divider} style={{ background: '#005e39' }}></div>
                    <p style={{ color: '#005e39' }}>Romgos Bio Energia</p>
                </div>
            </Marquee>
        </div>
    );
}

export default CollabsMarquee;