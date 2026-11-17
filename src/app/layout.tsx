import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { getSiteSettings } from '@/lib/data-store';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cozly.in'),
  title: {
    default: 'COZLY by Zoffaro IN | Crafted for every comfort.',
    template: '%s | COZLY by Zoffaro IN',
  },
  description:
    'COZLY by Zoffaro IN — Crafted for every comfort. Artisanal solid timber and bespoke upholstered sofas designed with Scandinavian minimalism. Direct white-glove delivery across South India with WhatsApp ordering.',
  keywords: [
    'COZLY by Zoffaro IN',
    'Zoffaro IN',
    'cozly.in',
    'sofa manufacturer Kerala',
    'teak wood sofa Kottayam',
    'Erattupetta sofa works',
    'custom sofa Bangalore',
    'L shape sofa Kochi',
    'sofa cum bed Kerala',
    'handcrafted furniture India',
  ],
  authors: [{ name: 'COZLY by Zoffaro IN' }],
  openGraph: {
    title: 'COZLY by Zoffaro IN | Crafted for every comfort.',
    description:
      'Solid timber frames & bespoke upholstered sofas crafted with Scandinavian minimalism. Direct factory transparent pricing with WhatsApp ordering.',
    url: 'https://cozly.in',
    siteName: 'COZLY by Zoffaro IN',
    images: [
      {
        url: '/brand/logo-black.svg',
        width: 1200,
        height: 630,
        alt: 'COZLY by Zoffaro IN',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Google Analytics Placeholder */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              // gtag('js', new Date());
              // gtag('config', 'G-PLACEHOLDER');
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-brand-charcoal min-h-screen flex flex-col selection:bg-black selection:text-white">
        <CartProvider>
          {settings.announcementBar?.enabled && (
            <AnnouncementBar
              text={settings.announcementBar.text}
              link={settings.announcementBar.link}
            />
          )}
          <Header
            whatsappNumber={settings.whatsappNumber}
            phone={settings.phone}
          />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer settings={settings} />
          <CartDrawer whatsappNumber={settings.whatsappNumber} />
          <FloatingWhatsApp whatsappNumber={settings.whatsappNumber} />
          <MobileBottomNav whatsappNumber={settings.whatsappNumber} />
        </CartProvider>
      </body>
    </html>
  );
}
