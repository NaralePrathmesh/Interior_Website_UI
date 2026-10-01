'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { BG, CALC_FACTOR, FAQS, PROPS } from '@/lib/data';
import { inr, initials, lakh, monthLbl, num, pub, slug, uid, todayISO } from '@/lib/utils';
import { Arrow, Emph, Icon, Photo, Plan, SplitHeading, Stars } from './ui/primitives';
import { MLink, SPRING, lift, press } from './fx';

/* ---------------- cards ---------------- */
export function ProjectCard({ p }) {
  const openProject = useOpenProject();
  return (
    <button className="pc" data-proj={p.id} aria-label={`View ${p.name}`} onClick={() => openProject(p.id)}>
      <span className="media"><Photo it={p} /></span>
      <span className="tagg glass">{p.category}</span>
      <span className="go glass" aria-hidden="true"><Arrow /></span>
      <span className="cap">
        <span className="meta">{p.location.split(',')[0]} · {num(p.area)} sq.ft · {p.style}</span>
        <span className="ttl">{p.name}</span>
      </span>
    </button>
  );
}

export function ServiceCard({ x }) {
  const { setUi } = useStore();
  return (
    <MLink className="scard" href="/services" onClick={() => setUi({ svcFocus: slug(x.name) })} {...lift}>
      <span className="media"><span className="im"><Photo it={x} label={x.name} /></span><span className="ico-b"><Icon name={x.icon} /></span></span>
      <b>{x.name}</b>
      <span className="muted" style={{ fontSize: 15 }}>{x.short}</span>
    </MLink>
  );
}

export function QuoteCard({ t }) {
  return (
    <motion.figure className="quote" style={{ margin: 0 }} {...lift}>
      <Stars n={t.rating} />
      <p className="q">“{t.review}”</p>
      <figcaption className="who">
        <span className="av">{t.image ? <img src={t.image} alt="" /> : initials(t.name)}</span>
        <span><b style={{ display: 'block', fontSize: 15 }}>{t.name}</b><span className="mono">{t.project}</span></span>
      </figcaption>
    </motion.figure>
  );
}

/* ---------------- project detail modal ---------------- */
export function useOpenProject() {
  const { db, openModal, closeModal, openLightbox, setPrefill } = useStore();
  const router = useRouter();
  return (id) => {
    const p = db.projects.find((x) => x.id === id);
    if (!p) return;
    const L = [p.image, ...(p.photos || [])].filter(Boolean).map((src) => ({ src, title: p.name, sub: p.location }));
    const others = (p.photos || []).filter(Boolean);
    const specs = [['Category', p.category], ['Type', p.type], ['Location', p.location], ['Area', num(p.area) + ' sq.ft'], ['Style', p.style], ['Completed', monthLbl(p.date)]].concat(p.client ? [['Client', p.client]] : []);
    openModal({
      title: p.name,
      body: (
        <>
          <button className="frame" aria-label="Open photo full screen" onClick={() => openLightbox(L, 0)}><Photo it={p} label={p.name} w={1400} /></button>
          <dl className="spec" style={{ margin: 0 }}>{specs.map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl>
          <p style={{ maxWidth: '68ch' }}>{p.desc}</p>
          {p.highlights && p.highlights.length > 0 && (
            <div><span className="eyebrow">Highlights</span><ul className="ticks" style={{ marginTop: 10 }}>{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul></div>
          )}
          <div><span className="eyebrow">More photographs &amp; floor plan</span>
            <div className="thumbs" style={{ marginTop: 10 }}>
              {others.map((src, i) => (
                <button key={src + i} className="frame zoom" aria-label={`Open photo ${i + 2}`} onClick={() => openLightbox(L, i + 1)}><Photo it={{ image: src }} label={`${p.name} photo ${i + 2}`} w={500} /></button>
              ))}
              <div className="frame"><Plan label={`${p.name} floor plan`} /></div>
            </div>
          </div>
          <div className="row">
            <button className="btn primary" onClick={() => { closeModal(); setPrefill({ property: PROPS.includes(p.category) ? p.category : '', message: `I liked your ${p.name} project and would like something similar.` }); router.push('/contact'); }}>Enquire about a similar project</button>
            <span className="mono">/projects/{slug(p.name)}</span>
          </div>
        </>
      ),
    });
  };
}

/* ---------------- full-width section with a background photo ---------------- */
export function BgSection({ img, className = '', children }) {
  return (
    <section className={`bgsec ${className}`}>
      <div className="bgimg"><Photo it={{ image: img }} label="" w={1800} /></div>
      {children}
    </section>
  );
}

/* ---------------- page banner ---------------- */
export function PageBanner({ crumb, title, lede }) {
  const { S, db } = useStore();
  const pool = pub(db.projects);
  const img = pool.length ? pool[(crumb.length * 3) % pool.length] : null;
  return (
    <section className="pban">
      <div className="bgimg">{img && <Photo it={img} label={img.name} w={1600} eager />}</div>
      <div className="wrap">
        <span className="crumb">{S.name} / {crumb}</span>
        <h1><SplitHeading text={title} /></h1>
        {lede && <p className="lede">{lede}</p>}
      </div>
    </section>
  );
}

/* ---------------- promise strip ---------------- */
const PROMISE_ICONS = ['<path d="M12 7v5l3 2"/><circle cx="12" cy="12" r="9"/>', '<path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z"/><path d="M9 12l2 2 4-4"/>', '<path d="M4 12l5 5L20 6"/>', '<path d="M4 5h16v14H4z"/><path d="M8 9h8M8 13h5"/>', '<path d="M3 7h18v10H3z"/><circle cx="12" cy="12" r="2.5"/>'];
export function PromiseStrip() {
  const { S } = useStore();
  const L = String(S.promises || '').split('\n').map((x) => x.trim()).filter(Boolean).slice(0, 5);
  if (!L.length) return null;
  return (
    <section className="promises bgsec">
      <div className="bgimg"><Photo it={{ image: BG.promises }} label="" w={1800} /></div>
      <ul className="wrap">
      {L.map((l, i) => {
        const [a, ...b] = l.split('|');
        return (
          <li key={i}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: PROMISE_ICONS[i % 5] }} />
            <span><b>{a.trim()}</b>{b.join('|').trim()}</span>
          </li>
        );
      })}
    </ul></section>
  );
}

/* ---------------- cost estimator ---------------- */
export function Calculator() {
  const { db, ui, setUi, setPrefill } = useStore();
  const router = useRouter();
  const pk = pub(db.packages);
  const pkgName = pk.some((x) => x.name === ui.calcPkg) ? ui.calcPkg : (pk[1] || pk[0] || {}).name;
  const p = db.packages.find((x) => x.name === pkgName);
  if (!p) return null;
  const est = p.price * CALC_FACTOR[ui.calcHome];
  const lo = Math.round((est * 0.92) / 1e4) * 1e4;
  const hi = Math.round((est * 1.12) / 1e4) * 1e4;
  const r = 0.01, n = 36;
  const emi = Math.round((est * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) / 100) * 100;
  const range = `${lakh(lo)} – ${lakh(hi)}`;
  return (
    <div className="calc">
      <div className="inputs">
        <div className="stack" style={{ gap: 10 }}><span className="lbl">1 · Your home</span>
          <div className="chips" role="group" aria-label="Home type">{Object.keys(CALC_FACTOR).map((h) => (
            <motion.button type="button" key={h} className={h === ui.calcHome ? 'on' : ''} onClick={() => setUi({ calcHome: h })} {...press}>{h}</motion.button>
          ))}</div>
        </div>
        <div className="stack" style={{ gap: 10 }}><span className="lbl">2 · Package</span>
          <div className="chips" role="group" aria-label="Package">{pk.map((x) => (
            <motion.button type="button" key={x.id} className={x.name === pkgName ? 'on' : ''} onClick={() => setUi({ calcPkg: x.name })} {...press}>{x.name} · {x.tier}</motion.button>
          ))}</div>
        </div>
        <p className="muted" style={{ fontSize: 14 }}>{p.name} package for a {ui.calcHome}: {p.features.slice(0, 3).join(', ').toLowerCase()} and more.</p>
      </div>
      <div className="out has-bg" aria-live="polite">
        <div className="out-bg"><Photo it={{ image: BG.estimate }} label="" w={900} /></div>
        <span className="mono" style={{ color: 'var(--on-deep-muted)' }}>Estimated cost</span>
        <AnimatePresence mode="wait">
          <motion.div className="big" key={range} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>{range}</motion.div>
        </AnimatePresence>
        <div className="emi"><span><span className="muted" style={{ fontSize: 13 }}>EMI from</span><br /><b style={{ fontSize: 20 }}>{inr(emi)}</b><span className="muted" style={{ fontSize: 13 }}> /month · 36 months</span></span></div>
        <button className="btn primary" style={{ alignSelf: 'flex-start' }} onClick={() => { setPrefill({ property: PROPS.includes(ui.calcHome) ? ui.calcHome : 'Villa', ptype: 'Package quote', message: `Estimate for a ${ui.calcHome} with the ${pkgName} package: ${range}.` }); router.push('/contact'); }}>Get my exact quote <Arrow /></button>
        <span className="muted" style={{ fontSize: 12 }}>Includes design, materials, labour and GST. EMI shown at 12% p.a., for illustration.</span>
      </div>
    </div>
  );
}

/* ---------------- FAQ ---------------- */
export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq">{FAQS.map(([q, a], i) => (
      <details key={q} open={open === i} onToggle={(e) => { if (e.currentTarget.open) setOpen(i); else if (open === i) setOpen(-1); }}>
        <summary onClick={(e) => { e.preventDefault(); setOpen(open === i ? -1 : i); }}>{q}</summary>
        <AnimatePresence initial={false}>
          {open === i && (
            <motion.p key="a" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>{a}</motion.p>
          )}
        </AnimatePresence>
      </details>
    ))}</div>
  );
}

/* ---------------- hero lead form ---------------- */
export function LeadForm() {
  const { update, toast } = useStore();
  const [prop, setProp] = useState('2 BHK');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [err, setErr] = useState('');
  const [done, setDone] = useState(null);
  const submit = (e) => {
    e.preventDefault();
    const ph = phone.replace(/\D/g, '');
    if (!name.trim()) return setErr('Enter your name.');
    if (ph.length < 10) return setErr('Enter a 10-digit mobile number.');
    setErr('');
    update((d) => {
      d.enquiries.unshift({ id: uid(), name: name.trim(), phone: ph, email: '', city: 'Pune', property: prop, ptype: 'Full home interior', budget: '', pdate: '', message: 'Free estimate request from home page.', date: todayISO(), status: 'New', assigned: '', follow: '', notes: [] });
      d.notifs.unshift({ t: `New enquiry received from ${name.trim()}`, d: todayISO(), read: false });
    });
    setDone({ name: name.trim().split(' ')[0], ph });
    toast('Request received');
  };
  if (done) {
    return (
      <motion.div className="glass leadcard" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={SPRING}>
        <span className="eyebrow">Request received</span>
        <h3>Thank you, {done.name}!</h3>
        <p>Our team will call you on +91 {done.ph} within one working day to plan a free site visit.</p>
        <Link className="btn glassb" href="/projects">Browse projects meanwhile</Link>
      </motion.div>
    );
  }
  return (
    <form className="glass leadcard" onSubmit={submit} noValidate>
      <span className="eyebrow">Free design estimate</span>
      <h3>Tell us about your home</h3>
      <div className="chips" role="group" aria-label="Property type">{PROPS.slice(0, 5).map((x) => (
        <motion.button type="button" key={x} className={x === prop ? 'on' : ''} onClick={() => setProp(x)} {...press}>{x}</motion.button>
      ))}</div>
      <input className="inp" id="hl_name" placeholder="Your name" autoComplete="name" aria-label="Your name" value={name} onChange={(e) => setName(e.target.value)} />
      <div className="phone-in"><span>+91</span><input className="inp" id="hl_phone" inputMode="tel" placeholder="Mobile number" autoComplete="tel" aria-label="Mobile number" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
      {err && <p className="err">{err}</p>}
      <button className="btn primary" type="submit">Get free estimate <Arrow /></button>
      <small>A designer calls you within one working day. No spam.</small>
    </form>
  );
}

export { Emph, SplitHeading };
