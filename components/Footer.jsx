'use client';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { pub } from '@/lib/utils';
import { BrandMark } from './ui/primitives';

export default function Footer() {
  const { S, db } = useStore();
  const svcs = pub(db.services).slice(0, 4);
  return (
    <>
      <footer className="site"><div className="wrap">
        <div className="cols">
          <div className="stack" style={{ gap: 12 }}>
            <Link className="brand" href="/" style={{ color: 'var(--on-deep)' }}><BrandMark /><span>{S.name}</span></Link>
            <p style={{ color: 'var(--on-deep-muted)', fontSize: 14, maxWidth: '34ch' }}>{S.tagline}. {Number(S.projectsDone).toLocaleString('en-IN')}+ projects delivered since 2014.</p>
          </div>
          <div><h4>Company</h4><ul><li><Link href="/about">About</Link></li><li><Link href="/services">Services</Link></li><li><Link href="/projects">Projects</Link></li><li><Link href="/contact">Contact</Link></li></ul></div>
          <div><h4>Services</h4><ul>{svcs.map((x) => <li key={x.id}><Link href="/services">{x.name}</Link></li>)}</ul></div>
          <div><h4>Contact</h4><ul><li style={{ userSelect: 'all' }}>{S.phone}</li><li style={{ userSelect: 'all', overflowWrap: 'anywhere' }}>{S.email}</li><li style={{ color: 'var(--on-deep-muted)' }}>{S.address}</li></ul></div>
          <div><h4>Follow</h4><ul>{[['Instagram', S.instagram], ['Facebook', S.facebook], ['YouTube', S.youtube], ['LinkedIn', S.linkedin]].map(([n, u]) => (
            <li key={n}><a href={u} target="_blank" rel="noopener noreferrer">{n}</a></li>
          ))}</ul></div>
        </div>
        <div className="base">
          <span>© 2026 {S.name}. Sample content for demonstration.</span>
          <span className="row" style={{ gap: 18 }}><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms &amp; Conditions</Link><Link href="/admin">Admin panel</Link></span>
        </div>
      </div></footer>

      <a className="wa" href={`https://wa.me/${S.whatsapp}?text=${encodeURIComponent('Hello, I am interested in your interior design services. I would like to discuss my project.')}`} target="_blank" rel="noopener noreferrer">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3z" /></svg>
        <span className="walbl">Chat with us</span>
      </a>
      <div className="mbar">
        <a className="btn ghost" href={`tel:${String(S.phone).replace(/\s/g, '')}`}>Call us</a>
        <Link className="btn primary" href="/contact">Free estimate</Link>
      </div>
    </>
  );
}
