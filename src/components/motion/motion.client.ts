import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let ctx: gsap.Context | null = null;

function animateStat(el: HTMLElement) {
  const target = Number(el.dataset.target || 0);
  const suffix = el.dataset.suffix || '';
  const locale = document.documentElement.lang === 'ar' ? 'ar' : 'en-US';
  const state = { value: 0 };

  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () =>
      gsap.to(state, {
        value: target,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = Math.round(state.value).toLocaleString(locale) + suffix;
        },
      }),
  });
}

/**
 * Scroll-triggered reveals, driven entirely by markup already in place
 * ([data-reveal] / [data-reveal-stagger] on section wrappers). Wrapped in
 * matchMedia so with reduced-motion preferred, this branch never runs at
 * all — content just renders at its normal, final, visible state (it's
 * never hidden by default; gsap.set() below only applies the hidden
 * starting point right before animating, inside this gated branch).
 *
 * Trigger detection (ScrollTrigger.create + onEnter) is deliberately kept
 * separate from the animation itself (plain gsap.to with stagger) rather
 * than passing `scrollTrigger` directly into a staggered multi-target
 * tween — the latter is a known source of tweens settling at a non-zero
 * residual transform on some targets instead of fully completing.
 */
function initAnimations() {
  ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.set(el, { opacity: 0, y: 24 });
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }),
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal-stagger]').forEach((group) => {
        const children = Array.from(group.children) as HTMLElement[];
        if (!children.length) return;
        gsap.set(children, { opacity: 0, y: 24 });
        ScrollTrigger.create({
          trigger: group,
          start: 'top 88%',
          once: true,
          onEnter: () => gsap.to(children, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08 }),
        });
      });

      gsap.utils.toArray<HTMLElement>('.stat__value').forEach((el) => animateStat(el as HTMLElement));
    });
  });
}

function cleanup() {
  ctx?.revert();
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

// astro:page-load fires on the initial load AND after every View
// Transitions navigation — covers both cases with one listener.
document.addEventListener('astro:page-load', initAnimations);
// Old DOM is about to be swapped out — kill its ScrollTriggers before the
// next page's initAnimations() runs, or triggers pile up across navigations.
document.addEventListener('astro:before-swap', cleanup);
