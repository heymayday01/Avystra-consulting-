import { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

/**
 * Hook to trigger manual invalidation on interaction to work with frameloop="demand"
 * This ensures native-speed rendering has 0 latency during scrolling, resizing, and mouse moves,
 * while stopping all CPU and GPU usage when the 3D scene is out of view.
 */
export function useDemandRendering(isVisible: boolean) {
  const { invalidate } = useThree();

  // Continually invalidate frames while visible to allow procedural animations
  // (dust, core rotation, camera lerp) to render at maximum native display refresh rate.
  useFrame(() => {
    if (isVisible) {
      invalidate();
    }
  });

  useEffect(() => {
    if (!isVisible) return;

    // Trigger immediate, non-debounced invalidation on scroll/resize/mousemove
    // to keep rendering synchronized precisely with native viewport changes.
    const handleInteraction = () => {
      invalidate();
    };

    window.addEventListener('scroll', handleInteraction, { passive: true });
    window.addEventListener('mousemove', handleInteraction, { passive: true });
    window.addEventListener('resize', handleInteraction, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('resize', handleInteraction);
    };
  }, [isVisible, invalidate]);
}

