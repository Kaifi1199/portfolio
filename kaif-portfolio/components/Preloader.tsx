'use client';
import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { gsap } from './motion';

// Counts 000 -> 100 with anime.js, then GSAP lifts the curtain.
export default function Preloader({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const state = { v: 0 };
    let tl: gsap.core.Timeline | null = null;
    const counter = animate(state, {
      v: 100,
      duration: reduce ? 10 : 1500,
      ease: 'inOutQuart',
      onUpdate: () => {
        const n = Math.round(state.v);
        if (num.current) num.current.textContent = String(n).padStart(3, '0');
        if (bar.current) bar.current.style.transform = `scaleX(${state.v / 100})`;
      },
      onComplete: () => {
        tl = gsap
          .timeline({ onComplete: onDone })
          .to('.pl-fade', { opacity: 0, y: -12, duration: 0.35, ease: 'power2.in' })
          .call(onReveal, [], '+=0.25')
          .to(root.current, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, '<-0.25');
      },
    });
    return () => {
      counter.pause();
      tl?.kill();
    };
  }, [onReveal, onDone]);

  return (
    <div ref={root} className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-5 py-6 text-paper md:px-10 md:py-8">
      <div className="pl-fade flex justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-paper/60">
        <span>Muhammad Kaif</span>
        <span>Portfolio / 2026</span>
      </div>
      <div className="pl-fade">
        <div className="flex items-end justify-between">
          <p className="max-w-[16ch] font-serif text-3xl italic leading-tight text-paper/80 md:text-4xl">
            Loading the good parts.
          </p>
          <span ref={num} className="font-serif text-[22vw] leading-[0.8] tabular-nums md:text-[14vw]">
            000
          </span>
        </div>
        <div className="mt-6 h-px w-full bg-paper/15">
          <div ref={bar} className="h-px origin-left scale-x-0 bg-accent" />
        </div>
      </div>
    </div>
  );
}
