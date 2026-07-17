import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for infinite scrolling using IntersectionObserver callback ref.
 * This guarantees the observer attaches/cleans up correctly even if the sentinel
 * element is conditionally rendered.
 * 
 * @param {Object} params
 * @param {Function} params.callback - Function to call when sentinel is intersected
 * @param {boolean} params.hasMore - Whether there is more content to load
 * @param {boolean} params.loading - Current loading state
 */
export function useInfiniteScroll({ callback, hasMore, loading }) {
  // Store all shifting state/callbacks in a mutable ref
  const stateRef = useRef({ callback, hasMore, loading });

  // Update the ref contents on every single render
  useEffect(() => {
    stateRef.current = { callback, hasMore, loading };
  });

  const observerRef = useRef(null);

  // A callback ref will be called with the DOM node on mount/update,
  // and with null on unmount.
  const sentinelRef = useCallback((node) => {
    // Clean up previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (node) {
      observerRef.current = new IntersectionObserver((entries) => {
        // Retrieve the absolute latest values from the ref at trigger time
        const { callback: currentCallback, hasMore: currentHasMore, loading: currentLoading } = stateRef.current;
        
        if (entries[0].isIntersecting && currentHasMore && !currentLoading) {
          currentCallback();
        }
      });
      observerRef.current.observe(node);
    }
  }, []);

  return sentinelRef;
}
