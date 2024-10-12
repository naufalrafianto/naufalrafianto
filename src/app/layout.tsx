import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import NavMenu from '@/components/layout/Navbar/NavMenu';
import { Footer } from '@/components/layout/Footer';
import Template from '@/components/layout/Template';

const font = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Muhammad Naufal Rafianto',
    template: '%s | naufalrafianto.dev',
  },
  alternates: {
    canonical: 'https://www.naufalrafianto.dev',
  },
  description:
    'Personal website and blog by Muhammad Naufal Rafianto. Showcase of my projects, and some of my thoughts about technology.',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Muhammad Naufal Rafianto (mnauff)',
    siteName: 'Muhammad Naufal Rafianto (mrnaufal)',
    description:
      'Personal website and blog by Muhammad Naufal Rafianto. Showcase of my projects, and some of my thoughts about technology.',
  },
  metadataBase: new URL('https://naufalrafianto.dev'),
  icons: {
    icon: [
      {
        url: '/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon/favicon.ico',
        sizes: 'any',
      },
    ],
    apple: {
      url: '/favicon/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <NavMenu />
        <Template>
          {children}
          <Footer />
        </Template>
      </body>
    </html>
  );
}
