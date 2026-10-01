'use client';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BrandMark } from '@/components/ui/primitives';
import { PageFX } from '@/components/fx';

let mounts = 0;

/** Re-mounts on every navigation: Framer Motion page curtain + fade, then GSAP page effects. */
export default function Template({ children }) {
  const reduce = useReducedMotion();
  // The curtain only plays for in-site navigation, never on the first page load.
  const [showCurtain] = useState(() => typeof window !== 'undefined' && mounts > 0);
  useEffect(() => { mounts += 1; }, []);
  const curtain = showCurtain && !reduce;
  return (
    <>
      {curtain && (
        <motion.div className="fx-curtain" style={{ display: 'grid' }} aria-hidden="true"
          initial={{ y: '0%' }} animate={{ y: '-100%' }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}>
          <motion.span initial={{ scale: 0.6, rotate: -90, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ duration: 0.3, ease: 'backOut' }}>
            <BrandMark />
          </motion.span>
        </motion.div>
      )}
      <motion.div initial={curtain ? { opacity: 0, y: 14 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}>
        {children}
      </motion.div>
      <PageFX />
    </>
  );
}
