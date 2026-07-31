import styles from './page.module.scss';
import ScrollSmootherWrapper from '@/utils/gsap/ScrollSmoother';
import Footer from '@/components/Footer/Footer';
import Slide from '@/components/Slide/Slide';
import { useTranslations } from 'next-intl';
import LiquidAurora from '@/components/shaders/LiquidAurora';
import LabelButton from '@/components/links/LabelButton';
import CollabsMarquee from '@/components/marquee/CollabsMarquee';

const s = styles;

function Home() {
  const t = useTranslations('home.content');

  return (
    <ScrollSmootherWrapper>
      <main className="Main">
        <Slide className={s.Hero}>
          <LiquidAurora />
          <section className={s.content}>
            <p className={s.availability}><span className={s.indicator}></span><span className={s.text}>{ t('availability') }</span></p>
            <h1>{ t('hero.0') }<strong>{ t('hero.1') }</strong></h1>
            <p className={s.lead}>{ t('lead.0') }<strong>{ t('lead.1') }</strong>{ t('lead.2') }<strong>{ t('lead.3') }</strong>{ t('lead.4') }<strong>{ t('lead.5') }</strong>.</p>
            <LabelButton 
              href="/contact" 
              dualLabel={{ internal: t('cta'), external: t('starting_from') }}
              className={s.cta}
            />
            <CollabsMarquee className={s.marquee} />
          </section>
        </Slide>
      </main>
      <Footer />
    </ScrollSmootherWrapper>
  );
}

export default Home;