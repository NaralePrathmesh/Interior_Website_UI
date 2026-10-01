'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { BG, BUDGETS, PROPS, PTYPES } from '@/lib/data';
import { todayISO, uid } from '@/lib/utils';
import { PageBanner } from '../blocks';
import { Photo } from '../ui/primitives';
import { SPRING } from '../fx';

const EMPTY = { name: '', phone: '', email: '', city: 'Pune', property: '', ptype: '', budget: '', pdate: '', message: '' };

export default function Contact() {
  const { S: s, update, prefill, setPrefill } = useStore();
  const [f, setF] = useState(EMPTY);
  const [err, setErr] = useState('');
  const [sent, setSent] = useState(false);
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    setMinDate(todayISO());
    if (prefill && Object.keys(prefill).length) {
      setF((x) => ({ ...x, property: prefill.property || x.property, ptype: prefill.ptype || x.ptype, message: prefill.message || x.message }));
      setPrefill({});
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const phone = f.phone.replace(/[^\d]/g, '');
    let msg = '';
    if (!f.name.trim()) msg = 'Enter your name.';
    else if (phone.length < 10) msg = 'Enter a 10-digit phone number so we can call you back.';
    else if (!f.property) msg = 'Choose a property type.';
    else if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) msg = 'Check the email address; it looks incomplete.';
    if (msg) { setErr(msg); return; }
    setErr('');
    const enq = { id: uid(), ...Object.fromEntries(Object.entries(f).map(([k, v]) => [k, String(v).trim()])), date: todayISO(), status: 'New', assigned: '', follow: '', notes: [] };
    update((d) => {
      d.enquiries.unshift(enq);
      d.notifs.unshift({ t: `New enquiry received from ${enq.name}`, d: todayISO(), read: false });
    });
    setSent(true);
  };
  const opt = (arr) => [<option key="" value="">Select</option>, ...arr.map((a) => <option key={a}>{a}</option>)];
  const maps = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(s.address);

  return (
    <>
      <PageBanner crumb="Contact" title="Book a consultation" lede="Tell us about your space. A designer will call you within one working day." />
      <section className="wrap sec tight"><div className="contact-grid">
        <div className="stack" style={{ gap: 24 }}>
          <div className="studio-img"><Photo it={{ image: BG.studio }} label="Aangan Studio experience centre" w={900} /><span>Visit our experience studio in Baner</span></div>
          <dl className="info">
            <dt>Studio</dt><dd>{s.name}</dd>
            <dt>Address</dt><dd>{s.address}</dd>
            <dt>Phone</dt><dd style={{ userSelect: 'all' }}>{s.phone}</dd>
            <dt>Email</dt><dd style={{ userSelect: 'all' }}>{s.email}</dd>
            <dt>Hours</dt><dd>{s.hours}</dd>
          </dl>
          <div className="map" aria-label="Map showing studio location">
            <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice"><rect width="400" height="225" fill="var(--tint)" />
              <path d="M-10 160 C80 140 140 170 220 120 S360 60 420 80" stroke="var(--raise)" strokeWidth="14" fill="none" /><path d="M60 -10 L120 240" stroke="var(--raise)" strokeWidth="9" fill="none" /><path d="M280 -10 C260 80 300 150 250 240" stroke="var(--raise)" strokeWidth="7" fill="none" />
              <path d="M0 60 L400 40 M0 200 L400 190" stroke="var(--raise)" strokeWidth="4" />
              <ellipse cx="330" cy="170" rx="46" ry="26" fill="var(--line)" />
              <text x="228" y="108" fontFamily="Inter, sans-serif" fontSize="10" fill="var(--muted)" transform="rotate(-18 228 108)">BANER ROAD</text>
              <g transform="translate(188 118)"><path d="M0 0 C-12 -16 -14 -30 0 -36 C14 -30 12 -16 0 0Z" fill="var(--accent)" /><circle cy="-24" r="5" fill="var(--bg)" /></g></svg>
          </div>
          <a className="btn ghost" href={maps} target="_blank" rel="noopener noreferrer" style={{ alignSelf: 'flex-start' }}>Get directions</a>
        </div>
        <div className="stack" style={{ gap: 18 }}>
          {!sent ? (
            <form className="form" onSubmit={submit} noValidate>
              <label className="f">Name *<input className="inp" id="e_name" required autoComplete="name" value={f.name} onChange={set('name')} /></label>
              <label className="f">Phone number *<input className="inp" id="e_phone" required inputMode="tel" autoComplete="tel" placeholder="10-digit mobile" value={f.phone} onChange={set('phone')} /></label>
              <label className="f">Email<input className="inp" id="e_email" type="email" autoComplete="email" value={f.email} onChange={set('email')} /></label>
              <label className="f">City<input className="inp" id="e_city" value={f.city} onChange={set('city')} /></label>
              <label className="f">Property type *<select className="inp" id="e_property" required value={f.property} onChange={set('property')}>{opt(PROPS)}</select></label>
              <label className="f">Project type<select className="inp" id="e_ptype" value={f.ptype} onChange={set('ptype')}>{opt(PTYPES)}</select></label>
              <label className="f">Approximate budget<select className="inp" id="e_budget" value={f.budget} onChange={set('budget')}>{opt(BUDGETS)}</select></label>
              <label className="f">Preferred date for site visit<input className="inp" id="e_pdate" type="date" min={minDate || undefined} value={f.pdate} onChange={set('pdate')} /></label>
              <label className="f full">Message<textarea className="inp" id="e_msg" placeholder="Possession date, rooms to design, anything we should know" value={f.message} onChange={set('message')} /></label>
              {err && <p className="err full">{err}</p>}
              <div className="full"><button className="btn primary" type="submit">Submit enquiry</button></div>
            </form>
          ) : (
            <motion.div className="okbox" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={SPRING}>
              <h3>Thank you! Our team will contact you shortly.</h3>
              <p className="muted" style={{ marginTop: 6 }}>Your enquiry is now in the studio’s admin panel. <Link className="link" href="/admin">See it there</Link>.</p>
            </motion.div>
          )}
        </div>
      </div></section>
    </>
  );
}
