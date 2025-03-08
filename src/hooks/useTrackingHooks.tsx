
import { useEffect, useRef, useCallback } from 'react';
import { useTracking } from '@/contexts/TrackingContext';
import { useLocation } from 'react-router-dom';

// Hook to track page views
export const usePageViewTracking = () => {
  const location = useLocation();
  const { trackPageView } = useTracking();
  const prevPathRef = useRef<string>(location.pathname);

  useEffect(() => {
    // Only track if the path has changed
    if (location.pathname !== prevPathRef.current) {
      trackPageView(location.pathname);
      prevPathRef.current = location.pathname;
    }
  }, [location.pathname, trackPageView]);
};

// Hook to track scroll depth
export const useScrollTracking = () => {
  const { trackScroll } = useTracking();
  const throttleRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (throttleRef.current) return;

      throttleRef.current = setTimeout(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        
        trackScroll(Math.round(scrollPercent));
        throttleRef.current = null;
      }, 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (throttleRef.current) clearTimeout(throttleRef.current);
    };
  }, [trackScroll]);
};

// Hook to track element clicks
export const useClickTracking = () => {
  const { trackClick } = useTracking();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      let trackableElement = target;
      
      // Find the closest trackable element (with data-track-id or id)
      while (trackableElement && !trackableElement.dataset.trackId && !trackableElement.id) {
        if (trackableElement.parentElement) {
          trackableElement = trackableElement.parentElement;
        } else {
          break;
        }
      }
      
      const elementId = trackableElement.dataset.trackId || trackableElement.id || 'unknown';
      trackClick(elementId, e.clientX, e.clientY);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [trackClick]);
};

// Hook to add tracking to a specific element
export const useTrackElement = (elementId: string) => {
  const { trackClick } = useTracking();
  
  const handleClick = useCallback((e: React.MouseEvent) => {
    trackClick(elementId, e.clientX, e.clientY);
  }, [elementId, trackClick]);
  
  return {
    onClick: handleClick,
    'data-track-id': elementId
  };
};

// Hook to track form progress
export const useFormProgressTracking = (formId: string, totalSteps: number) => {
  const { trackFormProgress } = useTracking();
  
  const trackStep = useCallback((step: number) => {
    trackFormProgress(formId, step, totalSteps);
  }, [formId, totalSteps, trackFormProgress]);
  
  return trackStep;
};

// Hook to track time on element (e.g., how long a modal is open)
export const useTimeOnElementTracking = (elementId: string) => {
  const startTimeRef = useRef<number>(0);
  const { trackingData } = useTracking();
  
  const startTracking = useCallback(() => {
    startTimeRef.current = Date.now();
  }, []);
  
  const stopTracking = useCallback(() => {
    const timeSpent = Date.now() - startTimeRef.current;
    console.log(`Time spent on ${elementId}: ${timeSpent}ms`);
    // In a real implementation, you would add this to your tracking data
    return timeSpent;
  }, [elementId]);
  
  return { startTracking, stopTracking };
};
