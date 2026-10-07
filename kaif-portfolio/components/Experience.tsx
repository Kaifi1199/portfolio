'use client';
import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { gsap } from './motion';
import { EXPERIENCE, SKILLS, EDUCATION } from '@/data';
import SectionHead from './SectionHead';

export function Experience() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.ex-row').forEach((row) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 82%' } });
        tl.from(row.querySelector('.ex-rule'), { scaleX: 0, transformOrigin: 'left', duration: 1.1, ease: 'power3.inOut' })
          .from(row.querySelectorAll('.ex-in'), { y: 30, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.07 }, 0.25);
      });
      // Progress line along the left edge, scrubbed to scroll.
      gsap.from('.ex-progress', {
        scaleY: 0,
        transformOrigin: 'top',
        ease: 'none',
        scrollTrigger: { trigger: '.ex-list', start: 'top 70%', end: 'bottom 60%', scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={root} className="stack-panel bg-paper px-5 py-28 md:px-10 md:py-40">
      <SectionHead index="03" title="Where I've worked" aside="Internships, 2025" />
      <div className="ex-list relative mt-16">
        <div className="ex-progress absolute -left-5 top-0 hidden h-full w-[2px] bg-accent md:-left-10 md:block" />
        {EXPERIENCE.map((e) => (
          <article key={e.company} className="ex-row">
            <div className="ex-rule h-px w-full bg-ink/80" />
            <div className="grid grid-cols-12 gap-x-4 gap-y-4 py-10">
              <p className="ex-in col-span-12 font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:col-span-3 md:col-start-2">
                {e.when}
              </p>
              <div className="col-span-12 md:col-span-3">
                <h3 className="ex-in pr-[0.06em] font-serif text-[2.6rem] leading-none sm:text-5xl tracking-[-0.02em]">{e.company}</h3>
                <p className="ex-in mt-3 text-[15px] italic text-muted">{e.role}</p>
              </div>
              <ul className="col-span-12 space-y-4 md:col-span-5">
                {e.points.map((pt, i) => (
                  <li key={i} className="ex-in flex gap-4 text-[15px] leading-relaxed text-ink/80">
                    <span className="font-mono text-[11px] leading-[1.9rem] text-accent">{String(i + 1).padStart(2, '0')}</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
        <div className="h-px w-full bg-ink/80" />
      </div>
    </section>
  );
}

export function Skills() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        animate(el.querySelectorAll('.sk-item'), {
          opacity: [0, 1],
          translateY: [24, 0],
          duration: 900,
          delay: stagger(22, { grid: [6, 6], from: 'first' }),
          ease: 'outQuart',
        });
        animate(el.querySelectorAll('.sk-rule'), {
          scaleX: [0, 1],
          duration: 1200,
          delay: stagger(90),
          ease: 'inOutQuart',
        });
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // anime.js "wiggle" on hover: letters hop one after another.
  const hop = (e: React.MouseEvent<HTMLElement>) => {
    animate(e.currentTarget.querySelectorAll('.sk-ch'), {
      translateY: [0, -6, 0],
      duration: 500,
      delay: stagger(18),
      ease: 'outQuad',
    });
  };

  return (
    <section ref={ref} className="stack-panel bg-paper-dark px-5 py-28 md:px-10 md:py-36">
      <SectionHead index="04" title="Tools I reach for" aside="From the resume, not a wishlist" />
      <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-6">
        {SKILLS.map((g) => (
          <div key={g.group} className="relative pt-5">
            <span className="sk-rule absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-ink" />
            <p className="sk-item font-mono text-[11px] uppercase tracking-[0.18em] text-accent opacity-0">{g.group}</p>
            <ul className="mt-5 space-y-2">
              {g.items.map((s) => (
                <li key={s} className="sk-item opacity-0">
                  <span onMouseEnter={hop} data-cursor="hover" className="inline cursor-default break-words font-serif text-xl leading-tight md:text-2xl">
                    {s.split(' ').map((word, wi) => (
                      <span key={wi} className="inline-block whitespace-nowrap">
                        {word.split('').map((c, i) => (
                          <span key={i} className="sk-ch inline-block">
                            {c}
                          </span>
                        ))}
                        {wi < s.split(' ').length - 1 && <span className="inline-block w-[0.28em]" />}
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Education() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ed-row', {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.2,
        ease: 'expo.inOut',
        stagger: 0.15,
        scrollTrigger: { trigger: '.ed-list', start: 'top 80%' },
      });
      gsap.from('.ed-badge', {
        rotate: -25,
        scale: 0.6,
        opacity: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: { trigger: '.ed-badge', start: 'top 90%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="stack-panel bg-paper px-5 py-28 md:px-10 md:py-40">
      <SectionHead index="05" title="Education" aside="Faisalabad, start to finish" />
      <div className="ed-list mt-16">
        {EDUCATION.map((ed) => (
          <div key={ed.what} className="ed-row grid grid-cols-12 items-baseline gap-x-4 gap-y-2 border-t border-ink/25 py-7">
            <p className="col-span-12 font-mono text-[11px] tracking-[0.18em] text-muted md:col-span-2 md:col-start-2">{ed.when}</p>
            <h3 className="col-span-12 font-serif text-3xl leading-tight md:col-span-4 md:text-4xl">{ed.what}</h3>
            <div className="col-span-12 md:col-span-5">
              <p className="text-[15px] text-ink/80">{ed.where}</p>
              {ed.note && <p className="mt-1 text-[15px] italic text-muted">{ed.note}</p>}
            </div>
          </div>
        ))}
        <div className="h-px w-full bg-ink/25" />
      </div>

      <div className="mt-16 flex justify-end">
        <div className="ed-badge relative grid h-44 w-44 place-items-center rounded-full bg-accent text-paper md:h-52 md:w-52">
          <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-[spin_22s_linear_infinite]">
            <defs>
              <path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
            </defs>
            <text className="fill-paper font-mono text-[12.5px] uppercase tracking-[0.2em]">
              <textPath href="#circ">Final year project · BS AI · NTU · 2026 ·</textPath>
            </text>
          </svg>
          <p className="text-center font-serif leading-none">
            <span className="block text-6xl italic">1st</span>
            <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em]">Position</span>
          </p>
        </div>
      </div>
    </section>
  );
}
