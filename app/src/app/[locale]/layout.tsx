import type { Metadata } from "next";
import "../globals.scss";
import { Google_Sans_Code } from "next/font/google";
import localFont from 'next/font/local';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { MetadataParams } from '@/i18n/types';
import { readMetadata, checkLocale } from '@/i18n/functions';
import { routing } from '@/i18n/routing';
import LoadingPage from '@/components/loading/LoadingPage';

import dynamic from 'next/dynamic';
const Navbar             = dynamic(() => import('@/components/Navbar/Navbar'));
const TransitionProvider = dynamic(() => import('@/components/transitions/TransitionProvider'));

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const generalSans = localFont({
  src: '../../../public/fonts/GeneralSans-Variable.woff2',
  variable: '--generalSans'
});

const nohemi = localFont({
  src: '../../../public/fonts/Nohemi-VF.ttf',
  variable: '--nohemi'
});

const googleCode = Google_Sans_Code({
  subsets:  ["latin"],
  variable: "--googleCode"
});

export async function generateMetadata({ params }: MetadataParams): Promise<Metadata> {
  const { locale } = await params;
  checkLocale(locale);
  return readMetadata('home');
}

async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  checkLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className={`${googleCode.variable} ${generalSans.variable} ${nohemi.variable}`}>
      <body>
        <LoadingPage>
          <NextIntlClientProvider messages={messages}>
            <TransitionProvider>
              <Navbar />
              {children}
            </TransitionProvider>
          </NextIntlClientProvider>
        </LoadingPage>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

export default RootLayout;