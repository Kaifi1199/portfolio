'use client';
import { useEffect, useRef } from 'react';
import { gsap } from './motion';
import SectionHead from './SectionHead';

const STATEMENT =
  'Most of what I build sits between a web interface and a model. I like that seam: getting an LLM to do something useful is half the job, the other half is making it feel obvious to the person using it. My final year project, AasaanLearn, came out of that, a set of reading and listening tools for students who learn differently.';

const NOTES = [
  ['Now', 'Graduated with a BS in Artificial Intelligence from National Textile University in 2026, and open to full-time roles.'],
  ['Usually', 'Next.js on the front, FastAPI or API routes behind it, Firebase or MongoDB for data, and an LLM wherever it earns its place.'],
  ['Lately', 'Automation with n8n and LLM APIs: resume parsing, job matching, and workflows that stitch Gmail and WhatsApp together.'],
];

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ab-w',
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: { trigger: '.ab-text', start: 'top 78%', end: 'bottom 45%', scrub: true },
        },
      );
      gsap.from('.ab-note', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.ab-notes', start: 'top 85%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="stack-panel relative bg-ink px-5 py-28 text-paper md:px-10 md:py-40">
      <SectionHead index="02" title="About me" aside="The short version" dark />

      <p className="ab-text mt-16 max-w-[26ch] font-serif text-[8.5vw] leading-[1.05] tracking-[-0.015em] md:ml-[8.33%] md:text-[4.2vw]">
        {STATEMENT.split(' ').map((w, i) => (
          <span key={i} className={`ab-w ${w.startsWith('AasaanLearn') ? 'italic text-accent' : ''}`}>
            {w}{' '}
          </span>
        ))}
      </p>

      <div className="ab-notes mt-24 grid grid-cols-12 gap-x-4 gap-y-10 md:ml-[8.33%]">
        {NOTES.map(([k, v]) => (
          <div key={k} className="ab-note col-span-12 border-t border-paper/20 pt-5 md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{k}</p>
            <p className="mt-3 max-w-[34ch] text-[15px] leading-relaxed text-paper/75">{v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
