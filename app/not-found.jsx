import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="wrap sec" style={{ minHeight: '50vh' }}>
      <div className="stack" style={{ gap: 16, maxWidth: 560 }}>
        <span className="eyebrow">404</span>
        <h1 style={{ fontSize: 'clamp(30px,4.5vw,54px)' }}>This room hasn’t been <em>designed yet</em></h1>
        <p className="lede">The page you’re looking for doesn’t exist or has moved.</p>
        <Link className="btn primary" href="/" style={{ alignSelf: 'flex-start' }}>Back to home</Link>
      </div>
    </section>
  );
}
