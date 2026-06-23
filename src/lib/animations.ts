/**
 * Custom ultra-premium cubic-bezier(0.16, 1, 0.3, 1) evaluator
 * Extremely lightweight and highly performant
 */
export function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  return function (t: number) {
    if (t === 0 || t === 1) return t;
    let low = 0, high = 1;
    // 14 iterations of binary search is extremely fast and mathematically precise
    for (let i = 0; i < 14; i++) {
      const u = (low + high) / 2;
      const x = 3 * (1 - u) * (1 - u) * u * x1 + 3 * (1 - u) * u * u * x2 + u * u * u;
      if (x > t) {
        high = u;
      } else {
        low = u;
      }
    }
    const u = (low + high) / 2;
    return 3 * (1 - u) * (1 - u) * u * y1 + 3 * (1 - u) * u * u * y2 + u * u * u;
  };
}

export const elegantEase = cubicBezier(0.16, 1, 0.3, 1);

/**
 * Checks system preferences for reduced motion
 */
export function getPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
