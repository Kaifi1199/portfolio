'use client';
import { useCallback, useEffect, useState } from 'react';
import Preloader from './Preloader';
import { Nav, Cursor } from './Chrome';
import Hero from './Hero';
import Work from './Work';
import About from './About';
import { Experience, Skills, Education } from './Experience';
import Contact from './Contact';
import { startSmoothScroll, setScrollLocked, ScrollTrigger, gsap } from './motion';

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    startSmoothScroll();
    setScrollLocked(true);
    window.scrollTo(0, 0);
  }, []);

  // Stacked-card scroll: each section pins when it's fully in view, and the next one slides
  // up over it while the covered one sinks back (scales down and dims into the dark page).
  useEffect(() => {
    if (!ready) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const panels = gsap.utils.toArray<HTMLElement>('.stack-panel');
      panels.forEach((p, i) => {
        gsap.set(p, { position: 'relative', zIndex: i + 1, transformOrigin: '50% 100%' });
        const next = panels[i + 1];
        if (!next) return;
        ScrollTrigger.create({
          trigger: p,
          start: () => (p.offsetHeight <= window.innerHeight ? 'top top' : 'bottom bottom'),
          endTrigger: next,
          end: 'top top',
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
        gsap.fromTo(
          p,
          { scale: 1, opacity: 1, borderRadius: 0 },
          {
            scale: 0.9,
            opacity: 0.35,
            borderRadius: 28,
            ease: 'none',
            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true, invalidateOnRefresh: true },
          },
        );
        gsap.set(next, { boxShadow: '0 -30px 60px -30px rgba(0,0,0,0.45)' });
      });
      gsap.to('.scroll-progress', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
      });
      ScrollTrigger.refresh();
    });
    return () => mm.revert();
  }, [ready]);

  const reveal = useCallback(() => setReady(true), []);
  const done = useCallback(() => {
    setLoading(false);
    setScrollLocked(false);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  return (
    <div className="grain relative overflow-x-clip text-ink selection:bg-accent selection:text-paper">
      {loading && <Preloader onReveal={reveal} onDone={done} />}
      <Cursor />
      <div className="pointer-events-none fixed right-0 top-0 z-[70] h-full w-[3px] bg-ink/10">
        <div className="scroll-progress h-full w-full origin-top scale-y-0 bg-accent" />
      </div>
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <Work />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
    </div>
  );
}
