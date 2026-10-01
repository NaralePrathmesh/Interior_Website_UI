import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import Providers from '@/components/Providers';
import { themeInitScript } from '@/lib/themeScript';

// Headings: Poppins. Body, labels and numbers: Inter. No italics anywhere.
const display = Poppins({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display', display: 'swap' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-body', display: 'swap' });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Aangan Studio | Interior Designers in Pune', template: '%s | Aangan Studio' },
  description: 'Residential and commercial interior design in Pune. Modular kitchens, 3D design and turnkey execution.',
  keywords: ['interior designer pune', 'modular kitchen pune', '2bhk interior', 'villa interior'],
  openGraph: {
    title: 'Aangan Studio | Interior Designers in Pune',
    description: 'Homes, offices and kitchens designed and delivered across Pune.',
    images: ['https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=80'],
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3A281C' },
    { media: '(prefers-color-scheme: dark)', color: '#0E0A08' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
