import { useEffect } from 'react';

/**
 * Custom hook to scroll the window to the top on dependency changes.
 * @param {Array} dependencies - Array of dependencies to watch
 * @param {ScrollBehavior} [behavior='smooth'] - Scroll transition behavior
 */
export function useScrollToTop(dependencies, behavior = 'instant') {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior,
    });
  }, dependencies);
}
