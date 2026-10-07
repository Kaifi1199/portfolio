'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '@/data';
import { gsap, ScrollTrigger } from './motion';
import SectionHead from './SectionHead';

// Index-style project list. Each row shows the name; the Details button opens it.
export default function Work() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.w-row').forEach((row) => {
        gsap.from(row.querySelectorAll('.w-in'), {
          yPercent: 100,
          opacity: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.05,
          scrollTrigger: { trigger: row, start: 'top 88%' },
        });
        gsap.from(row.querySelector('.w-rule'), {
          scaleX: 0,
          transformOrigin: 'left',
          duration: 1.1,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: row, start: 'top 92%' },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={root} className="stack-panel bg-paper px-5 pb-28 pt-28 md:px-10 md:pt-40">
      <SectionHead index="01" title="Selected work" aside={`${PROJECTS.length} projects, 2025 – 26`} />

      <ul className="mt-14">
        {PROJECTS.map((pr, i) => {
          const isOpen = open === i;
          return (
            <li key={pr.name} className="w-row relative">
              <div className="w-rule h-px w-full bg-ink/25" />
              <div
                onClick={() => setOpen(isOpen ? null : i)}
                className="grid w-full cursor-pointer grid-cols-12 items-center gap-x-4 py-6 md:py-8"
              >
                <span className="col-span-2 overflow-hidden font-mono text-[11px] tracking-[0.18em] text-muted md:col-span-1">
                  <span className="w-in block">{pr.no}</span>
                </span>
                <span className="col-span-10 overflow-hidden md:col-span-6">
                  <span
                    className={`w-in block font-serif text-5xl leading-[0.95] tracking-[-0.02em] transition-colors duration-300 md:text-7xl ${
                      isOpen ? 'italic text-accent' : ''
                    }`}
                  >
                    {pr.name}
                  </span>
                </span>
                <span className="col-span-7 col-start-3 mt-3 overflow-hidden text-muted md:col-span-3 md:col-start-auto md:mt-0">
                  <span className="w-in block text-sm md:text-base">
                    {pr.kind}
                    <span className="mt-1 block font-mono text-[11px] tracking-[0.18em]">{pr.year}</span>
                  </span>
                </span>
                <span className="col-span-3 mt-3 flex justify-end overflow-hidden md:col-span-2 md:mt-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen(isOpen ? null : i);
                    }}
                    data-cursor="hover"
                    aria-expanded={isOpen}
                    aria-label={`${isOpen ? 'Close' : 'Open'} ${pr.name} details`}
                    className={`w-in group flex items-center gap-3 rounded-full border py-2 pl-4 pr-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                      isOpen ? 'border-ink bg-ink text-paper' : 'border-ink/40 hover:border-ink'
                    }`}
                  >
                    <span className="hidden sm:inline">{isOpen ? 'Close' : 'Details'}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                      className={`grid h-7 w-7 place-items-center rounded-full text-base leading-none ${
                        isOpen ? 'bg-accent text-paper' : 'bg-ink text-paper'
                      }`}
                    >
                      +
                    </motion.span>
                  </button>
                </span>
              </div>

              <AnimatePresence initial={false} onExitComplete={() => ScrollTrigger.refresh()}>
                {isOpen && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    onAnimationComplete={() => ScrollTrigger.refresh()}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-12 gap-x-4 gap-y-8 pb-12">
                      <div className="col-span-12 md:col-span-6 md:col-start-2">
                        <p className="max-w-[40ch] font-serif text-2xl italic leading-snug md:text-3xl">{pr.line}</p>
                        <ul className="mt-6 space-y-3">
                          {pr.points.map((pt, k) => (
                            <motion.li
                              key={k}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.15 + k * 0.06 }}
                              className="flex gap-4 text-[15px] leading-relaxed text-ink/80"
                            >
                              <span className="mt-[0.6em] h-px w-4 shrink-0 bg-accent" />
                              {pt}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-span-12 flex flex-col justify-between gap-8 md:col-span-4 md:col-start-9">
                        <div className="flex flex-wrap gap-2">
                          {pr.stack.map((s) => (
                            <span key={s} className="rounded-full border border-ink/30 px-3 py-1 font-mono text-[11px] tracking-wide">
                              {s}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {pr.live && (
                            <a
                              href={pr.live}
                              target="_blank"
                              rel="noreferrer"
                              data-cursor="hover"
                              className="rounded-full bg-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-accent"
                            >
                              Visit live ↗
                            </a>
                          )}
                          {pr.code && (
                            <a
                              href={pr.code}
                              target="_blank"
                              rel="noreferrer"
                              data-cursor="hover"
                              className="rounded-full border border-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper"
                            >
                              Source ↗
                            </a>
                          )}
                          {!pr.live && !pr.code && (
                            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                              Demo on request
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
        <li className="h-px w-full bg-ink/25" />
      </ul>
    </section>
  );
}
