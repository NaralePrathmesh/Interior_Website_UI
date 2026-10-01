'use client';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@/lib/theme';
import { StoreProvider } from '@/lib/store';
import Header from './Header';
import Footer from './Footer';
import Overlays from './Overlays';
import { Cursor, ScrollProgress } from './fx';

/** App-wide providers plus the public site's header, footer and overlays. */
export default function Providers({ children }) {
  const pathname = usePathname() || '/';
  const isAdmin = pathname.startsWith('/admin');
  return (
    <ThemeProvider>
      <StoreProvider>
        {!isAdmin && <ScrollProgress />}
        {!isAdmin && <Header />}
        <main id="view">{children}</main>
        {!isAdmin && <Footer />}
        <Overlays />
        <Cursor />
      </StoreProvider>
    </ThemeProvider>
  );
}
