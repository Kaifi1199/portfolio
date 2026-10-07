'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { animate, stagger } from 'animejs';
import { gsap, scrollToId } from './motion';
import { PROFILE } from '@/data';

// Button that leans toward the cursor when it gets close.
function Magnetic({ children, className = '', ...rest }: any) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  return (
    <motion.a
      ref={ref}
      style={{ x, y }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.a>
  );
}

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: PROFILE.linkedin,
    icon: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z',
  },
  {
    label: 'GitHub',
    href: PROFILE.github,
    icon: 'M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3Z',
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/923346510599',
    icon: 'M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.07-.13-.27-.2-.57-.35M12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37A9.86 9.86 0 0 1 2.16 12C2.16 6.55 6.6 2.12 12.05 2.12c2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.43 9.89-9.88 9.89m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.48-8.4',
  },
  {
    label: 'Email',
    href: `mailto:${PROFILE.email}`,
    icon: 'M2 4h20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 8.6L2.4 6H2v.5l10 6.9 10-6.9V6h-.4L12 12.6Z',
  },
];

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState<'no' | 'yes' | 'fail'>('no');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ct-line > span', {
        yPercent: 110,
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      });
      gsap.from('.ct-fade', {
        opacity: 0,
        y: 24,
        duration: 1,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: root.current, start: 'top 55%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // anime.js ripple across the big headline letters, outward from the hovered letter.
  const ripple = (e: React.MouseEvent<HTMLElement>) => {
    const letters = Array.from(root.current!.querySelectorAll<HTMLElement>('.ct-ch'));
    const idx = letters.indexOf(e.target as HTMLElement);
    animate(letters, {
      translateY: [0, -14, 0],
      duration: 650,
      delay: stagger(22, { from: idx >= 0 ? idx : 'center' }),
      ease: 'outSine',
    });
  };

  // Clipboard API first; falls back to a hidden textarea + execCommand where the API is blocked
  // (older browsers, sandboxed iframes). The button only flips to "Copied" when a copy really happened.
  const copy = async () => {
    let ok = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(PROFILE.email);
        ok = true;
      }
    } catch {}
    if (!ok) {
      const ta = document.createElement('textarea');
      ta.value = PROFILE.email;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;';
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, ta.value.length);
      try {
        ok = document.execCommand('copy');
      } catch {}
      document.body.removeChild(ta);
    }
    setCopied(ok ? 'yes' : 'fail');
    setTimeout(() => setCopied('no'), 2000);
  };

  const words = ["Let's", 'build', 'something.'];

  return (
    <section id="contact" ref={root} className="stack-panel relative overflow-hidden bg-accent px-5 pb-8 pt-28 text-ink md:px-10 md:pt-40">
      <p className="ct-fade font-mono text-[11px] uppercase tracking-[0.18em]">(06) Contact</p>

      <h2 onMouseOver={ripple} className="mt-8 font-serif text-[15vw] leading-[0.86] tracking-[-0.035em] md:text-[12.5vw]" aria-label="Let's build something.">
        {words.map((w, wi) => (
          <span key={wi} aria-hidden className="ct-line block overflow-hidden pb-[0.05em] pr-[0.08em]">
            <span className={`block ${wi === 2 ? 'italic' : ''}`}>
              {w.split('').map((c, i) => (
                <span key={i} className="ct-ch inline-block">
                  {c}
                </span>
              ))}
            </span>
          </span>
        ))}
      </h2>

      <div className="mt-14 grid grid-cols-12 gap-x-4 gap-y-10">
        <div className="ct-fade col-span-12 md:col-span-6">
          <p className="max-w-[36ch] text-lg leading-snug">
            Hiring for a full-stack or AI engineering role, or have a product that needs a model wired in properly?
            Email is the fastest way to reach me.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Magnetic
              href={`mailto:${PROFILE.email}`}
              data-cursor="hover"
              className="rounded-full bg-ink px-7 py-4 font-mono text-[12px] uppercase tracking-[0.18em] text-paper"
            >
              {PROFILE.email}
            </Magnetic>
            <button
              onClick={copy}
              data-cursor="hover"
              className="relative h-[46px] w-[124px] overflow-hidden rounded-full border border-ink font-mono text-[11px] uppercase tracking-[0.18em]"
            >
              <motion.span
                className="absolute inset-0 grid place-items-center"
                animate={{ y: copied !== 'no' ? '-100%' : '0%' }}
                transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              >
                Copy
              </motion.span>
              <motion.span
                className="absolute inset-0 grid place-items-center"
                initial={{ y: '100%' }}
                animate={{ y: copied !== 'no' ? '0%' : '100%' }}
                transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              >
                {copied === 'fail' ? 'Try again' : 'Copied ✓'}
              </motion.span>
            </button>
          </div>
        </div>

        <ul className="ct-fade col-span-12 md:col-span-4 md:col-start-9">
          {SOCIALS.map((s) => (
            <li key={s.label} className="border-t border-ink/40 last:border-b">
              <a
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                data-cursor="hover"
                aria-label={s.label}
                className="group flex items-center justify-between py-4"
              >
                <span className="flex items-center gap-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-ink/40 transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-accent">
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
                      <path d={s.icon} />
                    </svg>
                  </span>
                  <span className="font-serif text-2xl transition-transform duration-300 group-hover:translate-x-1 group-hover:italic">
                    {s.label}
                  </span>
                </span>
                <span className="text-xl transition-transform duration-300 group-hover:rotate-45">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="mt-28 flex flex-col items-center gap-4 border-t border-ink/40 pt-6 text-center font-mono text-[11px] uppercase tracking-[0.18em] md:flex-row md:justify-between md:text-left">
        <span>© 2026 Muhammad Kaif</span>
        <button onClick={() => scrollToId('top')} data-cursor="hover" className="link-underline">
          Back to top ↑
        </button>
      </footer>
    </section>
  );
}
