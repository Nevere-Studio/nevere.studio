'use client';

import { useState, useEffect, useRef } from 'react';
import { DeviceSpecs } from '@/utils/types';
import { Elements } from './types';
import { useTranslations } from 'next-intl';


// E L E M E N T S   C O N V E R S I O N
/**
 * Checks if the item is a valid HTMLElement.
 * @param item any
 * @returns boolean
 */
export function isHTMLElement(item: any): item is HTMLElement {
    return item != null && typeof item === 'object' && 'nodeType' in item;
}

/**
 * Checks if the item is ref object
 * @param item any
 * @returns boolean
 */
export function isRef(item: any): item is React.RefObject<any> {
    return typeof item === 'object' && 'current' in item;
}

/**
 * Converts the elements to a uniform formula which is an array of DOM elements; also filters nulls if present.
 * @param el element, ref or array of refs/elements
 * @returns HTMLElement[]
 */
export function convertElements(el: Elements): HTMLElement[] {
    if (!el) return [];

    // Case 1: Ref object (Ref<any>)
    if (isRef(el)) {
        const current = el.current;
        if (!current) return [];

        // Case 1a: .current is an array (Ref<T[]>)
        if (Array.isArray(current)) {
            return current
                .map(item => {
                    if (!item) return null;
                    if (isRef(item)) return item.current;
                    else return item;
                })
                .filter(isHTMLElement);
        }

        // Case 1b: .current is a single element
        else return isHTMLElement(current) ? [current] : [];
    }

    // Case 2: direct array (Ref<T>[])
    if (Array.isArray(el)) {
        return el
            .map(item => {
                if (!item) return null;
                if (typeof item === 'object' && 'current' in item) return item.current;
                return item;
            })
            .filter(isHTMLElement);
    }

    // Case 3: single raw HTMLElement or invalid element
    else return isHTMLElement(el) ? [el] : [];
}


// D E V I C E   S P E C S
/**
 * Checks the device specification.
 * The main purpose is to skip rendering heavy components like shaders on low-power devices.
 * @returns an object of properties:
 * - mobile: `boolean` - checks if the device is a mobile device;
 * - lowPowerDevice: `boolean` - checks if the device as low-powere (by core quantity, RAM, etc.);
 * - mounted: `boolean`- checks if the page was mounted
 * @example
 * ```ts
 * const specs = useDeviceSpecs();
 * return (
 *  { specs.lowPowerDevice ? '' : <HeavyComponent /> }
 * );
 * ```
 */
export function useDeviceSpecs(): DeviceSpecs {
    const [specs, setSpecs] = useState<DeviceSpecs>({
        mobile:         false,
        lowPowerDevice: false,
        mounted:        false
    });

    useEffect(() => {
        const nav = navigator as any;

        // 1. Basic Mobile Check
        const mobile =
        /Mobi|Android|iPhone/i.test(navigator.userAgent) ||
        (window.matchMedia('(pointer: coarse)').matches);

        // 2. Hardware Resource Checks
        const lowRAM = nav.deviceMemory && nav.deviceMemory <= 4;
        const lowCPU = nav.hardwareConcurrency && nav.hardwareConcurrency <= 4;

        // 3. Connection Data-Saver Check
        const saveDataActive = nav.connection?.saveData === true;
        const lowPowerDevice = !!(lowRAM || lowCPU || saveDataActive);

        setSpecs({
            mobile,
            lowPowerDevice,
            mounted: true,
        });
    }, []);

    return specs;
}


// I N T E R S E C T I O N   O B S E R V E R
/**
 * Checks if the component entered the viewport.
 * @param ratio ratio of the component that needs to enter the viewport for the hook to return `true`
 * @param options additional, optional options of the intersectionObserver
 * @returns array of an element observed and boolean stating the visibility ([Ref<any>, boolean])
 * @example
 * ```ts
 * const [footer, isFooterVisible] = useIsVisible(0.75);
 * return (
 *  <footer ref={footer}>
 *      <p style={{ transition: '1s opacity ease-out', opacity: isFooterVisible ? 1 : 0 }}>Animated paragraph</p>
 *  </footer>
 * );
 * ```
 */
export function useIsVisible<T extends HTMLElement = HTMLElement>(ratio?: number, options?: IntersectionObserverInit): [React.RefObject<T | null>, boolean] {
    const [isVisible, setIsVisible] = useState(false);
    const elRef = useRef<T | null>(null);
    if (!ratio) ratio = 1.0;

    useEffect(() => {
        if (!elRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting && entry.intersectionRatio >= ratio);
            }, {
                threshold: ratio,
                ...options
            }
        );

        observer.observe(elRef.current);

        return () => {
            if (elRef.current) observer.unobserve(elRef.current);
        }
    }, [ratio, options]);

    return [elRef, isVisible];
}

// R E F S   C O M B I N A T O R
/**
 * Combines many refs, creating one, uniform ref.
 * @param refs any number of refs
 * @returns void
 * 
 * @example
 * ```ts
 * const internalRef = useRef<HTMLDivElement>(null);
 * const combinedRef = useCombinedRefs(internalRef, externalRef);
 * 
 * return <div ref={combinedRef} />;
 * ```
 */
export function useCombinedRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
    return useRef((node: T) => {
        refs.forEach((ref) => {
            if (typeof ref === 'function') {
                ref(node);
            } else if (ref && typeof ref === 'object') {
                (ref as React.RefObject<T | null>).current = node;
            }
        });
    }).current;
}

// C S S   H E L P E R S
/**
 * Creates a polygon string for CSS clip-path property based on the key and offset provided.
 * @param key 'full' | 'left' | 'right' | 'top' | 'bottom' | [number, number][]; 'full' means that the polygon will cover the whole element, other keys are intended for animations - they will not cover the element at all. You can also specify an array of coordinates in percentage.
 * @param offset number; determines the offset of the points (e.g. 5 means that points will be 5% outside of the element)
 * @returns polygon string for CSS clip-path property
 */
export function polygon(key: 'full' | 'top' | 'bottom' | 'left' | 'right' | [number, number][], offset: number = 0): string {
    let polygon = '';

    switch (key) {
        case 'full':
            return `polygon(${0 - offset}% ${0 - offset}%, ${100 + offset}% ${0 - offset}%, ${100 + offset}% ${100 + offset}%, ${0 - offset}% ${100 + offset}%)`;
        case 'top':
            return `polygon(${0 - offset}% ${0 - offset}%, ${100 + offset}% ${0 - offset}%, ${100 + offset}% ${0 - offset}%, ${0 - offset}% ${0 - offset}%)`;
        case 'bottom':
            return `polygon(${0 - offset}% ${100 + offset}%, ${100 + offset}% ${100 + offset}%, ${100 + offset}% ${100 + offset}%, ${0 - offset}% ${100 + offset}%)`;
        case 'left':
            return `polygon(${0 - offset}% ${0 - offset}%, ${0 - offset}% ${0 - offset}%, ${0 - offset}% ${100 + offset}%, ${0 - offset}% ${100 + offset}%)`;
        case 'right':
            return `polygon(${100 + offset}% ${0 - offset}%, ${100 + offset}% ${0 - offset}%, ${100 + offset}% ${100 + offset}%, ${100 + offset}% ${100 + offset}%)`;
        default:
            return `polygon(${key[0][0]}% ${key[0][1]}%, ${key[1][0]}% ${key[1][1]}%, ${key[2][0]}% ${key[2][1]}%, ${key[3][0]}% ${key[3][1]}%)`
    }
}