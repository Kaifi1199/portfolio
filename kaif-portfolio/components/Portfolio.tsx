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
    // Progress bar everywhere.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to('.scroll-progress', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
      });
    });
    // Stacked cards on larger screens only: on phones, pinning fights the browser's own
    // toolbar resizing and costs frames, so phones get the plain scroll with reveals.
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const panels = gsap.utils.toArray<HTMLElement>('.stack-panel');
      const shades: HTMLElement[] = [];
      panels.forEach((p, i) => {
        gsap.set(p, { position: 'relative', zIndex: i + 1, transformOrigin: '50% 100%' });
        const next = panels[i + 1];
        if (!next) return;
        const shade = document.createElement('div');
        shade.className = 'stack-shade';
        p.appendChild(shade);
        shades.push(shade);
        ScrollTrigger.create({
          trigger: p,
          start: () => (p.offsetHeight <= window.innerHeight ? 'top top' : 'bottom bottom'),
          endTrigger: next,
          end: 'top top',
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
        const st = { trigger: next, start: 'top bottom', end: 'top top', scrub: true, invalidateOnRefresh: true };
        gsap.fromTo(p, { scale: 1 }, { scale: 0.92, ease: 'none', force3D: true, scrollTrigger: st });
        gsap.fromTo(shade, { opacity: 0 }, { opacity: 0.6, ease: 'none', scrollTrigger: { ...st } });
        gsap.set(next, { boxShadow: '0 -30px 60px -30px rgba(0,0,0,0.45)' });
      });
      ScrollTrigger.refresh();
      return () => shades.forEach((s) => s.remove());
    });
    // Phones: no pinning or sticky. Each section rises in as a rounded card, growing from
    // 90% to full width as it comes up the screen. Transform-only (GPU composited), and the
    // text is never faded, so it stays crisp and readable the whole way.
    mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
      const panels = gsap.utils.toArray<HTMLElement>('.stack-panel').slice(1);
      panels.forEach((p, i) => {
        gsap.set(p, { position: 'relative', zIndex: i + 2, borderRadius: '26px 26px 0 0', transformOrigin: '50% 0%' });
        gsap.fromTo(
          p,
          { scale: 0.9, yPercent: 0 },
          {
            scale: 1,
            ease: 'none',
            force3D: true,
            scrollTrigger: { trigger: p, start: 'top bottom', end: 'top 30%', scrub: 0.5 },
          },
        );
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
