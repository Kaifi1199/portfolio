'use client';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, scrollToId } from './motion';

const MARQUEE = ['Next.js', 'FastAPI', 'LLM pipelines', 'n8n automation', 'Firebase', 'MongoDB', 'NLP', 'Flutter', 'TypeScript', 'Python'];

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ready || !root.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.from('.h-line > span', { yPercent: 115, rotate: 3, duration: 1.4, stagger: 0.09 })
        .from('.h-rule', { scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'power3.inOut' }, 0.2)
        .from('.h-meta', { y: 18, opacity: 0, duration: 0.9, stagger: 0.06 }, 0.55)
        .from('.h-star', { rotate: -180, scale: 0, duration: 1.4 }, 0.4);

      // Gentle parallax as you leave the hero.
      gsap.to('.h-name', {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.h-star', {
        rotate: 220,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });

      // Marquee: constant drift, nudged faster by scroll velocity.
      const loop = gsap.to('.mq-track', { xPercent: -50, duration: 38, ease: 'none', repeat: -1 });
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: 'max',
        onUpdate: (self) => {
          const v = Math.min(Math.abs(self.getVelocity()) / 250, 6);
          gsap.to(loop, { timeScale: 1 + v, duration: 0.2, overwrite: true });
          gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.2 });
        },
      });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section id="top" ref={root} className="stack-panel relative flex flex-col overflow-hidden bg-paper pt-24 md:min-h-[100svh] md:justify-end md:pt-28">
      <div className="px-5 md:px-10">
        <div className="mb-6 grid grid-cols-12 gap-4 font-mono md:mb-8 text-[11px] uppercase tracking-[0.18em] text-muted">
          <p className="h-meta col-span-6 md:col-span-3">(Portfolio — 2026)</p>
          <p className="h-meta col-span-6 text-right md:col-span-3 md:col-start-10">
            <span className="mr-2 inline-block h-[7px] w-[7px] translate-y-[-1px] rounded-full bg-accent" />
            Open to full-time roles
          </p>
        </div>

        <h1 className="h-name font-serif leading-[0.86] tracking-[-0.035em] text-ink">
          <span className="h-line block overflow-hidden pb-[0.06em]">
            <span className="block pr-[0.06em] text-[16.5vw] md:text-[15.5vw]">Muhammad</span>
          </span>
          <span className="h-line block overflow-hidden pb-[0.06em]">
            <span className="flex items-end gap-[3vw] text-[16.5vw] md:text-[15.5vw]">
              <span className="pr-[0.08em] italic">Kaif</span>
              <svg
                className="h-star mb-[2.2vw] h-[9vw] w-[9vw] shrink-0 text-accent md:h-[7vw] md:w-[7vw]"
                viewBox="0 0 100 100"
                aria-hidden
              >
                <path
                  fill="currentColor"
                  d="M50 0c3 30 20 47 50 50-30 3-47 20-50 50-3-30-20-47-50-50C30 47 47 30 50 0Z"
                />
              </svg>
            </span>
          </span>
        </h1>

        <div className="h-rule mt-6 h-px w-full bg-ink/80" />

        <div className="grid grid-cols-12 gap-x-4 gap-y-6 py-7 md:py-9">
          <p className="h-meta col-span-12 font-mono text-[11px] uppercase tracking-[0.18em] md:col-span-3">
            Full Stack AI Engineer
            <br />
            <span className="text-muted">Faisalabad, Pakistan</span>
          </p>
          <p className="h-meta col-span-12 max-w-[34ch] text-xl leading-snug text-ink md:col-span-5 md:text-2xl">
            I build web products with a model somewhere inside them, and I care just as much about the
            front end people actually touch.
          </p>
          <div className="h-meta col-span-12 flex items-end md:col-span-3 md:col-start-10 md:justify-end">
            <button
              onClick={() => scrollToId('work')}
              data-cursor="hover"
              className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em]"
            >
              See selected work
              <span className="grid h-9 w-9 place-items-center rounded-full border border-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-paper">
                ↓
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="h-meta border-y border-ink/80 bg-ink py-3 text-paper">
        <div className="mq-track flex w-max whitespace-nowrap">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
              {MARQUEE.map((w) => (
                <span key={w + k} className="flex items-center font-serif text-2xl italic md:text-3xl">
                  <span className="px-5 md:px-6">{w}</span>
                  <svg viewBox="0 0 100 100" className="h-3.5 w-3.5 shrink-0 text-accent md:h-4 md:w-4" aria-hidden>
                    <path fill="currentColor" d="M50 0c3 30 20 47 50 50-30 3-47 20-50 50-3-30-20-47-50-50C30 47 47 30 50 0Z" />
                  </svg>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
