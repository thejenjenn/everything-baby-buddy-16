import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
  delay?: number; // in ms
}

// Simple, reusable scroll-reveal wrapper
// - Fades in and slides up slightly
// - Respects reduced motion automatically via global CSS
// - Plays once when it enters the viewport
// - Elements already visible at mount are marked visible BEFORE first paint,
//   so above-the-fold content on a fresh page load or route change never
//   flashes invisible (was causing the "glitch on tap" during navigation).
const Reveal: React.FC<RevealProps> = ({ as = "div", delay = 0, className = "", style, children, ...rest }) => {
  const Comp: any = as;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  // Runs synchronously after DOM mutations but before the browser paints,
  // so a "yes I'm already in the viewport" element skips the opacity-0 frame.
  useLayoutEffect(() => {
    const el = ref.current as HTMLElement | null;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) setVisible(true);
  }, []);

  useEffect(() => {
    const el = ref.current as Element | null;
    if (!el) return;
    if (visible) return; // already handled synchronously

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target); // play once
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <Comp
      ref={ref}
      className={[
        visible ? "animate-fade-in" : "opacity-0 translate-y-4",
        "will-change-transform",
        className,
      ].join(" ")}
      style={{ animationDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Comp>
  );
};

export default Reveal;
