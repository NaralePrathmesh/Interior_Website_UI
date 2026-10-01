'use client';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useSpring } from 'framer-motion';

/*
 * Motion layer.
 * GSAP + ScrollTrigger: hero timelines, word reveals, parallax, scroll reveals,
 *   image clip reveals, counters, timeline drawing, marquee, magnetic buttons, card tilt, cursor.
 * Framer Motion: page curtain, springs on hover/tap, modals, lightbox, toasts, FAQ, progress bar.
 * Everything is skipped for visitors who prefer reduced motion.
 */
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);
const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => typeof window !== 'undefined' && window.matchMedia('(hover:hover) and (pointer:fine)').matches;

/** An in-site link that is also a Framer Motion element (springs on hover/tap). */
export function MLink({ href, onClick, ...rest }) {
  const router = useRouter();
  return (
    <motion.a href={href} {...rest} onClick={(e) => {
      if (onClick) onClick(e);
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      router.push(href);
    }} />
  );
}
export const SPRING = { type: 'spring', stiffness: 340, damping: 24 };
export const lift = { whileHover: { y: -8 }, transition: SPRING };
export const press = { whileTap: { scale: 0.95 }, transition: { type: 'spring', stiffness: 500, damping: 18 } };

/** Runs the GSAP scroll & entrance effects for whatever page is on screen. */
export function PageFX() {
  const pathname = usePathname();
  useIso(() => {
    if (reducedMotion() || pathname.startsWith('/admin')) return;
    const fine = finePointer();
    const $$ = (s) => [...document.querySelectorAll(s)];
    const $ = (s) => document.querySelector(s);
    const offs = [];
    const on = (el, ev, fn) => { el.addEventListener(ev, fn); offs.push(() => el.removeEventListener(ev, fn)); };
    const delay = 0.45;

    const ctx = gsap.context(() => {
      gsap.defaults({ ease: 'power3.out', duration: 0.9 });

      /* hero */
      const hx = $('.hx');
      if (hx) {
        const tl = gsap.timeline({ delay });
        tl.from('.hx .bgimg', { scale: 1.18, duration: 2.2, ease: 'power2.out' }, 0)
          .from('.hx .eyebrow', { y: 18, opacity: 0, duration: 0.6 }, 0.15)
          .from('.hx h1 .wi', { yPercent: 115, rotate: 4, duration: 1.1, stagger: 0.055, ease: 'power4.out' }, 0.25)
          .from('.hx .lede', { y: 26, opacity: 0 }, '-=.7')
          .from('.hx .inner .row .btn', { y: 22, opacity: 0, stagger: 0.1 }, '-=.65')
          .from('.leadcard', { x: 70, opacity: 0, duration: 1.1 }, '-=1')
          .from('.leadcard > *', { y: 14, opacity: 0, stagger: 0.05, duration: 0.5 }, '-=.7')
          .from('.stats-g', { y: 40, opacity: 0 }, '-=.8');
        gsap.to('.hx .bgimg', { yPercent: 16, ease: 'none', scrollTrigger: { trigger: hx, start: 'top top', end: 'bottom top', scrub: true } });
        gsap.to('.hx .inner', { yPercent: -12, opacity: 0.35, ease: 'none', scrollTrigger: { trigger: hx, start: 'top top', end: 'bottom top', scrub: true } });
      }

      /* page banner */
      const pb = $('.pban');
      if (pb) {
        gsap.timeline({ delay })
          .from('.pban .bgimg', { scale: 1.15, duration: 1.8, ease: 'power2.out' }, 0)
          .from('.pban .crumb', { y: 14, opacity: 0, duration: 0.5 }, 0.1)
          .from('.pban h1 .wi', { yPercent: 115, duration: 1, stagger: 0.06, ease: 'power4.out' }, 0.2)
          .from('.pban .lede', { y: 20, opacity: 0 }, '-=.6');
        gsap.to('.pban .bgimg', { yPercent: 20, ease: 'none', scrollTrigger: { trigger: pb, start: 'top top', end: 'bottom top', scrub: true } });
      }

      /* background photos drift slower than the page */
      $$('.bgsec > .bgimg, .calc .out-bg').forEach((bg) => {
        gsap.fromTo(bg, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: bg.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
      });

      /* scroll reveals */
      const reveal = (sel, from) => {
        const els = $$(sel);
        if (!els.length) return;
        gsap.set(els, from);
        const show = (b) => gsap.to(b, { y: 0, opacity: 1, stagger: 0.08, duration: 0.95, overwrite: true, clearProps: 'transform,opacity' });
        ScrollTrigger.batch(els, { start: 'top 90%', once: true, onEnter: show, onEnterBack: show });
      };
      reveal('.sec-head > .stack > *, .sec-head > .btn', { y: 40, opacity: 0 });
      reveal('.strip .s, .scard, .svc, .pkg, .quote, .why2 > div, .tl li, .faq details, .promises li, .masonry .mi, .grid > .pc, .bento > .pc', { y: 60, opacity: 0 });
      reveal('.split > .stack > *, .tfeat > .stack > *, .ctaimg .in > *, .svc-row .stack > *, .contact-grid > .stack > *, .stats > div, .calc, dl.spec, footer.site .cols > *', { y: 36, opacity: 0 });
      reveal('main .toolbar', { y: 16, opacity: 0 });

      /* image clip reveals */
      $$('.duo .a, .duo .b, .tall, .svc-row .frame, .ctaimg, .map, .faq-img, .studio-img').forEach((el) => {
        const img = el.querySelector('img');
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
        tl.fromTo(el, { clipPath: 'inset(14% 14% 14% 14% round 14px)' }, { clipPath: 'inset(0% 0% 0% 0% round 12px)', duration: 1.5, ease: 'expo.out', clearProps: 'clipPath' });
        if (img) tl.fromTo(img, { scale: 1.28 }, { scale: 1, duration: 1.8, ease: 'expo.out', clearProps: 'transform' }, 0);
      });

      /* counters */
      $$('[data-count]').forEach((el) => {
        const m = String(el.dataset.count).trim().match(/^([^\d]*)([\d,.]+)(.*)$/);
        if (!m) return;
        const target = parseFloat(m[2].replace(/,/g, ''));
        if (!isFinite(target)) return;
        const dec = (m[2].split('.')[1] || '').length;
        const fmt = (v) => m[1] + (dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-IN')) + m[3];
        const o = { v: 0 };
        el.textContent = fmt(0);
        gsap.to(o, { v: target, duration: 2.2, ease: 'power2.out', onUpdate: () => { el.textContent = fmt(o.v); }, onComplete: () => { el.textContent = el.dataset.count; }, scrollTrigger: { trigger: el, start: 'top 95%', once: true } });
      });

      /* process timeline draws itself */
      if ($('.tl')) {
        gsap.fromTo('.tl', { '--line': 0 }, { '--line': 1, ease: 'none', scrollTrigger: { trigger: '.tl', start: 'top 85%', end: 'bottom 60%', scrub: true } });
        gsap.from('.tl .dot', { scale: 0, duration: 0.6, stagger: 0.12, ease: 'back.out(2)', scrollTrigger: { trigger: '.tl', start: 'top 80%', once: true } });
      }

      /* materials marquee reacts to scroll speed and direction */
      const tr = $('.marq .track');
      if (tr) {
        tr.style.animation = 'none';
        const tw = gsap.to(tr, { xPercent: -50, duration: 42, ease: 'none', repeat: -1 });
        tw.totalTime(tw.duration() * 500);
        ScrollTrigger.create({
          trigger: tr, start: 'top bottom', end: 'bottom top',
          onUpdate: (s) => {
            const d = s.direction || 1;
            const b = Math.min(Math.abs(s.getVelocity()) / 350, 5);
            gsap.to(tw, { timeScale: d * (1 + b), duration: 0.2, overwrite: true, onComplete: () => gsap.to(tw, { timeScale: d, duration: 1 }) });
          },
        });
      }

      if (fine) {
        /* magnetic buttons */
        $$('.cta-top, .btn.primary, .circ').forEach((el) => {
          const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
          const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
          on(el, 'pointermove', (e) => { const r = el.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * 0.28); yTo((e.clientY - r.top - r.height / 2) * 0.35); });
          on(el, 'pointerleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1,.4)' }));
        });
        /* 3D tilt on project cards */
        $$('.bento > .pc, .grid > .pc').forEach((el) => {
          on(el, 'pointermove', (e) => { const r = el.getBoundingClientRect(); gsap.to(el, { rotationY: ((e.clientX - r.left) / r.width - 0.5) * 7, rotationX: -((e.clientY - r.top) / r.height - 0.5) * 7, transformPerspective: 1000, duration: 0.5, ease: 'power2.out' }); });
          on(el, 'pointerleave', () => gsap.to(el, { rotationX: 0, rotationY: 0, duration: 1, ease: 'elastic.out(1,.5)' }));
        });
      }
    });

    let t = 0;
    const refresh = () => { clearTimeout(t); t = setTimeout(() => ScrollTrigger.refresh(), 150); };
    $$('img').forEach((img) => { if (!img.complete) on(img, 'load', refresh); });
    refresh();

    return () => { clearTimeout(t); offs.forEach((f) => f()); ctx.revert(); };
  }, [pathname]);
  return null;
}

/** Gold-free, monochrome cursor ring that grows into a "View" badge over photos. */
export function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    if (reducedMotion() || !finePointer()) return;
    const d = dot.current, r = ring.current;
    const dx = gsap.quickTo(d, 'x', { duration: 0.12, ease: 'power3' });
    const dy = gsap.quickTo(d, 'y', { duration: 0.12, ease: 'power3' });
    const rx = gsap.quickTo(r, 'x', { duration: 0.45, ease: 'power3' });
    const ry = gsap.quickTo(r, 'y', { duration: 0.45, ease: 'power3' });
    const move = (e) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); document.documentElement.classList.add('fx-cursor'); };
    const leave = () => document.documentElement.classList.remove('fx-cursor');
    const over = (e) => {
      const v = e.target.closest('[data-proj],.mi,button.frame,.ddp,[data-design]');
      const l = e.target.closest('a,button,input,select,textarea,summary,label');
      r.classList.toggle('view', !!v);
      r.classList.toggle('link', !v && !!l);
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    document.addEventListener('pointerover', over);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      document.removeEventListener('pointerover', over);
    };
  }, []);
  return (
    <>
      <div className="fx-ring" ref={ring} aria-hidden="true"><span>View</span></div>
      <div className="fx-dot" ref={dot} aria-hidden="true" />
    </>
  );
}

/** Thin progress line at the very top of the window (Framer Motion scroll + spring). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return <motion.div className="fx-progress" style={{ scaleX }} aria-hidden="true" />;
}
