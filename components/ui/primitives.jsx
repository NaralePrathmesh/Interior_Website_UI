'use client';
import { Fragment } from 'react';
import { photoURL, splitEmph } from '@/lib/utils';

export const ICON = {
  home: '<path d="M4 20V10l8-6 8 6v10h-5v-6H9v6z"/>',
  office: '<rect x="4" y="3" width="16" height="18"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M11 21v-3h2v3"/>',
  kitchen: '<rect x="3" y="11" width="18" height="10"/><path d="M3 15h18M8 11V4h8v7M12 15v6"/>',
  sofa: '<path d="M4 12V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M2 18v-5a2 2 0 0 1 4 0v2h12v-2a2 2 0 0 1 4 0v5zM5 18v2M19 18v2"/>',
  bed: '<path d="M3 19V6M3 14h18v5M21 14v-2a3 3 0 0 0-3-3h-8v5M6 11a1.5 1.5 0 1 0 0-.01"/>',
  cube: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5"/>',
  hammer: '<path d="M14 4l6 6-3 3-6-6zM11 7l-8 8 3 3 8-8"/>',
  bath: '<path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM6 12V6a2 2 0 0 1 4 0M7 19l-1 2M17 19l1 2"/>',
  ceiling: '<path d="M3 6h18M6 6v4h12V6M12 10v4M9 17a3 3 0 0 0 6 0z"/>',
  chair: '<path d="M7 3h10v8H7zM6 11h12v3H6zM7 14v7M17 14v7"/>',
};

const SOC = {
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
  facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
  youtube: '<rect x="2.5" y="6" width="19" height="12" rx="4"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
};
const SMALL = {
  pin: '<path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  ...SOC,
};

export function Icon({ name, className = 'ico', size }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICON[name] || ICON.cube }} />
  );
}
export function Ico({ name, size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: SMALL[name] || '' }} />
  );
}
/* Silver-white logo (client supplied), for dark backgrounds. `auto` shows the gold
   logo instead where the background is light (footer/admin in the light theme).
   Other versions in public/assets/images: logo.png (gold), logo-white.png,
   logo-gold-white-border.png. */
export function Logo({ variant = 'white' }) {
  const img = (src, cls, alt) => <img className={`logo ${cls}`} src={src} alt={alt} width={640} height={190} />;
  const white = img('/assets/images/logo-silver.png', variant === 'auto' ? 'logo-dark-only' : '', 'Diamond Spaces');
  if (variant !== 'auto') return white;
  return <>{white}{img('/assets/images/logo.png', 'logo-light-only', '')}</>;
}

export function BrandMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
      <rect x="1.5" y="1.5" width="27" height="27" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="9" width="12" height="12" fill="var(--accent)" />
      <path d="M1.5 15H9M21 15h7.5M15 1.5V9M15 21v7.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
export function Arrow() {
  return (
    <svg className="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  );
}
export function Caret() {
  return <svg className="caret" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}

/** Architectural floor-plan drawing, used when a "Floor Plan" design has no image. */
function planSVG(label, variant) {
  const esc = (v) => String(v ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const L = [['LIVING', '5.4 × 4.2'], ['BED 1', '3.6 × 3.3'], ['BED 2', '3.3 × 3.0'], ['KITCHEN', '2.7 × 3.0'], ['BATH', '2.1 × 1.5']];
  let s = `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(label)}"><rect width="400" height="300" fill="#F1F1F0"/>`;
  for (let x = 0; x < 400; x += 20) s += `<line x1="${x}" y1="0" x2="${x}" y2="300" stroke="#A8A8A8" stroke-opacity=".25"/>`;
  for (let y = 0; y < 300; y += 20) s += `<line x1="0" y1="${y}" x2="400" y2="${y}" stroke="#A8A8A8" stroke-opacity=".25"/>`;
  const W = '#1A1A1A';
  const vx = variant % 2 ? 220 : 200;
  s += `<rect x="40" y="36" width="320" height="220" fill="#FAFAFA" stroke="${W}" stroke-width="6"/>`;
  s += `<line x1="${vx}" y1="36" x2="${vx}" y2="256" stroke="${W}" stroke-width="4"/><line x1="${vx}" y1="146" x2="360" y2="146" stroke="${W}" stroke-width="4"/>
 <line x1="40" y1="176" x2="${vx}" y2="176" stroke="${W}" stroke-width="4"/><line x1="130" y1="176" x2="130" y2="256" stroke="${W}" stroke-width="4"/>
 <rect x="${vx - 2}" y="80" width="4" height="30" fill="#FAFAFA"/><path d="M${vx} 80 A30 30 0 0 1 ${vx + 30} 110" fill="none" stroke="${W}" stroke-width="1"/>
 <rect x="${vx + 40}" y="144" width="30" height="4" fill="#FAFAFA"/><path d="M${vx + 40} 146 A30 30 0 0 0 ${vx + 70} 176" fill="none" stroke="${W}" stroke-width="1"/>
 <rect x="150" y="174" width="30" height="4" fill="#FAFAFA"/>
 <rect x="360" y="60" width="12" height="190" fill="none" stroke="${W}" stroke-width="1.5" stroke-dasharray="4 3"/>`;
  const txt = (x, y, a, b) => `<text x="${x}" y="${y}" font-family="Inter, sans-serif" font-size="10" fill="${W}" text-anchor="middle" letter-spacing="1">${a}</text><text x="${x}" y="${y + 13}" font-family="Inter, sans-serif" font-size="9" fill="#5C5C5C" text-anchor="middle">${b}</text>`;
  s += txt((40 + vx) / 2, 104, ...L[0]) + txt((vx + 360) / 2, 90, ...L[1]) + txt((vx + 360) / 2, 200, ...L[2]) + txt(85, 214, ...L[3]) + txt((130 + vx) / 2, 214, ...L[4]);
  s += `<line x1="40" y1="20" x2="360" y2="20" stroke="${W}" stroke-width=".8"/><line x1="40" y1="14" x2="40" y2="26" stroke="${W}"/><line x1="360" y1="14" x2="360" y2="26" stroke="${W}"/><rect x="176" y="13" width="48" height="14" fill="#F1F1F0"/><text x="200" y="24" font-family="Inter, sans-serif" font-size="9" fill="${W}" text-anchor="middle">11 250</text>`;
  s += `<g transform="translate(378 272)"><circle r="10" fill="none" stroke="${W}"/><path d="M0 -8 L4 4 L0 1 L-4 4 Z" fill="${W}"/></g>`;
  return s + '</svg>';
}
export function Plan({ label = 'Floor plan', variant = 1 }) {
  return <span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: planSVG(label, variant) }} />;
}

export function Photo({ it, label, w = 1000, eager = false }) {
  const src = it && it.image;
  const alt = label || it?.name || it?.title || 'Interior photograph';
  if (it && (it.dtype === 'Floor Plan' || it.kind === 'plan') && !src) return <Plan label={label || alt} />;
  if (!src) {
    return (
      <span className="nophoto" role="img" aria-label="No photo yet">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M4 7h3l2-3h6l2 3h3v13H4z" /><circle cx="12" cy="13" r="4" /></svg>
        Add a photo in the admin panel
      </span>
    );
  }
  const uns = /^https:\/\/images\.unsplash\.com\//.test(src);
  const half = Math.round(w / 2);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photoURL(src, w)}
      srcSet={uns ? `${photoURL(src, half)} ${half}w, ${photoURL(src, w)} ${w}w, ${photoURL(src, w * 2)} ${w * 2}w` : undefined}
      sizes={uns ? `(max-width:700px) 100vw, ${w}px` : undefined}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      onError={(e) => e.currentTarget.classList.add('broken')}
    />
  );
}

/** Heading text with the last words highlighted in the accent colour — the site's signature treatment. */
export function Emph({ text }) {
  const [a, b] = splitEmph(text);
  if (!b) return <>{a}</>;
  return <>{a} <em>{b}</em></>;
}

/** Same treatment, but every word wrapped for the GSAP word-by-word reveal. */
export function SplitHeading({ text }) {
  const [a, b] = splitEmph(text);
  const words = (str) => str.split(/\s+/).filter(Boolean).map((w, i, arr) => (
    <Fragment key={i}><span className="w"><span className="wi">{w}</span></span>{i < arr.length - 1 ? ' ' : ''}</Fragment>
  ));
  return <>{words(a)}{b ? <>{' '}<em>{words(b)}</em></> : null}</>;
}

/** A number the page effects count up from zero when it scrolls into view. */
export function Count({ value, className }) {
  return <b className={className} data-count={String(value)}>{value}</b>;
}

export function Stars({ n }) {
  return <span className="stars" aria-label={`${n} out of 5`}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>;
}
