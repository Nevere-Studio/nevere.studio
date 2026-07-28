import { SplitText as SplitTextInstance } from 'gsap/all';
import _SplitText from 'gsap/SplitText';

gsap.registerPlugin(SplitTextInstance);

// S I N G L E   E L E M E N T S
export type El<T extends HTMLElement = HTMLElement> = HTMLElement;

export namespace El {
  export type H    = HTMLHeadingElement;
  export type P    = HTMLParagraphElement;
  export type Li   = HTMLLIElement;
  export type Span = HTMLSpanElement;
  export type Text = HTMLHeadingElement | HTMLParagraphElement | HTMLLIElement | HTMLSpanElement | HTMLAnchorElement;

  export type Btn  = HTMLButtonElement;
  export type Div  = HTMLDivElement;
  export type A    = HTMLAnchorElement;
}

// E L E M E N T S
export type Elements<T extends HTMLElement | null = any> = 
    | Ref<T>
    | Ref<T>[]
    | React.RefObject<T[]>
    | T
    | (T | null)[];

// R E F S
export type Ref<T extends HTMLElement | null = HTMLElement | null> = React.RefObject<T>;

// I N T E R F A C E S
export interface Children {
    children?: Readonly<React.ReactNode>;
}

export interface Core extends Children {
    ref?:       Ref;
    className?: string;
    style?:     React.CSSProperties;
    id?:        string;
}

export interface LinkProps extends Children {
    href:       string;
    className?: string;
    active?:    boolean;
    visited?:   boolean;
    label?:     string;
    ref?:       React.Ref<El.A>;
    style?:     React.CSSProperties;
}

export interface LinkTemplate {
    href:   string;
    label:  string;
}

export interface DeviceSpecs {
    mobile:         boolean,
    lowPowerDevice: boolean,
    mounted:        boolean
}

// G S A P   A N I M A T I O N   T Y P E S
export type GSAPAnimation<T extends HTMLElement | null = any> = (
    el: Elements,
    options?: gsap.TweenVars
) => gsap.core.Tween | gsap.core.Timeline;

export namespace GSAPAnimation {
    export namespace SplitText {
        export type Prepare = (
            el: Ref<El.Text | null> | Ref<El.Text | null>[],
            options?: gsap.TweenVars
        ) => SplitTextInstance;

        export type Animate = (
            text: SplitTextInstance,
            options?: gsap.TweenVars
        ) => gsap.core.Tween | gsap.core.Timeline;
    }

    export type SplitText = {
        prepare: SplitText.Prepare;
        animate: SplitText.Animate;
    }
}

