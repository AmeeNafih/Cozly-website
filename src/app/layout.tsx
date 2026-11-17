import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import FloatingWhatsApp from '@/components/common/FloatingWhatsApp';
import { getSiteSettings } from '@/lib/data-store';

export const metadata: Metadata = {
  metadataBase: new URL('https://cozly.in'),
  title: {
    default: 'COZLY | Mastercrafted Teak & Upholstered Sofas | Erattupetta, Kerala',
    template: '%s | COZLY Sofa Atelier',
  },
  description:
    'Artisanal wooden-frame and premium upholstered sofas handcrafted in Erattupetta, Kottayam, Kerala. Direct factory delivery across Kerala, Tamil Nadu, and Bangalore. Order seamlessly on WhatsApp.',
  keywords: [
    'sofa manufacturer Kerala',
    'teak wood sofa Kottayam',
    'Erattupetta sofa works',
    'custom sofa Bangalore',
    'L shape sofa Kochi',
    'sofa cum bed Kerala',
    'Tamil Nadu sofa delivery',
    'handcrafted furniture India',
    'IKEA style sofa Kerala',
    'COZLY sofas',
  ],
  authors: [{ name: 'COZLY Sofa Atelier' }],
  openGraph: {
    title: 'COZLY | Mastercrafted Sofas Direct from Kerala Atelier',
    description:
      'Solid Teakwood & bespoke upholstered sofas crafted in Erattupetta, Kottayam. Direct factory transparent pricing with WhatsApp ordering.',
    url: 'https://cozly.in',
    siteName: 'COZLY',
    images: [
      {
        url: '/images/hero/hero-atelier.svg',
        width: 1200,
        height: 630,
        alt: 'COZLY Sofa Atelier Erattupetta',
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
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap"
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
      <body className="font-sans antialiased bg-brand-surface text-brand-charcoal min-h-screen flex flex-col selection:bg-brand-accent/20 selection:text-brand-primary">
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
          <main className="flex-1">{children}</main>
          <Footer settings={settings} />
          <CartDrawer whatsappNumber={settings.whatsappNumber} />
          <FloatingWhatsApp whatsappNumber={settings.whatsappNumber} />
        </CartProvider>
      </body>
    </html>
  );
}
