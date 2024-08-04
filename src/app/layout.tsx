import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Layout } from '@/components/layout';
import NavMenu from '@/components/layout/Navbar/NavMenu';

const font = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'naufalrafianto.dev',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Layout>
          <NavMenu />
          {children}
        </Layout>
      </body>
    </html>
  );
}
