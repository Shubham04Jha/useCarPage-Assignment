import { useEffect, useRef } from 'react';

/**
 * Custom hook for infinite scrolling using IntersectionObserver.
 * Keeps all arguments in a mutable ref so the observer is initialized only once.
 * 
 * @param {Object} params
 * @param {Function} params.callback - Function to call when sentinel is intersected
 * @param {boolean} params.hasMore - Whether there is more content to load
 * @param {boolean} params.loading - Current loading state
 */
export function useInfiniteScroll({ callback, hasMore, loading }) {
  const sentinelRef = useRef(null);
  
  // Store all shifting state/callbacks in a mutable ref
  const stateRef = useRef({ callback, hasMore, loading });

  // Update the ref contents on every single render
  useEffect(() => {
    stateRef.current = { callback, hasMore, loading };
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // Retrieve the absolute latest values from the ref at trigger time
      const { callback: currentCallback, hasMore: currentHasMore, loading: currentLoading } = stateRef.current;
      
      if (entries[0].isIntersecting && currentHasMore && !currentLoading) {
        currentCallback();
      }
    });

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
      observer.disconnect();
    };
  }, []); // Safe empty dependency array: Observer is created once on mount!

  return sentinelRef;
}
