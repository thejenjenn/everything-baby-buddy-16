import React, { useEffect, useRef, useState } from "react";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
  delay?: number; // in ms
}

// Simple, reusable scroll-reveal wrapper
// - Fades in and slides up slightly
// - Respects reduced motion automatically via global CSS
// - Plays once when it enters the viewport
const Reveal: React.FC<RevealProps> = ({ as = "div", delay = 0, className = "", style, children, ...rest }) => {
  const Comp: any = as;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current as Element | null;
    if (!el) return;

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
  }, []);

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
