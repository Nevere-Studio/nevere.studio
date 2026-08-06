import type { Children } from '@/utils/types';
import Footer from '@/components/Footer/Footer';
import type { Metadata } from 'next';
import type { MetadataParams } from '@/i18n/types';
import { readMetadata, checkLocale } from '@/i18n/functions';

import dynamic from 'next/dynamic';
const ScrollSmootherWrapper = dynamic(() => import('@/utils/gsap/ScrollSmoother'));

export async function generateMetadata({ params }: MetadataParams): Promise<Metadata> {
    const { locale } = await params;
    checkLocale(locale);
    return readMetadata('privacy_policy');
}

function Layout({ children }: Children) {
    return (
        <ScrollSmootherWrapper>
            <main>
                { children }
            </main>
            <Footer />
        </ScrollSmootherWrapper>
    );
}

export default Layout;