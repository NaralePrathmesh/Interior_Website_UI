'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { useStore } from '@/lib/store';
import { useTheme } from '@/lib/theme';
import { pub, slug } from '@/lib/utils';
import { Arrow, Logo, Caret, Icon, Ico, Photo } from './ui/primitives';

export function ThemeButton({ className = '' }) {
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';
  return (
    <button type="button" className={`theme-btn ${className}`} onClick={toggle} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} title={dark ? 'Light mode' : 'Dark mode'}>
      <Ico name={dark ? 'sun' : 'moon'} size={18} />
    </button>
  );
}

export default function Header() {
  const { S, db, setUi } = useStore();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const nav = useRef(null);
  const page = pathname === '/' ? 'home' : pathname.split('/')[1];
  const svcs = pub(db.services);
  const projs = pub(db.projects);
  const portfolio = ['projects', 'gallery', 'designs'].includes(page);
  const cats = ['2 BHK', '3 BHK', 'Villa', 'Office', 'Modular Kitchen'].filter((c) => projs.some((p) => p.category === c));
  const promo = projs.find((p) => p.featured) || projs[0];

  useEffect(() => {
    const upd = () => setScrolled(window.scrollY > 30);
    upd();
    window.addEventListener('scroll', upd, { passive: true });
    return () => window.removeEventListener('scroll', upd);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open && nav.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.from(nav.current.querySelectorAll('.nav-item, .drawer-foot'), { y: 30, opacity: 0, stagger: 0.05, duration: 0.55, delay: 0.1, ease: 'power3.out', clearProps: 'transform,opacity' });
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const goService = (name) => (e) => { e.preventDefault(); setUi({ svcFocus: slug(name) }); setOpen(false); router.push('/services'); };
  const goCat = (cat) => () => { setUi({ projFilter: cat, projQ: '' }); setOpen(false); };
  const Simple = ({ k, href, label }) => (
    <div className="nav-item"><Link className={`nl ${page === k ? 'on' : ''}`} href={href} aria-current={page === k ? 'page' : undefined}>{label}</Link></div>
  );

  return (
    <header className={`site ${scrolled ? 'scrolled' : ''}`}>
      <div className="util"><div className="wrap util-in">
        <span className="u-item"><Ico name="pin" />Free site visit across Pune &amp; PCMC</span>
        <span className="u-right">
          <span className="u-item hide-md"><Ico name="clock" />{S.hours}</span>
          <span className="u-item hide-sm" style={{ userSelect: 'all' }}><Ico name="mail" />{S.email}</span>
          <span className="u-soc">{['instagram', 'facebook', 'youtube', 'linkedin'].map((k) => (
            <a key={k} href={S[k]} target="_blank" rel="noopener noreferrer" aria-label={k}><Ico name={k} size={15} /></a>
          ))}</span>
        </span>
      </div></div>

      <div className="wrap bar">
        <Link className="brand" href="/" aria-label="Diamond Spaces home">
          <Logo />
        </Link>

        <nav className={`main ${open ? 'open' : ''}`} id="mainNav" aria-label="Main" ref={nav}>
          <Simple k="home" href="/" label="Home" />
          <Simple k="about" href="/about" label="About" />
          <div className="nav-item has-dd">
            <Link className={`nl ${page === 'services' ? 'on' : ''}`} href="/services" aria-haspopup="true">Services <Caret /></Link>
            <div className="dd mega">
              <div className="dd-list">{svcs.slice(0, 8).map((x) => (
                <a key={x.id} className="ddl" href="/services" onClick={goService(x.name)}>
                  <span className="ddi"><Icon name={x.icon} /></span>
                  <span><b>{x.name}</b><small>{x.short}</small></span>
                </a>
              ))}</div>
              {promo && (
                <Link className="ddp" href="/contact">
                  <span className="ddp-img"><Photo it={promo} label={promo.name} w={600} /></span>
                  <span className="ddp-txt"><span className="eyebrow">Free consultation</span><b>Not sure where to start?</b><span>Book a free site visit <Arrow /></span></span>
                </Link>
              )}
            </div>
          </div>
          <div className="nav-item has-dd">
            <Link className={`nl ${portfolio ? 'on' : ''}`} href="/projects" aria-haspopup="true" onClick={goCat('All')}>Portfolio <Caret /></Link>
            <div className="dd narrow">
              <Link className="ddl" href="/projects" onClick={goCat('All')}><span className="ddi"><Icon name="home" /></span><span><b>All projects</b><small>{projs.length} homes, offices &amp; cafés</small></span></Link>
              <Link className="ddl" href="/gallery"><span className="ddi"><Icon name="sofa" /></span><span><b>Photo gallery</b><small>Room-by-room photographs</small></span></Link>
              <Link className="ddl" href="/designs"><span className="ddi"><Icon name="cube" /></span><span><b>3D designs &amp; floor plans</b><small>Renders and layouts</small></span></Link>
              {cats.length > 0 && (
                <div className="dd-cats"><span className="lbl">Browse by type</span>
                  <div className="chips">{cats.map((c) => <Link key={c} href="/projects" onClick={goCat(c)}>{c}</Link>)}</div>
                </div>
              )}
            </div>
          </div>
          <Simple k="packages" href="/packages" label="Packages" />
          <Simple k="testimonials" href="/testimonials" label="Reviews" />
          <Simple k="contact" href="/contact" label="Contact" />
          <div className="drawer-foot">
            <Link className="btn cta-top" href="/contact">Book free consultation <Arrow /></Link>
            <span><Ico name="phone" size={18} /> {S.phone}</span>
            <span><Ico name="mail" size={18} /> {S.email}</span>
          </div>
        </nav>

        <div className="hdr-actions">
          <span className="hcall"><Ico name="phone" size={18} /><span><small>Call us</small><b style={{ userSelect: 'all' }}>{S.phone}</b></span></span>
          <Link className="btn cta-top" href="/contact">Book free consultation</Link>
        </div>
        <ThemeButton />
        <button className="menu-btn" type="button" aria-expanded={open} aria-controls="mainNav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
          <span className="burger"><i /><i /><i /></span>
        </button>
      </div>
    </header>
  );
}
