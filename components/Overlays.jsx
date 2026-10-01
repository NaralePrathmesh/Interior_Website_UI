'use client';
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { photoURL } from '@/lib/utils';

const pop = { initial: { opacity: 0, y: 36, scale: 0.96 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 20, scale: 0.98 }, transition: { type: 'spring', stiffness: 340, damping: 26 } };
const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 } };

/** Modal, lightbox and toasts — rendered once in the layout, animated with Framer Motion. */
export default function Overlays() {
  const { modal, closeModal, lightbox, setLightbox, closeLightbox, toasts } = useStore();
  const closeBtn = useRef(null);
  const lbClose = useRef(null);

  useEffect(() => {
    const locked = !!(modal || lightbox);
    document.body.style.overflow = locked ? 'hidden' : '';
    if (modal) setTimeout(() => closeBtn.current && closeBtn.current.focus(), 30);
    if (lightbox) setTimeout(() => lbClose.current && lbClose.current.focus(), 30);
  }, [modal, lightbox]);

  useEffect(() => {
    const key = (e) => {
      if (lightbox) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') step(-1);
        if (e.key === 'ArrowRight') step(1);
        return;
      }
      if (modal && e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  });

  const step = (d) => setLightbox((l) => (l ? { ...l, idx: (l.idx + d + l.list.length) % l.list.length } : l));
  const it = lightbox && lightbox.list[lightbox.idx];

  return (
    <>
      <AnimatePresence>
        {modal && (
          <motion.div className="overlay" key="ov" {...fade} onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
            <motion.div className="modal" role="dialog" aria-modal="true" aria-label={modal.title} style={modal.narrow ? { maxWidth: 640 } : undefined} {...pop}>
              <div className="mhead"><h3>{modal.title}</h3><button className="x" aria-label="Close" ref={closeBtn} onClick={closeModal}>×</button></div>
              <div className="mbody">{typeof modal.body === 'function' ? modal.body() : modal.body}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightbox && it && (
          <motion.div className="lb" role="dialog" aria-modal="true" aria-label="Photo viewer" key="lb" {...fade}>
            <div className="top">
              <span><b style={{ font: '600 16.5px var(--display)' }}>{it.title}</b><span className="mono" style={{ display: 'block' }}>{it.sub} · {lightbox.idx + 1} / {lightbox.list.length}</span></span>
              <button className="x" ref={lbClose} aria-label="Close" onClick={closeLightbox}>×</button>
            </div>
            <div className="stage" onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}>
              <AnimatePresence mode="wait">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img key={lightbox.idx} src={photoURL(it.src, 2000)} alt={it.title || 'Interior photograph'} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ type: 'spring', stiffness: 260, damping: 28 }} />
              </AnimatePresence>
              {lightbox.list.length > 1 && (
                <>
                  <button className="nav prev" aria-label="Previous photo" onClick={() => step(-1)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 6l-6 6 6 6" /></svg></button>
                  <button className="nav next" aria-label="Next photo" onClick={() => step(1)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 6l6 6-6 6" /></svg></button>
                </>
              )}
            </div>
            {it.url && <div style={{ textAlign: 'center', paddingTop: 10 }}><a className="btn primary sm" href={it.url} target="_blank" rel="noopener noreferrer">Watch video</a></div>}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="toast-wrap" aria-live="polite">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div className="toast" role="status" key={t.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ type: 'spring', stiffness: 380, damping: 26 }}>{t.msg}</motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
