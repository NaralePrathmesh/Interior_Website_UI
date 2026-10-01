'use client';
import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { BG, CATS } from '@/lib/data';
import { initials, inr, num, pub, slug } from '@/lib/utils';
import { Arrow, Count, Icon, Photo } from '../ui/primitives';
import { Calculator, PageBanner, ProjectCard, QuoteCard } from '../blocks';
import { lift, press } from '../fx';

/* ---------------- About ---------------- */
const ACH = ['Featured in Home Review, “Best Compact Homes of 2025”', 'IIID Pune Chapter Award, Residential Interiors 2024', 'Over 40 modular kitchens delivered in 2025', 'Repeat and referral clients: 62% of projects'];
export function About() {
  const { S: s, db } = useStore();
  const big = { fontFamily: 'var(--display)', fontSize: 18, lineHeight: 1.4 };
  return (
    <>
      <PageBanner crumb="About" title={`About ${s.name}`} lede={s.about} />
      <section className="wrap sec tight"><div className="stats" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
        <div><Count value={`${num(s.years)}+`} /><span>Years experience</span></div>
        <div><Count value={`${num(s.projectsDone)}+`} /><span>Projects completed</span></div>
        <div><Count value={`${num(s.clients)}+`} /><span>Happy clients</span></div>
        <div><Count value={`${num(s.designers)}+`} /><span>Professional designers</span></div>
      </div></section>
      <section className="wrap sec tight"><div className="grid g3">
        <motion.div className="svc" {...lift}><span className="eyebrow">Vision</span><p style={big}>{s.vision}</p></motion.div>
        <motion.div className="svc" {...lift}><span className="eyebrow">Mission</span><p style={big}>{s.mission}</p></motion.div>
        <motion.div className="svc" {...lift}><span className="eyebrow">Design philosophy</span><p style={big}>{s.philosophy}</p></motion.div>
      </div></section>
      <section className="wrap sec tight">
        <div className="sec-head"><div className="stack"><span className="eyebrow">Inside our projects</span><h2>Spaces we have <em>shaped</em></h2></div><Link className="btn ghost" href="/projects">View all projects <Arrow /></Link></div>
        <div className="strip">{pub(db.projects).slice(0, 5).map((p) => (
          <div className="s" key={p.id}><Photo it={p} label={p.name} w={900} /><span>{p.name}</span></div>
        ))}</div>
      </section>
      <section className="band"><div className="wrap sec">
        <div className="sec-head"><div className="stack"><span className="eyebrow">Team</span><h2>The people you’ll work with</h2></div></div>
        <div className="grid">{pub(db.team).map((m) => (
          <div className="stack" style={{ gap: 10 }} key={m.id}>
            <div className="av" style={{ width: 72, height: 72, fontSize: 22, borderRadius: 4 }}>{m.image ? <img src={m.image} alt="" /> : initials(m.name)}</div>
            <div><h3>{m.name}</h3><span className="mono">{m.role} · {m.exp} yrs</span></div>
            <p className="muted" style={{ fontSize: 15 }}>{m.bio}</p>
          </div>
        ))}</div>
      </div></section>
      <section className="wrap sec">
        <div className="sec-head"><div className="stack"><span className="eyebrow">Achievements</span><h2>Recognition</h2></div></div>
        <ul className="ticks" style={{ fontSize: 17 }}>{ACH.map((a) => <li key={a}>{a}</li>)}</ul>
      </section>
    </>
  );
}

/* ---------------- Services ---------------- */
export function Services() {
  const { db, ui, setUi, setPrefill } = useStore();
  useEffect(() => {
    if (!ui.svcFocus) return;
    const el = document.getElementById('svc-' + ui.svcFocus);
    setUi({ svcFocus: null });
    if (el) setTimeout(() => el.scrollIntoView({ block: 'start' }), 60);
  }, [ui.svcFocus, setUi]);
  return (
    <>
      <PageBanner crumb="Services" title="Services" lede="Everything needed to design, build and furnish a home or workplace, handled by one team." />
      <section className="wrap">{pub(db.services).map((x) => (
        <div className="svc-row" id={`svc-${slug(x.name)}`} key={x.id}>
          <div className="frame"><Photo it={x} label={x.name} /></div>
          <div className="stack">
            <Icon name={x.icon} className="ico" size={36} />
            <h2 style={{ fontSize: 'clamp(21px,2.25vw,29px)' }}>{x.name}</h2>
            <p className="lede" style={{ fontSize: 17 }}>{x.detail}</p>
            <ul className="ticks two">{(x.features || []).map((f) => <li key={f}>{f}</li>)}</ul>
            <div className="row">
              <Link className="btn primary" href="/contact" onClick={() => setPrefill({ message: `I am interested in ${x.name}.` })}>Enquire about {x.name.toLowerCase()}</Link>
              <Link className="link" href="/projects">See our projects</Link>
            </div>
          </div>
        </div>
      ))}</section>
    </>
  );
}

/* ---------------- Projects ---------------- */
export function Projects() {
  const { db, ui, setUi } = useStore();
  const all = pub(db.projects);
  const cats = ['All', ...CATS.filter((c) => all.some((p) => p.category === c))];
  const q = ui.projQ.toLowerCase();
  const list = all.filter((p) => (ui.projFilter === 'All' || p.category === ui.projFilter) && (!q || (p.name + p.location + p.style).toLowerCase().includes(q)));
  return (
    <>
      <PageBanner crumb="Projects" title="Projects" lede="Homes, offices and restaurants we have designed and delivered. Select a project for photos, floor plans and specifications." />
      <section className="wrap sec tight">
        <div className="toolbar" style={{ justifyContent: 'space-between' }}>
          <div className="chips" role="group" aria-label="Filter by category">{cats.map((c) => (
            <motion.button key={c} className={c === ui.projFilter ? 'on' : ''} onClick={() => setUi({ projFilter: c })} {...press}>{c}</motion.button>
          ))}</div>
          <input className="inp" id="projQ" type="search" placeholder="Search by name, area or style" value={ui.projQ} onChange={(e) => setUi({ projQ: e.target.value })} style={{ maxWidth: 280 }} aria-label="Search projects" />
        </div>
        <div className="grid g3">
          {list.length ? list.map((p) => <ProjectCard key={p.id} p={p} />) : <p className="empty">No projects match. Try another category.</p>}
        </div>
      </section>
    </>
  );
}

/* ---------------- Gallery ---------------- */
export function Gallery() {
  const { db, ui, setUi, openLightbox } = useStore();
  const all = pub(db.gallery);
  const rooms = ['All', ...new Set(all.map((g) => g.room))];
  const projs = ['All', ...new Set(all.map((g) => g.project))];
  const list = all.filter((g) => g.type === ui.galTab && (ui.galRoom === 'All' || g.room === ui.galRoom) && (ui.galProject === 'All' || g.project === ui.galProject) && g.image);
  const L = list.map((g) => ({ src: g.image, title: g.title, sub: g.project, url: g.url }));
  return (
    <>
      <PageBanner crumb="Gallery" title="Gallery" lede="Photos and walkthrough videos from finished sites." />
      <section className="wrap sec tight">
        <div className="toolbar">
          <div className="chips">{['Image', 'Video'].map((t) => (
            <motion.button key={t} className={t === ui.galTab ? 'on' : ''} onClick={() => setUi({ galTab: t })} {...press}>{t === 'Image' ? 'Photos' : 'Videos'}</motion.button>
          ))}</div>
          <select className="inp" id="galRoom" style={{ maxWidth: 200 }} aria-label="Room type" value={ui.galRoom} onChange={(e) => setUi({ galRoom: e.target.value })}>{rooms.map((r) => <option key={r}>{r}</option>)}</select>
          <select className="inp" id="galProject" style={{ maxWidth: 240 }} aria-label="Project" value={ui.galProject} onChange={(e) => setUi({ galProject: e.target.value })}>{projs.map((r) => <option key={r}>{r}</option>)}</select>
        </div>
        <div className="masonry">{list.length ? list.map((g, i) => (
          <motion.button key={g.id} className="mi" aria-label={`Open ${g.title}`} onClick={() => openLightbox(L, i)} {...press}>
            <Photo it={g} label={g.title} w={700} />
            {g.type === 'Video' && <span className="play glass" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>}
            <span className="cap"><b>{g.title}</b><span>{g.room}{g.type === 'Video' ? ' · ' + (g.duration || 'Video') : ''}</span></span>
          </motion.button>
        )) : <p className="empty">Nothing here yet for this filter.</p>}</div>
      </section>
    </>
  );
}

/* ---------------- Packages ---------------- */
export function Packages() {
  const { db, setPrefill } = useStore();
  const list = pub(db.packages);
  return (
    <>
      <PageBanner crumb="Packages" title="Interior packages" lede="Starting prices for a 2BHK of about 1,000 sq.ft. Your final quote follows a site measurement and is itemised line by line." />
      <section className="wrap sec tight">
        <div className="grid g3">{list.map((p, i) => (
          <motion.div className={`pkg ${i === 1 ? 'hi' : ''}`} key={p.id} {...lift}>
            {p.image && <div className="pkg-img"><Photo it={p} label={`${p.name} package interior`} w={700} />{i === 1 && <span className="chip" style={{ background: 'var(--accent)', color: 'var(--accent-ink)', borderColor: 'var(--accent)' }}>Most chosen</span>}</div>}
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <span className="eyebrow">{p.tier}</span>
              {i === 1 && !p.image && <span className="chip" style={{ background: 'var(--accent)', color: 'var(--accent-ink)', borderColor: 'var(--accent)' }}>Most chosen</span>}
            </div>
            <h2 style={{ fontSize: 25.5 }}>{p.name}</h2>
            <div><span className="mono">Starting at</span><div className="price">{inr(p.price)}</div></div>
            <p className="muted">{p.desc}</p>
            <ul className="ticks">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
            <Link className={`btn ${i === 1 ? 'primary' : 'ghost'}`} href="/contact" onClick={() => setPrefill({ ptype: 'Package quote', message: `I would like a quote for the ${p.name} package.` })}>Request quote</Link>
          </motion.div>
        ))}</div>
        <p className="muted" style={{ marginTop: 20, fontSize: 14 }}>Prices include design, materials, labour and GST. Appliances, loose furniture and décor are quoted separately.</p>
      </section>
      <section className="wrap sec" style={{ paddingTop: 0 }}>
        <div className="sec-head"><div className="stack"><span className="eyebrow">Cost estimator</span><h2>Estimate for <em>your home</em></h2></div></div>
        <Calculator />
      </section>
    </>
  );
}

/* ---------------- 3D designs ---------------- */
export function Designs() {
  const { db, ui, setUi, openLightbox, openModal } = useStore();
  const all = pub(db.designs);
  const types = ['All', ...new Set(all.map((d) => d.dtype))];
  const list = all.filter((d) => ui.dFilter === 'All' || d.dtype === ui.dFilter);
  const withImg = useMemo(() => all.filter((x) => x.image), [all]);
  const open = (d) => {
    if (d.image) openLightbox(withImg.map((x) => ({ src: x.image, title: x.name, sub: `${x.dtype} · ${x.project}` })), withImg.indexOf(d));
    else openModal({ title: d.name, narrow: true, body: (<><div className="frame"><Photo it={d} label={d.name} /></div><span className="mono">{d.dtype} · {d.category} · {d.project}</span></>) });
  };
  return (
    <>
      <PageBanner crumb="3D Designs" title="3D designs & floor plans" lede="Every project starts in 3D. You approve what you see before anything is built." />
      <section className="wrap sec tight">
        <div className="toolbar"><div className="chips">{types.map((t) => (
          <motion.button key={t} className={t === ui.dFilter ? 'on' : ''} onClick={() => setUi({ dFilter: t })} {...press}>{t}</motion.button>
        ))}</div></div>
        <div className="grid">{list.map((d) => (
          <button className="pc sq" key={d.id} data-design={d.id} aria-label={d.name} onClick={() => open(d)}>
            <span className="media"><Photo it={d} label={d.name} /></span>
            <span className="tagg glass">{d.dtype}</span>
            <span className="cap"><span className="meta">{d.project}</span><span className="ttl" style={{ fontSize: 24 }}>{d.name}</span></span>
          </button>
        ))}</div>
      </section>
    </>
  );
}

/* ---------------- Testimonials ---------------- */
export function Testimonials() {
  const { db } = useStore();
  const list = pub(db.testimonials);
  const avg = (list.reduce((a, t) => a + Number(t.rating), 0) / (list.length || 1)).toFixed(1);
  return (
    <>
      <PageBanner crumb="Testimonials" title="Client reviews" lede={`Average rating ${avg} out of 5 from ${list.length} published reviews.`} />
      <section className="wrap sec tight"><div className="grid g3">{list.map((t) => <QuoteCard key={t.id} t={t} />)}</div></section>
    </>
  );
}

/* ---------------- Legal ---------------- */
export function Legal({ kind }) {
  const { S } = useStore();
  const priv = kind === 'privacy';
  return (
    <>
      <PageBanner crumb={priv ? 'Privacy Policy' : 'Terms & Conditions'} title={priv ? 'Privacy Policy' : 'Terms & Conditions'} />
      <section className="wrap sec tight"><div className="stack" style={{ maxWidth: '68ch' }}>
        {priv ? (
          <>
            <p>We collect the details you share through our enquiry forms (name, phone, email, city and project information) only to respond to your enquiry and plan your project.</p>
            <p>We do not sell or share your details with third parties, except vendors directly involved in executing your project, and only with your consent.</p>
            <p>To have your data removed, write to {S.email}.</p>
          </>
        ) : (
          <>
            <p>Quotes are valid for 30 days from the date of issue. Prices are itemised and include GST unless stated otherwise.</p>
            <p>Work begins after design approval and the first payment milestone. Timelines are confirmed in writing at approval.</p>
            <p>Hardware carries the manufacturer’s warranty; carpentry carries a one-year workmanship warranty from handover.</p>
          </>
        )}
      </div></section>
    </>
  );
}

export { Arrow };
