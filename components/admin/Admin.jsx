'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useStore } from '@/lib/store';
import { STAT_COL, STATUSES } from '@/lib/data';
import { inr, num, rel, slug, todayISO, uid, photoURL } from '@/lib/utils';
import { Logo, Photo } from '../ui/primitives';
import { ThemeButton } from '../Header';
import { useOpenProject } from '../blocks';
import { lift } from '../fx';
import { NAV, PERMS, SCHEMA, SETTINGS_GROUPS, can } from './schema';

const Pill = ({ s }) => <span className={`pill s-${slug(s)}`}>{s}</span>;

/* ---------------- Login ---------------- */
function Login() {
  const { db, adm, setAdm } = useStore();
  const [email, setEmail] = useState('admin@aanganstudio.in');
  const [pass, setPass] = useState('demo1234');
  const [role, setRole] = useState(adm.role);
  const [err, setErr] = useState('');
  const [forgot, setForgot] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim()) || pass.length < 6) return setErr('Enter a valid email and a password of at least 6 characters.');
    if (pass !== 'demo1234') return setErr('That password is incorrect. Use demo1234 for this demo.');
    const u = db.users.find((x) => x.email === email.trim());
    setAdm({ user: u ? u.name : email.split('@')[0], role, view: 'dashboard' });
  };
  return (
    <div className="login">
      <motion.form className="card" onSubmit={submit} noValidate initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 24 }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <Link className="brand" href="/" aria-label="Diamond Spaces home"><Logo variant="auto" /></Link>
          <ThemeButton className="admin-t" />
        </div>
        <div><h2 style={{ fontSize: 22.5 }}>Admin sign in</h2><p className="muted" style={{ fontSize: 14, marginTop: 4 }}>Manage projects, enquiries and site content.</p></div>
        <label className="f">Email<input className="inp" id="l_email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" /></label>
        <label className="f">Password<input className="inp" id="l_pass" type="password" value={pass} onChange={(e) => setPass(e.target.value)} autoComplete="current-password" /></label>
        <label className="f">Sign in as (demo of role permissions)
          <select className="inp" id="l_role" value={role} onChange={(e) => setRole(e.target.value)}>{Object.keys(PERMS).map((r) => <option key={r}>{r}</option>)}</select>
        </label>
        {err && <p className="err">{err}</p>}
        <button className="btn primary" type="submit">Log in</button>
        <div className="row" style={{ justifyContent: 'space-between' }}><button type="button" className="link" onClick={() => setForgot(true)}>Forgot password?</button><Link className="link" href="/">Back to website</Link></div>
        <p className="hint">Demo login is pre-filled (password <b>demo1234</b>). The production build will use hashed passwords, JWT sessions and protected API routes.</p>
        {forgot && <p className="hint">In the live site, a reset link is emailed to the registered admin address.</p>}
      </motion.form>
    </div>
  );
}

/* ---------------- Dashboard ---------------- */
function Dashboard({ openEnq }) {
  const { db, adm, setAdm } = useStore();
  const E = db.enquiries;
  const counts = STATUSES.map((s) => [s, E.filter((e) => e.status === s).length]);
  const tiles = [['Projects', db.projects.length, 'projects'], ['Services', db.services.length, 'services'], ['Enquiries', E.length, 'enquiries'], ['New enquiries', E.filter((e) => e.status === 'New').length, 'enquiries'], ['Testimonials', db.testimonials.length, 'testimonials'], ['Gallery images', db.gallery.filter((g) => g.type === 'Image').length, 'gallery'], ['Videos', db.gallery.filter((g) => g.type === 'Video').length, 'gallery'], ['Admin users', db.users.length, 'users']];
  const today = todayISO();
  const due = E.filter((e) => e.follow && e.follow <= today && !['Converted', 'Closed', 'Not Interested'].includes(e.status));
  const conv = E.length ? Math.round((E.filter((e) => e.status === 'Converted').length / E.length) * 100) : 0;
  const leads = can(adm.role, 'enquiries');
  return (
    <div className="stack" style={{ gap: 18 }}>
      <div className="tiles">{tiles.map(([l, n, v]) => {
        const go = can(adm.role, v);
        return (
          <motion.div key={l} className="tile" {...(go ? { role: 'button', tabIndex: 0, style: { cursor: 'pointer' }, onClick: () => setAdm({ view: v, q: '' }), onKeyDown: (e) => { if (e.key === 'Enter') setAdm({ view: v, q: '' }); } } : {})} {...lift}>
            <b>{n}</b><span>{l}</span>
          </motion.div>
        );
      })}</div>
      <div className="two">
        <div className="panel"><h3>Recent enquiries</h3>
          {!leads && <p className="muted" style={{ fontSize: 14 }}>Enquiries are visible to Super Admin and Lead Manager roles.</p>}
          {leads && (
            <div style={{ overflowX: 'auto' }}><table className="tbl" style={{ minWidth: 460 }}>
              <thead><tr><th>Name</th><th>Phone</th><th>Property</th><th>Date</th><th>Status</th></tr></thead>
              <tbody>{E.slice(0, 6).map((e) => (
                <tr key={e.id} className="click" onClick={() => openEnq(e.id)}><td>{e.name}</td><td className="num">{e.phone}</td><td>{e.property}</td><td className="num">{rel(e.date)}</td><td><Pill s={e.status} /></td></tr>
              ))}</tbody>
            </table></div>
          )}
        </div>
        <div className="stack" style={{ gap: 18 }}>
          <div className="panel"><h3>Lead pipeline</h3>
            <div className="pipe" role="img" aria-label="Enquiries by status">{counts.filter((c) => c[1]).map(([s, n]) => (
              <motion.span key={s} initial={{ width: 0 }} animate={{ width: `${(n / E.length) * 100}%` }} transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }} style={{ background: STAT_COL[s] }} title={`${s}: ${n}`} />
            ))}</div>
            <div className="legend">{counts.map(([s, n]) => <span key={s}><i style={{ background: STAT_COL[s] }} />{s} <b className="num">{n}</b></span>)}</div>
            <p className="muted" style={{ fontSize: 13, marginTop: 12 }}>Conversion rate: <b style={{ color: 'var(--ink)' }}>{conv}%</b> of all enquiries</p>
          </div>
          <div className="panel"><h3>Follow-ups due</h3>
            {due.length ? <div className="notes">{due.map((e) => (
              <div className="note" key={e.id} {...(leads ? { onClick: () => openEnq(e.id), style: { cursor: 'pointer' } } : {})}><b>{e.name}</b> · {e.property}<div className="mono">Due {rel(e.follow)} · {e.assigned || 'Unassigned'}</div></div>
            ))}</div> : <p className="muted" style={{ fontSize: 14 }}>Nothing due today.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Enquiries ---------------- */
function EnquiryEditor({ id }) {
  const { db, update, closeModal, toast } = useStore();
  const e = db.enquiries.find((x) => x.id === id);
  const [status, setStatus] = useState(e ? e.status : 'New');
  const [assigned, setAssigned] = useState(e ? e.assigned : '');
  const [follow, setFollow] = useState(e ? e.follow : '');
  const [note, setNote] = useState('');
  const [armed, setArmed] = useState(false);
  if (!e) return <p className="muted">This enquiry no longer exists.</p>;
  const save = () => {
    update((d) => { const x = d.enquiries.find((y) => y.id === id); x.status = status; x.assigned = assigned; x.follow = follow; if (note.trim()) x.notes.unshift({ t: note.trim(), d: todayISO() }); });
    closeModal(); toast('Enquiry updated');
  };
  const del = () => {
    if (!armed) return setArmed(true);
    update((d) => { d.enquiries = d.enquiries.filter((x) => x.id !== id); });
    closeModal(); toast('Enquiry deleted');
  };
  const specs = [['Phone', e.phone], ['Email', e.email || '—'], ['City', e.city || '—'], ['Property', e.property], ['Project type', e.ptype || '—'], ['Budget', e.budget || '—'], ['Preferred visit', e.pdate ? rel(e.pdate) : '—'], ['Received', rel(e.date)]];
  return (
    <>
      <dl className="spec" style={{ margin: 0 }}>{specs.map(([a, b]) => <div key={a}><dt>{a}</dt><dd style={{ overflowWrap: 'anywhere' }}>{b}</dd></div>)}</dl>
      {e.message && <p className="okbox" style={{ fontSize: 15 }}>{e.message}</p>}
      <div className="form">
        <label className="f">Status<select className="inp" id="en_status" value={status} onChange={(x) => setStatus(x.target.value)}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></label>
        <label className="f">Assigned employee<select className="inp" id="en_assigned" value={assigned} onChange={(x) => setAssigned(x.target.value)}><option value="">Unassigned</option>{db.team.map((t) => <option key={t.id}>{t.name}</option>)}</select></label>
        <label className="f">Follow-up date<input className="inp" type="date" id="en_follow" value={follow} onChange={(x) => setFollow(x.target.value)} /></label>
      </div>
      <div className="stack" style={{ gap: 10 }}><span className="eyebrow">Notes</span>
        <div className="notes">{e.notes.length ? e.notes.map((n, i) => <div className="note" key={i}>{n.t}<div className="mono">{rel(n.d)}</div></div>) : <p className="muted" style={{ fontSize: 14 }}>No notes yet.</p>}</div>
        <textarea className="inp" id="en_note" placeholder="Add a note, e.g. call summary" style={{ minHeight: 70 }} value={note} onChange={(x) => setNote(x.target.value)} />
      </div>
      <div className="row"><button className="btn primary" onClick={save}>Save changes</button><button className={`btn ${armed ? 'danger' : 'ghost'}`} onClick={del}>{armed ? 'Confirm delete' : 'Delete enquiry'}</button></div>
    </>
  );
}

function Enquiries({ openEnq }) {
  const { db, adm, setAdm } = useStore();
  const E = db.enquiries;
  const q = adm.q.toLowerCase();
  const list = E.filter((e) => (adm.est === 'All' || e.status === adm.est) && (!q || (e.name + e.phone + e.email + e.city + e.property).toLowerCase().includes(q)));
  return (
    <>
      <div className="toolbar"><div className="chips">{['All', ...STATUSES].map((s) => (
        <button key={s} className={adm.est === s ? 'on' : ''} onClick={() => setAdm({ est: s })}>{s} <span className="num">{s === 'All' ? E.length : E.filter((e) => e.status === s).length}</span></button>
      ))}</div></div>
      <div className="toolbar"><input className="inp" id="aq" type="search" placeholder="Search name, phone, email, city" value={adm.q} onChange={(e) => setAdm({ q: e.target.value })} aria-label="Search enquiries" /><span className="mono">{list.length} shown</span></div>
      <div className="tbl-wrap"><table className="tbl">
        <thead><tr><th>Name</th><th>Phone</th><th>Property</th><th>Budget</th><th>Received</th><th>Follow-up</th><th>Assigned</th><th>Status</th></tr></thead>
        <tbody>{list.length ? list.map((e) => (
          <tr key={e.id} className="click" tabIndex={0} onClick={() => openEnq(e.id)} onKeyDown={(x) => { if (x.key === 'Enter') openEnq(e.id); }}>
            <td><b>{e.name}</b><div className="mono">{e.city}</div></td><td className="num">{e.phone}</td><td>{e.property}<div className="mono">{e.ptype}</div></td><td>{e.budget || '—'}</td><td className="num">{rel(e.date)}</td><td className="num">{e.follow ? rel(e.follow) : '—'}</td><td>{e.assigned || '—'}</td><td><Pill s={e.status} /></td>
          </tr>
        )) : <tr><td colSpan={8} className="empty">No enquiries match.</td></tr>}</tbody>
      </table></div>
    </>
  );
}

/* ---------------- Generic content editor ---------------- */
function ImageField({ f, value, onChange }) {
  const { toast } = useStore();
  const pick = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!/^image\//.test(file.type)) { toast('Choose an image file (JPG or PNG).'); e.target.value = ''; return; }
    if (file.size > 3e6) { toast('That image is over 3 MB. Choose a smaller one.'); e.target.value = ''; return; }
    const r = new FileReader();
    r.onload = () => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement('canvas');
        const sc = Math.min(1, 1200 / img.width);
        c.width = img.width * sc; c.height = img.height * sc;
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        onChange(c.toDataURL('image/jpeg', 0.82));
      };
      img.src = r.result;
    };
    r.readAsDataURL(file);
  };
  return (
    <div className="f full" style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 600 }}>
      <span>{f.l}</span>
      <div className="row">
        <div className="thumb" style={{ width: 96, height: 72 }}>{value ? <img src={photoURL(value, 300)} alt="" /> : null}</div>
        <input type="file" accept="image/*" id={`fx_${f.k}`} aria-label={`Upload ${f.l}`} onChange={pick} />
        {value && <button type="button" className="link" onClick={() => onChange('')}>Remove image</button>}
      </div>
      <input className="inp" type="url" placeholder="…or paste an image link, e.g. https://images.unsplash.com/photo-…" value={/^https?:/.test(value || '') ? value : ''} onChange={(e) => onChange(e.target.value.trim())} aria-label={`${f.l} link`} />
      <span className="muted" style={{ fontWeight: 400 }}>Upload a JPG or PNG from your computer, or paste a link to a photo.</span>
    </div>
  );
}

function ItemForm({ k, id }) {
  const { db, update, closeModal, toast } = useStore();
  const sch = SCHEMA[k];
  const orig = id ? db[k].find((x) => x.id === id) : { [sch.flag]: true };
  const [o, setO] = useState(() => {
    const x = { ...orig };
    sch.fields.forEach((f) => { if (f.t === 'lines') x[f.k] = (x[f.k] || []).join('\n'); });
    return x;
  });
  const [err, setErr] = useState('');
  const set = (key, v) => setO((x) => ({ ...x, [key]: v }));
  const submit = (e) => {
    e.preventDefault();
    const first = sch.fields[0];
    if (!String(o[first.k] || '').trim()) return setErr(first.l.replace(' *', '') + ' is required.');
    const out = { ...o };
    sch.fields.forEach((f) => {
      if (f.t === 'number') out[f.k] = Number(out[f.k]) || 0;
      else if (f.t === 'text' || f.t === 'textarea') out[f.k] = String(out[f.k] || '').trim();
      else if (f.t === 'lines') out[f.k] = String(out[f.k] || '').split('\n').map((x) => x.trim()).filter(Boolean);
    });
    if (k === 'testimonials') out.rating = Number(out.rating || 5);
    update((d) => {
      if (id) Object.assign(d[k].find((x) => x.id === id), out);
      else {
        d[k].unshift({ ...out, id: uid() });
        if (k === 'testimonials') d.notifs.unshift({ t: `New review added for ${out.name}`, d: todayISO(), read: false });
      }
    });
    closeModal();
    toast(id ? 'Changes saved' : sch.one[0].toUpperCase() + sch.one.slice(1) + ' added');
  };
  const field = (f) => {
    const v = o[f.k];
    const id_ = `fx_${f.k}`;
    if (f.t === 'check') return <label className="f inline full" key={f.k}><input type="checkbox" id={id_} checked={!!v} onChange={(e) => set(f.k, e.target.checked)} /> {f.l}</label>;
    if (f.t === 'textarea') return <label className="f full" key={f.k}>{f.l}<textarea className="inp" id={id_} value={v || ''} onChange={(e) => set(f.k, e.target.value)} /></label>;
    if (f.t === 'lines') return <label className="f full" key={f.k}>{f.l}<textarea className="inp" id={id_} value={v || ''} onChange={(e) => set(f.k, e.target.value)} /></label>;
    if (f.t === 'select') return <label className="f" key={f.k}>{f.l}<select className="inp" id={id_} value={v == null ? f.o[0] : String(v)} onChange={(e) => set(f.k, e.target.value)}>{f.o.map((x) => <option key={x}>{x}</option>)}</select></label>;
    if (f.t === 'project') return <label className="f" key={f.k}>{f.l}<select className="inp" id={id_} value={v || ''} onChange={(e) => set(f.k, e.target.value)}><option value="">None</option>{db.projects.map((p) => <option key={p.id}>{p.name}</option>)}</select></label>;
    if (f.t === 'image') return <ImageField key={f.k} f={f} value={v} onChange={(val) => set(f.k, val)} />;
    return <label className="f" key={f.k}>{f.l}<input className="inp" id={id_} type={f.t} value={v ?? ''} onChange={(e) => set(f.k, e.target.value)} /></label>;
  };
  return (
    <form className="form" onSubmit={submit} noValidate>
      {sch.fields.map(field)}
      {err && <p className="err full">{err}</p>}
      <div className="full row"><button className="btn primary" type="submit">{id ? 'Save changes' : `Add ${sch.one}`}</button><button className="btn ghost" type="button" onClick={closeModal}>Cancel</button></div>
    </form>
  );
}

function Cell({ sch, it, k }) {
  const v = it[k];
  if (k === 'thumb') return <div className="thumb"><Photo it={it} label="" w={240} /></div>;
  if (k === sch.flag) return v ? <span className="pill s-on">{sch.flag === 'enabled' ? 'Enabled' : sch.one === 'admin user' ? 'Active' : 'Published'}</span> : <span className="pill s-off">{sch.flag === 'enabled' ? 'Disabled' : 'Hidden'}</span>;
  if (k === 'featured') return v ? <span className="pill s-on">Featured</span> : <span className="muted">—</span>;
  if (k === 'price') return <span className="num">{inr(v)}</span>;
  if (k === 'area') return <span className="num">{num(v)} sq.ft</span>;
  if (k === 'rating') return <span className="stars">{'★'.repeat(+v || 0)}</span>;
  if (k === 'exp') return <span className="num">{v} yrs</span>;
  if (k === 'date') return <span className="num">{v}</span>;
  if (k === 'name' || k === 'title') return <b>{v}</b>;
  if (k === 'short') return <span className="muted" style={{ display: 'block', maxWidth: '44ch' }}>{v}</span>;
  return <>{v}</>;
}

function Crud({ k }) {
  const { db, adm, setAdm, update, toast, openModal } = useStore();
  const openProject = useOpenProject();
  const [arm, setArm] = useState(null);
  const sch = SCHEMA[k];
  const q = adm.q.toLowerCase();
  const list = db[k].filter((it) => !q || JSON.stringify(Object.fromEntries(Object.entries(it).filter(([x]) => x !== 'image'))).toLowerCase().includes(q));
  const edit = (id) => openModal({ title: (id ? 'Edit ' : 'Add ') + sch.one, narrow: true, body: <ItemForm k={k} id={id} /> });
  const onTxt = sch.flag === 'enabled' ? ['Disable', 'Enable'] : k === 'users' ? ['Deactivate', 'Activate'] : ['Unpublish', 'Publish'];
  return (
    <>
      <div className="toolbar" style={{ justifyContent: 'space-between' }}>
        <div className="row"><input className="inp" id="aq" type="search" placeholder={`Search ${sch.title.toLowerCase()}`} value={adm.q} onChange={(e) => setAdm({ q: e.target.value })} aria-label="Search" /><span className="mono">{list.length} of {db[k].length}</span></div>
        <button className="btn primary" onClick={() => edit(null)}>Add {sch.one}</button>
      </div>
      <div className="tbl-wrap"><table className="tbl">
        <thead><tr>{sch.cols.map((c) => <th key={c[0]}>{c[1]}</th>)}<th style={{ textAlign: 'right' }}>Actions</th></tr></thead>
        <tbody>{list.length ? list.map((it) => (
          <tr key={it.id}>
            {sch.cols.map((c) => <td key={c[0]}><Cell sch={sch} it={it} k={c[0]} /></td>)}
            <td><div className="acts">
              {k === 'projects' && <><button className="btn ghost sm" onClick={() => openProject(it.id)}>View</button>
                <button className="btn ghost sm" onClick={() => { update((d) => { const x = d.projects.find((y) => y.id === it.id); x.featured = !x.featured; }); toast(it.featured ? 'Removed from the home page' : 'Now on the home page'); }}>{it.featured ? 'Unfeature' : 'Feature'}</button></>}
              <button className="btn ghost sm" onClick={() => { update((d) => { const x = d[k].find((y) => y.id === it.id); x[sch.flag] = !x[sch.flag]; }); toast(it[sch.flag] ? 'Hidden from the website' : 'Now live on the website'); }}>{it[sch.flag] ? onTxt[0] : onTxt[1]}</button>
              <button className="btn ghost sm" onClick={() => edit(it.id)}>Edit</button>
              <button className={`btn ${arm === it.id ? 'danger' : 'ghost'} sm`} onClick={() => {
                if (arm !== it.id) return setArm(it.id);
                update((d) => { d[k] = d[k].filter((x) => x.id !== it.id); });
                setArm(null); toast(sch.one[0].toUpperCase() + sch.one.slice(1) + ' deleted');
              }}>{arm === it.id ? 'Confirm' : 'Delete'}</button>
            </div></td>
          </tr>
        )) : <tr><td colSpan={sch.cols.length + 1} className="empty">Nothing here yet. Use “Add {sch.one}” to create the first one.</td></tr>}</tbody>
      </table></div>
    </>
  );
}

/* ---------------- Settings ---------------- */
function Settings() {
  const { db, update, reset, toast } = useStore();
  const [s, setS] = useState(() => ({ ...db.settings }));
  const [armed, setArmed] = useState(false);
  useEffect(() => { setS({ ...db.settings }); }, [db.settings]);
  const save = (e) => {
    e.preventDefault();
    update((d) => {
      SETTINGS_GROUPS.forEach(([, fs]) => fs.forEach(([k, , t]) => { d.settings[k] = t === 'number' ? Number(s[k]) || 0 : String(s[k] ?? '').trim(); }));
      d.settings.whatsapp = String(d.settings.whatsapp).replace(/\D/g, '');
    });
    toast('Settings saved. The website now shows these details.');
  };
  const rows = [['dashboard', 'Dashboard'], ['projects', 'Projects'], ['services', 'Services'], ['gallery', 'Gallery'], ['packages', 'Packages'], ['testimonials', 'Testimonials'], ['enquiries', 'Enquiries'], ['users', 'Admin users'], ['settings', 'Website settings']];
  return (
    <form className="stack" style={{ gap: 18 }} onSubmit={save} noValidate>
      {SETTINGS_GROUPS.map(([g, fs]) => (
        <div className="panel" key={g}><h3>{g}</h3><div className="form">{fs.map(([k, l, t]) => t === 'textarea'
          ? <label className="f full" key={k}>{l}<textarea className="inp" id={`st_${k}`} value={s[k] ?? ''} onChange={(e) => setS((x) => ({ ...x, [k]: e.target.value }))} /></label>
          : <label className="f" key={k}>{l}<input className="inp" id={`st_${k}`} type={t || 'text'} value={s[k] ?? ''} onChange={(e) => setS((x) => ({ ...x, [k]: e.target.value }))} /></label>)}
        </div></div>
      ))}
      <div className="panel"><h3>Role permissions</h3><div style={{ overflowX: 'auto' }}><table className="tbl rbac" style={{ minWidth: 480 }}>
        <thead><tr><th>Feature</th>{Object.keys(PERMS).map((r) => <th key={r}>{r}</th>)}</tr></thead>
        <tbody>{rows.map(([k, l]) => <tr key={k}><td>{l}</td>{Object.keys(PERMS).map((r) => <td key={r}>{can(r, k) ? '✓' : <span className="muted">—</span>}</td>)}</tr>)}</tbody>
      </table></div></div>
      <div className="row" style={{ position: 'sticky', bottom: 0, background: 'var(--bg)', paddingBlock: 12, borderTop: '1px solid var(--line)' }}>
        <button className="btn primary" type="submit">Save settings</button>
        <button className={`btn ${armed ? 'danger' : 'ghost'}`} type="button" onClick={() => { if (!armed) return setArmed(true); reset(); setArmed(false); toast('Demo data restored'); }}>{armed ? 'Confirm: erase all changes' : 'Reset demo data'}</button>
      </div>
    </form>
  );
}

/* ---------------- Shell ---------------- */
export default function Admin() {
  const { db, adm, setAdm, update, openModal } = useStore();
  const root = useRef(null);
  const view = adm.user && !can(adm.role, adm.view) ? 'dashboard' : adm.view;

  useEffect(() => {
    if (!root.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.atop, .tiles .tile, .panel, .toolbar, .tbl-wrap', { y: 26, opacity: 0, stagger: 0.05, duration: 0.6, ease: 'power3.out', clearProps: 'transform,opacity' });
    }, root);
    return () => ctx.revert();
  }, [view, adm.user]);

  if (!adm.user) return <Login />;

  const newCount = db.enquiries.filter((e) => e.status === 'New').length;
  const unread = db.notifs.filter((n) => !n.read).length;
  const openEnq = (id) => { const e = db.enquiries.find((x) => x.id === id); if (e) openModal({ title: e.name, narrow: true, body: <EnquiryEditor id={id} /> }); };
  const showNotifs = () => {
    openModal({ title: 'Notifications', narrow: true, body: db.notifs.length ? <div className="notes">{db.notifs.map((n, i) => <div className="note" key={i}><b style={n.read ? { fontWeight: 500 } : undefined}>{n.t}</b><div className="mono">{rel(n.d)}</div></div>)}</div> : <p className="muted">No notifications.</p> });
    update((d) => { d.notifs.forEach((n) => { n.read = true; }); });
  };
  const title = { dashboard: 'Dashboard', enquiries: 'Enquiries', settings: 'Settings' }[view] || SCHEMA[view].title;

  return (
    <div className="admin" ref={root}>
      <aside className="side" aria-label="Admin navigation">
        <Link className="brand" href="/" aria-label="Diamond Spaces home"><Logo variant="auto" /></Link>
        {NAV.map(([g, items]) => {
          const vis = items.filter(([k]) => can(adm.role, k));
          if (!vis.length) return null;
          return (
            <div key={g} style={{ display: 'contents' }}>
              <div className="grp">{g}</div>
              {vis.map(([k, l]) => (
                <button key={k} className={view === k ? 'on' : ''} onClick={() => setAdm({ view: k, q: '' })}>
                  <span>{l}</span>{k === 'enquiries' && newCount > 0 && <span className="badge">{newCount}</span>}
                </button>
              ))}
            </div>
          );
        })}
      </aside>
      <section className="amain">
        <div className="atop">
          <h2>{title}</h2>
          <div className="row">
            <button className="btn ghost sm" onClick={showNotifs} aria-label="Notifications">Notifications{unread > 0 && <> <span className="badge">{unread}</span></>}</button>
            <Link className="btn ghost sm" href="/">View website</Link>
            <span className="chip">{adm.user} · {adm.role}</span>
            <ThemeButton className="admin-t" />
            <button className="btn ghost sm" onClick={() => setAdm({ user: null })}>Log out</button>
          </div>
        </div>
        {view === 'dashboard' && <Dashboard openEnq={openEnq} />}
        {view === 'enquiries' && <Enquiries openEnq={openEnq} />}
        {view === 'settings' && <Settings />}
        {SCHEMA[view] && <Crud k={view} key={view} />}
      </section>
    </div>
  );
}
