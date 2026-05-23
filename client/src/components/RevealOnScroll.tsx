import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
}

export default function RevealOnScroll({
  children,
  fallback = null,
  rootMargin = "200px",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) return;

    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return <div ref={ref}>{isVisible ? children : fallback}</div>;
}
