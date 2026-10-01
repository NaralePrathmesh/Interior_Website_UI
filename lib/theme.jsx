'use client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { THEME_KEY } from './themeScript';

/*
 * Walnut & Linen theme with a light / dark switch.
 * The inline script in app/layout.jsx (lib/themeScript.js) sets data-theme
 * before the first paint, so there is no flash. The site opens in the
 * light (off-white) theme; a visitor's dark-mode choice is remembered.
 */

const ThemeCtx = createContext({ theme: 'light', toggle: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  }, []);
  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
      return next;
    });
  }, []);
  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);
