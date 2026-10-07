'use client';
import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

// Section title whose letters drop in with anime.js the first time it scrolls into view.
export default function SectionHead({
  index,
  title,
  aside,
  dark = false,
}: {
  index: string;
  title: string;
  aside?: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const letters = el.querySelectorAll('.sh-l');
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        animate(letters, {
          translateY: ['105%', '0%'],
          rotate: [8, 0],
          duration: 1100,
          delay: stagger(28),
          ease: 'outExpo',
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-12 items-end gap-x-4">
      <p className={`col-span-12 mb-3 font-mono text-[11px] uppercase tracking-[0.18em] md:col-span-1 md:mb-2 ${dark ? 'text-paper/50' : 'text-muted'}`}>
        ({index})
      </p>
      <h2 className="col-span-12 font-serif text-[12vw] leading-[0.9] tracking-[-0.03em] md:col-span-8 md:text-[7.5vw]" aria-label={title}>
        {title.split(' ').map((w, wi) => (
          <span key={wi} aria-hidden className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] pr-[0.06em] align-bottom">
            {w.split('').map((c, ci) => (
              <span key={ci} className={`sh-l inline-block translate-y-[105%] ${wi % 2 === 1 ? 'italic' : ''}`}>
                {c}
              </span>
            ))}
          </span>
        ))}
      </h2>
      {aside && (
        <p className={`col-span-12 mt-3 font-mono text-[11px] uppercase tracking-[0.18em] md:col-span-3 md:mb-3 md:mt-0 md:text-right ${dark ? 'text-paper/50' : 'text-muted'}`}>
          {aside}
        </p>
      )}
    </div>
  );
}
