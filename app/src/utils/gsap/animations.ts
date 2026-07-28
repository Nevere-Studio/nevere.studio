import { gsap, CSSPlugin } from 'gsap';
import { convertElements } from '@/utils/functions';
import { SplitText } from 'gsap/all';
import type { El, GSAPAnimation } from '@/utils/types';

gsap.registerPlugin(SplitText, CSSPlugin);

/**
 * A reusable GSAP slide-in with skew animation.
 * @param el element to be animated; can be anything of type `Elements`
 * @param options optional, additional data for the animation; you can for instance add staggers, override duration, etc.
 * @returns gsap.core.Tween
 * @example you can use it as a separate animation:
 * ```ts
 * skewIn(elements, { stagger: 0.2 });
 * ```
 * or in a timeline with `.add()`:
 * ```ts
 * const tl = gsap.timeline();
 * tl.add(skewIn(elements, { stagger: 0.2 }), '<0,5');
 * ```
 */
export const skewIn: GSAPAnimation<El> = (el, options) => {
    const target = convertElements(el);

    const tween = gsap.from(target, {
        skewX: 30,
        x: -100,
        opacity: 0,
        ease: 'power3.out',
        stagger: 0.1,
        duration: 1,
        ...options
    });

    return tween;
}

/**
 * A reusable GSAP clip path animation.
 * Reveals the element from left to right
 * @param el element to be animated; can be anything of type `Elements`
 * @param options optional, additional data for the animation; you can for instance add staggers, override duration, etc.
 * @returns gsap.core.Tween
 * @example you can use it as a separate animation:
 * ```ts
 * revealWipe(elements, { stagger: 0.2 });
 * ```
 * or in a timeline with `.add()`:
 * ```ts
 * const tl = gsap.timeline();
 * tl.add(revealWipe(elements, { stagger: 0.2 }), '<0,5');
 * ```
 */
export const revealWipe: GSAPAnimation<El.Text> = (text, options) => {
    const target = convertElements(text);

    return gsap.from(target, {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.2,
        ease: 'power3.inOut',
        ...options
    });
}

// S P L I T   T E X T   A N I M A T I O N S
export const charsSlideIn = {
    /**
     * Prepares the target element for the charsSlideIn animation by splitting the text and setting initial values.
     * @param text - target element of type `El.Text`
     * @returns SplitText instance
     * @example
     * ```ts
        const spliText = charsSlideIn.prepare(text);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: '90% bottom'
            },
            delay: 0.1
        });

        tl.add(charsSlideIn.animate(splitText), "<0.5");
        * ```
    */
    prepare: (text, options?) => {
        const target = convertElements(text);

        const splitText = SplitText.create(target, { type: "chars" });

        gsap.set(target, { overflow: 'hidden' });
        gsap.set(splitText.chars, { y: '100%', ...options });

        return splitText;
    },

    /**
     * Reusable GSAP character-level slide-in upwards animation.
     * Use after `.prepare()`
     * @param text - target element returned by `.prepare()`
     * @returns gsap.core.Timeline
     * @example
     * ```ts
        const splitText = charsSlideIn.prepare(text);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: '90% bottom'
            },
            delay: 0.1
        });

        tl.add(charsSlideIn.animate(splitText), "<0.5");
     * ```
    */
    animate: (text, options?) => {

        const tl = gsap.timeline();

        tl.set(text.chars, { y: '100%' });

        tl.fromTo(text.chars, {
            y: '100%'
        }, {
            y: 0,
            duration: 0.6,
            ease: 'back.out(2)',
            stagger: {
                each: 0.03,
            },
            ...options
        });

        return tl;
    }
} satisfies GSAPAnimation.SplitText;

export const magneticPull = {
    /**
     * Prepares the target element for the marneticPull animation by splitting the text and setting initial values.
     * @param text - target element of type El.Text
     * @returns SplitText instance
     * @example
     * ```ts
     * const splitSlogan = magneticPull.prepare(slogan);
        const splitAvailability = charsSlideIn.prepare(availability);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: footer.current,
                start: '90% bottom'
            },
            delay: 0.1
        });

        tl.add(magneticPull.animate(splitSlogan));
        tl.add(charsSlideIn.animate(splitAvailability), "<0.5");
        * ```
    */
    prepare: (text, options?) => {
        const target = convertElements(text);

        const splitText = SplitText.create(target, { type: "chars" });

        gsap.set(splitText.chars, { 
            x: () => gsap.utils.random(-200, 200),
            y: () => gsap.utils.random(-200, 200),
            opacity: 0,
            rotation: () => gsap.utils.random(-90, 90),
            ...options
        });

        return splitText;
    },

    /**
     * Reusable GSAP character-level magnetic pull animation.
     * Use after `.prepare()`
     * @param text - target element returned by `.prepare()`
     * @returns `gsap.core.Timeline`
     * @example
     * ```ts
     * const splitSlogan = magneticPull.prepare(slogan);
        const splitAvailability = charsSlideIn.prepare(availability);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: footer.current,
                start: '90% bottom'
            },
            delay: 0.1
        });

        tl.add(magneticPull.animate(splitSlogan));
        tl.add(charsSlideIn.animate(splitAvailability), "<0.5");
     * ```
    */
    animate: (text, options?) => {

        const tl = gsap.timeline();

        tl.fromTo(text.chars, {
            x: () => gsap.utils.random(-50, 50),
            y: () => gsap.utils.random(-50, 50),
            opacity: 0,
            rotation: () => gsap.utils.random(-90, 90)
        }, {
            x: 0,
            y: 0,
            opacity: 1,
            rotation: 0,
            stagger: 0.02,
            duration: 1,
            ease: 'power3.out',
            ...options
        });

        return tl;
    }
} satisfies GSAPAnimation.SplitText;

export const spiralIn: GSAPAnimation.SplitText = {
    /**
     * Prepares the target element for the spiralIn animation by splitting the text and setting initial values.
     * @param text - target element of type El.Text
     * @returns SplitText instance
     * @example
     * ```ts
     * const splitText = spiralIn.prepare(text);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: footer.current,
                start: '90% bottom'
            },
            delay: 0.1
        });

        tl.add(spiralIn.animate(splitText));
        * ```
    */
    prepare: (text, options?) => {
        const target = convertElements(text);

        const splitText = SplitText.create(target, { type: "chars" });

        gsap.set(splitText.chars, { 
            x: () => gsap.utils.random(-200, 200),
            y: () => gsap.utils.random(-200, 200),
            opacity: 0,
            rotation: () => gsap.utils.random(-90, 90),
            ...options
        });

        return splitText;
    },

    /**
     * Reusable GSAP character-level spiral-in animation.
     * Use after `.prepare()`
     * @param text - target element returned by `.prepare()`
     * @returns `gsap.core.Timeline`
     * @example
     * ```ts
     * const splitText = spiralIn.prepare(text);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: '90% bottom'
            },
            delay: 0.1
        });

        tl.add(magneticPull.animate(splitText));
     * ```
    */
    animate: (text, options?) => {

        const tl = gsap.timeline();

        tl.fromTo(text.chars, {
            x: (i) => Math.cos(i) * 100,
            y: (i) => Math.sin(i) * 100,
            rotation: 360,
            scale: 0,
            opacity: 0,
        }, {
            x: 0,
            y: 0,
            opacity: 1,
            rotation: 0,
            scale: 1,
            stagger: 0.04,
            duration: 0.8,
            ease: 'power3.out',
            ...options
        });

        return tl;
    }
} satisfies GSAPAnimation.SplitText;

export const fadeUpWords: GSAPAnimation.SplitText = {
    /**
     * Prepares the target element for the fadeUpWords animation by splitting the text and setting initial values.
     * @param text - target element of type El.Text
     * @returns SplitText instance
     * @example
     * ```ts
     * const splitText = fadeUpWords.prepare(text);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: '90% bottom'
            },
            delay: 0.1
        });

        tl.add(fadeUpWords.animate(splitText));
        * ```
    */
    prepare: (text, options?) => {
        const target = convertElements(text);

        const splitText = SplitText.create(target, { type: "words" });

        gsap.set(splitText.words, { 
            y: 40,
            opacity: 0,
            ...options
        });

        return splitText;
    },

    /**
     * Reusable GSAP word-level fade-up animation.
     * Use after `.prepare()`
     * @param text - target element returned by `.prepare()`
     * @returns `gsap.core.Timeline`
     * @example
     * ```ts
     * const splitText = fadeUpWords.prepare(text);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: '90% bottom'
            },
            delay: 0.1
        });

        tl.add(fadeUpWords.animate(splitText));
     * ```
    */
    animate: (text, options?) => {

        const tl = gsap.timeline();

        tl.fromTo(text.words, {
            opacity: 0,
            y: 40
        }, {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power2.out',
            ...options
        });

        return tl;
    }
} satisfies GSAPAnimation.SplitText;

// D I V I D E R   A N I M A T I O N
/**
 * Animates the divider height.
 * @param target div ref
 * @param options additional options that can be added to gsap.from() method
 * @returns `gsap.core.Tween`
 */
export const drawDivider: GSAPAnimation = (target, options) => {
    const divider = convertElements(target);

    return gsap.from(divider, {
        height: 0,
        duration: 0.5,
        ease: 'power2.out',
        ...options
    });
}

// R E V E A L   A N I M A T I O N S
/**
 * Animates an element horizontally using clip path, grows from left to right.
 * @param target element ref
 * @param options additional options to be added to the animation
 * @returns `gsap.core.tween`
 */
export const revealRight: GSAPAnimation = (target, options) => {
    const convertedTarget = convertElements(target);

    return gsap.fromTo(convertedTarget, {
        clipPath: 'polygon(0% 0%, 0% 100%, 0% 0%, 0% 100%)'
    }, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1,
        ease: 'power4.out',
        ...options
    });
}

/**
 * Animates an element horizontally using clip path, grows from left to right.
 * @param target element ref
 * @param options additional options to be added to the animation
 * @returns `gsap.core.tween`
 */
export const revealLeft: GSAPAnimation = (target, options) => {
    const convertedTarget = convertElements(target);

    return gsap.fromTo(convertedTarget, {
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
    }, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 0.5,
        ease: 'power1.out',
        ...options
    });
}

/**
 * Animates an element vertically using clip path, grows from the top to the bottom.
 * @param target element ref
 * @param options additional options to be added to the animation
 * @returns `gsap.core.tween`
 */
export const revealDown: GSAPAnimation = (target, options) => {
    const convertedTarget = convertElements(target);

    return gsap.fromTo(convertedTarget, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
    }, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1,
        ease: 'power4.out',
        ...options
    });
}

/**
 * Animates an element vertically using clip path, grows from the bottom to the top.
 * @param target element ref
 * @param options additional options to be added to the animation
 * @returns `gsap.core.tween`
 */
export const revealUp: GSAPAnimation = (target, options) => {
    const convertedTarget = convertElements(target);

    return gsap.fromTo(convertedTarget, {
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
    }, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1,
        ease: 'power4.out',
        ...options
    });
}