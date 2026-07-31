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
            <p className={s.availability}><span className={s.indicator}></span><span className={s.text}>Available for select Q3/Q4 projects</span></p>
            <h1>The cosmic standard for <strong>standout brands</strong></h1>
            <p className={s.lead}>Nevere Studio builds custom Next.js web applications for brands that refuse to look generic. We pair <strong>custom front-end design</strong> with <strong>modern React architecture</strong> to deliver fast, standalone sites built <strong>strictly from scratch</strong>.</p>
            <LabelButton 
              href="/contact" 
              dualLabel={{ internal: 'Work with Us', external: 'Starting from $2000' }}
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