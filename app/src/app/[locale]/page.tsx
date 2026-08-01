'use client';

import s from './page.module.scss';
import { useTranslations } from 'next-intl';
import { El, Ref } from '@/utils/types';

import ScrollSmootherWrapper from '@/utils/gsap/ScrollSmoother';
import Footer from '@/components/Footer/Footer';
import Slide from '@/components/Slide/Slide';
import GridSlide from '@/components/Slide/GridSlide';
import LiquidAurora from '@/components/shaders/LiquidAurora';
import LabelButton from '@/components/links/LabelButton';
import CollabsMarquee from '@/components/marquee/CollabsMarquee';

import Image from 'next/image';
import bsHeroDesktop    from '@/../public/mockups/bs_macbook.png';
import bsContactDesktop from '@/../public/mockups/bs_contact_macbook.png';
import bsProcessDesktop from '@/../public/mockups/bs_process_macbook.png';
import bsMobile1        from '@/../public/mockups/bs_hero_iphone.png';
import bsMobile2        from '@/../public/mockups/bs_cards_iphone.png';
import bsMobile3        from '@/../public/mockups/bs_gallery_iphone.png';
import srDesktop        from '@/../public/mockups/sr_contact_hero_macbook.png';
import srTablet         from '@/../public/mockups/sr_contact_options_ipad_mini.png';

import { useRef } from 'react';
import { gsap, CSSPlugin } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(CSSPlugin, ScrollTrigger);
import { fadeUpWords, revealWipe, skewIn } from '@/utils/gsap/animations';

function Home() {
	const t = useTranslations('home.content');

	const workSection  = useRef<El>    (null);
	const workHeading  = useRef<El.H>  (null);
	const bsMobile     = useRef<El.Div>(null);
	const workLines    = useRef<(El.Div | null)[]>([]);
	const workProjects = useRef<(El.H   | null)[]>([]);
	const workImages   = useRef<(El.Img | null)[]>([]);

	const work = {
		section:  workSection,
		h:        workHeading,
		lines:    workLines,
		projects: workProjects,
		imgs:     workImages,
	}

	useGSAP(() => {
		if (typeof window === 'undefined') return;

		const { section, h, lines, projects, imgs } = work;
		if (!section.current || !h.current || !lines.current || !projects.current.length || !imgs.current.length) return;
		
		const splitH = fadeUpWords.prepare(h);

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: section.current,
				start: 'top 5%',
			}
		});
		tl.add(fadeUpWords.animate(splitH));
		tl.add(revealWipe(lines, { ease: 'power1.out' }), '<0.1');
		tl.add(skewIn(projects), '<0.4');
	}, { scope: work.section });

	useGSAP(() => {
		if (typeof window === 'undefined') return;

		const { section, h, lines, projects, imgs } = work;
		if (!section.current || !h.current || !lines.current || !projects.current.length || !imgs.current.length || !bsMobile) return;

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: section.current,
				start: 'top top',
				end: '+=10000',
				pin: true,
				scrub: 1
			}
		});

		tl.to(imgs.current[1], {
			clipPath: 'polygon(-5% -5%, -5% 105%, 105% 105%, 105% -5%)',
			duration: 0.75,
			ease: 'power4.out'
		});

		tl.to(imgs.current[0], {
			clipPath: 'polygon(-5% -5%, 105% -5%, 105% 105%, 105% -5%)',
			duration: 0.75,
			ease: 'power4.out'
		}, 0);

		tl.from(imgs.current[2], {
			x: '110%',
			duration: 0.75,
			ease: 'power4.out'
		}, '-=0.6');

		tl.to(imgs.current.slice(0, 3), {
			y: '-100vh',
			duration: 0.5,
		}, '-=0.5');

		tl.from(bsMobile.current, {
			y: '100vh',
			duration: 0.5
		}, '<');

		tl.to(imgs.current.slice(3, 6), {
			y: gsap.utils.wrap([50, 0, -50]),
			ease: 'power4.out',
			duration: 0.5
		}, '<');
	}, { scope: work.section });

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

				<GridSlide className={s.Work} ref={work.section}>
				<h2 ref={work.h}>Our Work</h2>

				<div className={s.project}>
					<div>
					<div className={s.lineTop}    ref={el => { work.lines.current[0] = el }} />
					<h3 className={`${s.sr} ${s.active}`}   ref={el => { work.projects.current[0] = el }}>biogassolutions.pl</h3>
					<h3 className={`${s.bs} ${s.inactive}`} ref={el => { work.projects.current[1] = el }}>simerisracing.com</h3>
					<div className={s.lineBottom} ref={el => { work.lines.current[1] = el }} />
					</div>
				</div>

				<div className={s.images}>
					<Image
						src={bsHeroDesktop}
						alt=""
						width={1920}
						height={1280}
						placeholder="blur"
						className={`${s.img} ${s.BsHero}`}
						ref={el => { work.imgs.current[0] = el }}
					/>

					<Image
						src={bsContactDesktop}
						alt=""
						width={1920}
						height={1280}
						placeholder="blur"
						className={`${s.img} ${s.BsContact}`}
						ref={el => { work.imgs.current[1] = el }}
					/>

					<Image
						src={bsProcessDesktop}
						alt=""
						width={1920}
						height={1280}
						placeholder="blur"
						className={`${s.img} ${s.BsProcess}`}
						ref={el => { work.imgs.current[2] = el }}
					/>

					<div className={s.bsMobile} ref={bsMobile}>
						<Image
							src={bsMobile1}
							alt=""
							width={1080}
							height={1920}
							placeholder="blur"
							className={`${s.img}`}
							ref={el => { work.imgs.current[3] = el }}
						/>

						<Image
							src={bsMobile2}
							alt=""
							width={1080}
							height={1920}
							placeholder="blur"
							className={`${s.img}`}
							ref={el => { work.imgs.current[4] = el }}
						/>

						<Image
							src={bsMobile3}
							alt=""
							width={1080}
							height={1920}
							placeholder="blur"
							className={`${s.img}`}
							ref={el => { work.imgs.current[5] = el }}
						/>
					</div>
				</div>
				</GridSlide>
			</main>
			<Footer />
		</ScrollSmootherWrapper>
	);
}

export default Home;