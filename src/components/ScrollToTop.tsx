import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll to the top of the page whenever the route changes.
 *
 * Without this, React Router keeps the browser's current scroll position
 * across navigations, which means clicking a link near the bottom of one
 * page leaves the next page scrolled to that same offset (often looking
 * like a blank page). Skips anchor jumps (URL with #hash) so in-page
 * scroll-to-section still works.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
