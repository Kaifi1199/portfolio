'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { scrollToId } from './motion';

export function useKarachiTime() {
  const [t, setT] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Karachi',
      hour: '2-digit',
      minute: '2-digit',
    });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return t;
}

const LINKS = [
  ['work', 'Work'],
  ['experience', 'Experience'],
  ['about', 'About'],
  ['contact', 'Contact'],
];

export function Nav({ ready }: { ready: boolean }) {
  const time = useKarachiTime();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 160 && y > last);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: ready && !hidden ? 0 : -80 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 mix-blend-difference"
      >
        <nav className="flex items-center justify-between px-5 py-5 text-paper md:px-10">
          <button onClick={() => go('top')} data-cursor="hover" className="font-serif text-2xl leading-none">
            M<span className="italic">k</span>.
          </button>
          <ul className="hidden items-center gap-9 font-mono text-[11px] uppercase tracking-[0.18em] md:flex">
            {LINKS.map(([id, label]) => (
              <li key={id}>
                <button onClick={() => go(id)} data-cursor="hover" className="link-underline">
                  {label}
                </button>
              </li>
            ))}
          </ul>
          <div className="hidden font-mono text-[11px] uppercase tracking-[0.18em] md:block">
            FSD, PK <span className="tabular-nums">{time}</span>
          </div>
          <button
            onClick={() => setOpen((o) => !o)}
            className="font-mono text-[11px] uppercase tracking-[0.18em] md:hidden"
            aria-expanded={open}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-end bg-ink px-5 pb-10 text-paper md:hidden"
          >
            {LINKS.map(([id, label], i) => (
              <motion.button
                key={id}
                onClick={() => go(id)}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="border-b border-paper/15 py-3 text-left font-serif text-6xl"
              >
                {label}
              </motion.button>
            ))}
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50">
              Faisalabad, {time}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// A small ink dot that swells over anything clickable. Hidden on touch screens.
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [mode, setMode] = useState<'idle' | 'hover' | 'view'>('idle');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = (e.target as HTMLElement)?.closest?.('[data-cursor], a, button') as HTMLElement | null;
      setMode(t ? (t.dataset.cursor === 'view' ? 'view' : 'hover') : 'idle');
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);

  if (!enabled) return null;
  const size = mode === 'view' ? 84 : mode === 'hover' ? 44 : 10;
  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[90] flex items-center justify-center rounded-full bg-accent mix-blend-multiply"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: size, height: size, opacity: mode === 'hover' ? 0.35 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {mode === 'view' && (
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-paper">Open</span>
      )}
    </motion.div>
  );
}
