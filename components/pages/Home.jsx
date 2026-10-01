'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { BG, MATERIALS } from '@/lib/data';
import { initials, num, pub } from '@/lib/utils';
import { Arrow, Count, Emph, Photo, SplitHeading } from '../ui/primitives';
import { BgSection, Calculator, Faq, LeadForm, ProjectCard, PromiseStrip, ServiceCard } from '../blocks';
import { lift, press } from '../fx';

const WHY = (s) => [
  ['Experienced designers', `${s.years} years and ${s.projectsDone}+ projects across Pune.`],
  ['Quality materials', 'BWP ply, branded hardware and E1-grade boards as standard.'],
  ['Customised designs', 'Every layout starts from your family’s routines, not a catalogue.'],
  ['Transparent pricing', 'Itemised quotes, with no surprise charges once work begins.'],
  ['On-time delivery', 'A written schedule and site updates every Friday.'],
  ['End-to-end service', 'Design, civil, electrical, carpentry and handover in one contract.'],
];
const STEPS = [
  ['Consultation', 'Week 1', 'Site visit, measurements and a brief on how you live.'],
  ['Design', 'Weeks 2–4', 'Layouts, 3D renders and material boards.'],
  ['Approval', 'Week 5', 'Final drawings and an itemised quote you sign off.'],
  ['Execution', 'Weeks 6–14', 'Factory production and site work, updated weekly.'],
  ['Handover', 'Week 15', 'Deep clean, snag list closed, keys returned.'],
];

function Reviews() {
  const { db } = useStore();
  const T = pub(db.testimonials);
  const [i, setI] = useState(0);
  if (!T.length) return null;
  const avg = (T.reduce((a, t) => a + Number(t.rating), 0) / T.length).toFixed(1);
  const t = T[i % T.length];
  return (
    <BgSection img={BG.reviews}><div className="wrap sec"><div className="tfeat">
      <div className="stack" style={{ gap: 18 }}>
        <span className="eyebrow">Client reviews</span>
        <Count className="bigscore" value={avg} />
        <span className="stars" style={{ fontSize: 18 }}>★★★★★</span>
        <p className="muted">Average rating from {T.length} published reviews.</p>
        <div className="row">
          <motion.button className="circ" aria-label="Previous review" onClick={() => setI((i - 1 + T.length) % T.length)} {...press}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M19 12H5M11 6l-6 6 6 6" /></svg></motion.button>
          <motion.button className="circ" aria-label="Next review" onClick={() => setI((i + 1) % T.length)} {...press}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M13 6l6 6-6 6" /></svg></motion.button>
          <Link className="link" href="/testimonials">Read all reviews</Link>
        </div>
      </div>
      <div className="stack" style={{ gap: 26 }} aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div key={t.id} className="stack" style={{ gap: 26 }} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ type: 'spring', stiffness: 260, damping: 28 }}>
            <blockquote>“{t.review}”</blockquote>
            <div className="who"><span className="av">{t.image ? <img src={t.image} alt="" /> : initials(t.name)}</span><span><b style={{ display: 'block' }}>{t.name}</b><span className="mono">{t.project} · {'★'.repeat(t.rating)}</span></span></div>
          </motion.div>
        </AnimatePresence>
        <div className="dots">{T.map((x, k) => <i key={x.id} className={k === i % T.length ? 'on' : ''} />)}</div>
      </div>
    </div></div></BgSection>
  );
}

export default function Home() {
  const { S: s, db } = useStore();
  const all = pub(db.projects);
  const feat = all.filter((p) => p.featured);
  const hero = feat[0] || all[0];
  const imgA = all[1] || hero, imgB = all[4] || hero, imgW = all[2] || hero, imgC = all[5] || hero;
  return (
    <>
      <section className="hx">
        <div className="bgimg">{hero && <Photo it={hero} label={hero.name} w={1800} eager />}</div>
        <div className="wrap inner">
          <div className="stack" style={{ gap: 24 }}>
            <span className="eyebrow">{s.tagline}</span>
            <h1><SplitHeading text={s.heroHeading} /></h1>
            <p className="lede">{s.heroSub}</p>
            <div className="row">
              <Link className="btn primary" href="/contact">{s.heroCta} <Arrow /></Link>
              <Link className="btn glassb" href="/projects">Explore projects</Link>
            </div>
          </div>
          <LeadForm />
        </div>
        <div className="wrap"><div className="glass stats-g">
          <div><Count value={`${num(s.years)}+`} /><span>Years of practice</span></div>
          <div><Count value={`${num(s.projectsDone)}+`} /><span>Projects completed</span></div>
          <div><Count value={`${num(s.clients)}+`} /><span>Happy clients</span></div>
          <div><Count value={num(s.designers)} /><span>Designers &amp; engineers</span></div>
        </div></div>
      </section>

      <PromiseStrip />
      <div className="marq" aria-hidden="true"><div className="track">{[...MATERIALS, ...MATERIALS].map((m, i) => <span key={i}>{m}</span>)}</div></div>

      <section className="wrap sec"><div className="split">
        <div className="duo">
          <div className="a">{imgA && <Photo it={imgA} />}</div>
          <div className="b">{imgB && <Photo it={imgB} />}</div>
          <span className="stamp">EST. 2014 · BANER, PUNE</span>
        </div>
        <div className="stack" style={{ gap: 22 }}>
          <span className="eyebrow">About the studio</span>
          <h2>Designed around how you <em>actually live</em></h2>
          <p style={{ fontSize: 17 }}>{s.about}</p>
          <p className="muted">{s.philosophy}</p>
          <Link className="btn ghost" href="/about" style={{ alignSelf: 'flex-start' }}>Meet the studio <Arrow /></Link>
        </div>
      </div></section>

      <section className="wrap sec" style={{ paddingTop: 0 }}>
        <div className="sec-head"><div className="stack"><span className="eyebrow">Services</span><h2>What we design <em>and build</em></h2></div><Link className="btn ghost" href="/services">All services <Arrow /></Link></div>
        <div className="sgrid">{pub(db.services).slice(0, 8).map((x) => <ServiceCard key={x.id} x={x} />)}</div>
      </section>

      <section className="wrap sec" style={{ paddingTop: 0 }}>
        <div className="sec-head"><div className="stack"><span className="eyebrow">Featured projects</span><h2>Recently <em>handed over</em></h2></div><Link className="btn ghost" href="/projects">View all projects <Arrow /></Link></div>
        <div className="bento">{feat.slice(0, 4).map((p) => <ProjectCard key={p.id} p={p} />)}</div>
      </section>

      <section className="wrap sec" style={{ paddingTop: 0 }}><div className="split">
        <div className="tall">{imgW && <Photo it={imgW} />}<div className="float glass"><b>{num(s.years)}+</b><span style={{ fontSize: 14, lineHeight: 1.4 }}>years designing homes and workplaces across Pune and PCMC</span></div></div>
        <div className="stack" style={{ gap: 18 }}>
          <span className="eyebrow">Why choose us</span>
          <h2>Six promises <em>in writing</em></h2>
          <div className="why2">{WHY(s).map(([a, b]) => (
            <motion.div key={a} {...lift}><b>{a}</b><span className="muted" style={{ fontSize: 15 }}>{b}</span></motion.div>
          ))}</div>
        </div>
      </div></section>

      <BgSection img={BG.process}><div className="wrap sec">
        <div className="sec-head"><div className="stack"><span className="eyebrow">Our process</span><h2>First visit to handover in <em>about 15 weeks</em></h2><p className="muted">Typical timeline for a 2BHK. Larger homes and offices take longer.</p></div></div>
        <ol className="tl">{STEPS.map(([a, w, b], i) => (
          <li key={a}><span className="dot">0{i + 1}</span><span className="when">{w}</span><h3>{a}</h3><span className="muted" style={{ fontSize: 15 }}>{b}</span></li>
        ))}</ol>
      </div></BgSection>

      <Reviews />

      <section className="wrap sec" style={{ paddingTop: 0 }} id="estimate">
        <div className="sec-head"><div className="stack"><span className="eyebrow">Cost estimator</span><h2>What will my interiors <em>cost?</em></h2><p className="muted">Pick your home and a package for an instant range. Your final quote is itemised after a free site visit.</p></div></div>
        <Calculator />
      </section>

      <section className="wrap sec" style={{ paddingTop: 0 }}><div className="split" style={{ alignItems: 'start' }}>
        <div className="stack" style={{ gap: 16 }}><span className="eyebrow">FAQ</span><h2>Questions clients <em>ask us first</em></h2><p className="muted">Anything else? Call {s.phone} or chat with us on WhatsApp.</p><div className="faq-img"><Photo it={{ image: BG.faq }} label="Bedroom interior" w={900} /></div></div>
        <Faq />
      </div></section>

      <section className="wrap"><div className="ctaimg">
        <div className="bgimg">{imgC && <Photo it={imgC} label={imgC.name} w={1600} />}</div>
        <div className="in">
          <span className="eyebrow">Free first consultation</span>
          <h2>Let’s design your <em>dream space</em></h2>
          <p>A designer visits your site anywhere in Pune and PCMC, measures up and talks through ideas. No charge, no obligation.</p>
          <div className="row"><Link className="btn primary" href="/contact">Book consultation <Arrow /></Link><Link className="btn glassb" href="/packages">See packages</Link></div>
        </div>
      </div></section>
    </>
  );
}

export { Emph };
