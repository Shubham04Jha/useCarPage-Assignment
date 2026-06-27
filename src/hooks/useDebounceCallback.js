import { useCallback, useEffect, useRef } from "react";

// export function useDebouncedCallback(callback, delay) {
//   const timeoutRef = useRef(null);

//   useEffect(() => {
//     return () => clearTimeout(timeoutRef.current);
//   }, []);

//   return useCallback(
//     (...args) => {
//       clearTimeout(timeoutRef.current);

//       timeoutRef.current = setTimeout(() => {
//         callback(...args);
//       }, delay);
//     },
//     [callback, delay]
//   );
// }

export function useDebouncedCallback(callback, delay) {
  const timeoutRef = useRef(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return useCallback((...args) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  }, [delay]);
}
