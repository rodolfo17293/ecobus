import { useState, useEffect, useRef } from "react";

/* useReveal — reveals an element once when it scrolls into view.
   Primary path: IntersectionObserver (threshold 0.15, rootMargin -10% bottom).
   Fallbacks: immediate check on mount + passive scroll/resize listener, so it
   still works in environments where IO callbacks aren't delivered. Animates once. */
export function useReveal(options) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;

    const reveal = () => {
      if (done) return;
      done = true;
      setVisible(true);
      cleanup();
    };

    // Mirrors rootMargin '0px 0px -10% 0px': element counts as in-view once its
    // top crosses 90% of the viewport height.
    const inView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top <= vh * 0.9 && r.bottom >= 0;
    };

    let obs = null;
    const onScroll = () => { if (inView()) reveal(); };

    function cleanup() {
      if (obs) obs.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }

    if (typeof IntersectionObserver !== "undefined") {
      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => { if (entry.isIntersecting) reveal(); });
        },
        { threshold: 0.15, rootMargin: "0px 0px -10% 0px", ...(options || {}) }
      );
      obs.observe(el);
    }

    // Fallback path — covers above-the-fold content and IO-less environments.
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    if (inView()) reveal();

    return cleanup;
  }, []);
  return [ref, visible];
}

/* Reveal — wraps content; adds .reveal and .is-visible when scrolled into view.
   delay: ms applied as transitionDelay on this block. */
export function Reveal({ as = "div", delay = 0, className = "", children, style, ...rest }) {
  const [ref, visible] = useReveal();
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={"reveal " + (visible ? "is-visible " : "") + className}
      style={{ transitionDelay: (delay || 0) + "ms", ...(style || {}) }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* useCountUp — counts from 0 to `end` over `duration` ms with ease-out, once,
   when `start` becomes true. Honors prefers-reduced-motion (jumps to end). */
export function useCountUp(end, start, duration = 1200) {
  const [value, setValue] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (!start || done.current) return;
    done.current = true;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(end);
      return;
    }
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setValue(end * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setValue(end);
    };
    raf = requestAnimationFrame(tick);
    // Safety net: if rAF is throttled/frozen, guarantee the final value lands.
    const safety = setTimeout(() => setValue(end), duration + 400);
    return () => { cancelAnimationFrame(raf); clearTimeout(safety); };
  }, [start, end, duration]);
  return value;
}

/* Picture — responsive image. Serves the lightweight WebP to viewports
   ≤1024px and the full-res PNG to large screens. `name` is the filename
   without extension; both `{name}.png` and `{name}_min.webp` exist at the CDN.
   By default fills its (sized) wrapper; the wrapper provides the aspect ratio
   so nothing shifts during load. Pass eager for above-the-fold images. */
export const ASSET_BASE = "https://d8j0ntlcm91z4.cloudfront.net/user_3EsEl3qJ3ZKxReLoGNp3Ln0RKSf/";

export function Picture({ name, alt = "", className = "", width, height, eager = false, fill = true, pictureClassName = "" }) {
  const pCls = (fill ? "block w-full h-full " : "") + pictureClassName;
  return (
    <picture className={pCls.trim() || undefined}>
      <source media="(max-width: 1024px)" srcSet={ASSET_BASE + name + "_min.webp"} type="image/webp" />
      <img
        src={ASSET_BASE + name + ".png"}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : undefined}
        width={width}
        height={height}
        className={className}
      />
    </picture>
  );
}
