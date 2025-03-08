
import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Define types for our tracking data
export interface TrackingData {
  sessionId: string;
  pageViews: Record<string, number>;
  clicks: {
    elementId: string;
    timestamp: number;
    location: { x: number; y: number };
  }[];
  scrollDepth: {
    maxDepth: number;
    timestamps: { depth: number; timestamp: number }[];
  };
  timeOnPage: Record<string, number>;
  sessionDuration: number;
  sessionStart: number;
  userLocation?: {
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
  deviceInfo: {
    deviceType: string;
    browser: string;
    os: string;
  };
  mousePath: { x: number; y: number; timestamp: number }[];
  formProgress: Record<string, number>;
}

interface TrackingContextType {
  trackingData: TrackingData;
  trackPageView: (page: string) => void;
  trackClick: (elementId: string, x: number, y: number) => void;
  trackScroll: (depth: number) => void;
  trackFormProgress: (formId: string, step: number, totalSteps: number) => void;
  resetTracking: () => void;
}

const initialTrackingData: TrackingData = {
  sessionId: '',
  pageViews: {},
  clicks: [],
  scrollDepth: { maxDepth: 0, timestamps: [] },
  timeOnPage: {},
  sessionDuration: 0,
  sessionStart: 0,
  deviceInfo: {
    deviceType: '',
    browser: '',
    os: '',
  },
  mousePath: [],
  formProgress: {},
};

const TrackingContext = createContext<TrackingContextType | undefined>(undefined);

export const TrackingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trackingData, setTrackingData] = useState<TrackingData>({
    ...initialTrackingData,
    sessionId: uuidv4(),
    sessionStart: Date.now(),
  });
  const [lastActivityTime, setLastActivityTime] = useState<number>(Date.now());

  // Initialize device info on mount
  useEffect(() => {
    const detectDeviceInfo = () => {
      const userAgent = navigator.userAgent;
      let deviceType = 'desktop';
      let browser = 'unknown';
      let os = 'unknown';

      // Detect device type
      if (/Mobi|Android/i.test(userAgent)) {
        deviceType = 'mobile';
      } else if (/iPad|Tablet/i.test(userAgent)) {
        deviceType = 'tablet';
      }

      // Detect browser
      if (userAgent.indexOf('Chrome') > -1) {
        browser = 'Chrome';
      } else if (userAgent.indexOf('Safari') > -1) {
        browser = 'Safari';
      } else if (userAgent.indexOf('Firefox') > -1) {
        browser = 'Firefox';
      } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) {
        browser = 'Internet Explorer';
      } else if (userAgent.indexOf('Edge') > -1) {
        browser = 'Edge';
      }

      // Detect OS
      if (userAgent.indexOf('Windows') > -1) {
        os = 'Windows';
      } else if (userAgent.indexOf('Mac') > -1) {
        os = 'MacOS';
      } else if (userAgent.indexOf('Linux') > -1) {
        os = 'Linux';
      } else if (userAgent.indexOf('Android') > -1) {
        os = 'Android';
      } else if (userAgent.indexOf('iOS') > -1 || /iPhone|iPad|iPod/i.test(userAgent)) {
        os = 'iOS';
      }

      setTrackingData(prev => ({
        ...prev,
        deviceInfo: { deviceType, browser, os }
      }));
    };

    detectDeviceInfo();
  }, []);

  // Try to get user location
  useEffect(() => {
    const detectLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            // In a real app, you might use a geolocation service to get city/country
            setTrackingData(prev => ({
              ...prev,
              userLocation: {
                ...prev.userLocation,
                latitude,
                longitude
              }
            }));
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      }
    };

    // Fetch IP-based location from a third-party service
    const fetchIpLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data && data.country_name && data.city) {
          setTrackingData(prev => ({
            ...prev,
            userLocation: {
              ...prev.userLocation,
              country: data.country_name,
              city: data.city
            }
          }));
        }
      } catch (error) {
        console.error('Error fetching IP location:', error);
      }
    };

    detectLocation();
    fetchIpLocation();
  }, []);

  // Update session duration periodically
  useEffect(() => {
    const updateSessionDuration = () => {
      setTrackingData(prev => ({
        ...prev,
        sessionDuration: Date.now() - prev.sessionStart
      }));
    };

    const sessionInterval = setInterval(updateSessionDuration, 1000);
    return () => clearInterval(sessionInterval);
  }, []);

  // Track mouse movements
  useEffect(() => {
    let throttleTimeout: NodeJS.Timeout | null = null;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          setTrackingData(prev => ({
            ...prev,
            mousePath: [
              ...prev.mousePath.slice(-100), // Keep last 100 points to avoid excessive memory usage
              { x: e.clientX, y: e.clientY, timestamp: Date.now() }
            ]
          }));
          throttleTimeout = null;
        }, 100); // Throttle to once every 100ms
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, []);

  // Update last activity time on user action
  useEffect(() => {
    const updateActivityTime = () => {
      setLastActivityTime(Date.now());
    };

    window.addEventListener('click', updateActivityTime);
    window.addEventListener('scroll', updateActivityTime);
    window.addEventListener('keypress', updateActivityTime);
    
    return () => {
      window.removeEventListener('click', updateActivityTime);
      window.removeEventListener('scroll', updateActivityTime);
      window.removeEventListener('keypress', updateActivityTime);
    };
  }, []);

  // Track page views function
  const trackPageView = (page: string) => {
    setTrackingData(prev => {
      const currentCount = prev.pageViews[page] || 0;
      return {
        ...prev,
        pageViews: {
          ...prev.pageViews,
          [page]: currentCount + 1,
        },
        timeOnPage: {
          ...prev.timeOnPage,
          [page]: 0, // Initialize time on this page
        }
      };
    });
  };

  // Track clicks function
  const trackClick = (elementId: string, x: number, y: number) => {
    setTrackingData(prev => ({
      ...prev,
      clicks: [
        ...prev.clicks,
        { elementId, timestamp: Date.now(), location: { x, y } }
      ]
    }));
  };

  // Track scroll depth
  const trackScroll = (depth: number) => {
    setTrackingData(prev => ({
      ...prev,
      scrollDepth: {
        maxDepth: Math.max(prev.scrollDepth.maxDepth, depth),
        timestamps: [
          ...prev.scrollDepth.timestamps,
          { depth, timestamp: Date.now() }
        ]
      }
    }));
  };

  // Track form progress
  const trackFormProgress = (formId: string, step: number, totalSteps: number) => {
    const progressPercentage = Math.round((step / totalSteps) * 100);
    setTrackingData(prev => ({
      ...prev,
      formProgress: {
        ...prev.formProgress,
        [formId]: progressPercentage
      }
    }));
  };

  // Reset tracking data
  const resetTracking = () => {
    setTrackingData({
      ...initialTrackingData,
      sessionId: uuidv4(),
      sessionStart: Date.now(),
    });
  };

  // Update time on page for current page
  useEffect(() => {
    const currentPath = window.location.pathname;
    const updateTimeOnPage = () => {
      setTrackingData(prev => {
        const currentPage = currentPath;
        const currentTime = prev.timeOnPage[currentPage] || 0;
        
        return {
          ...prev,
          timeOnPage: {
            ...prev.timeOnPage,
            [currentPage]: currentTime + 1
          }
        };
      });
    };

    const timeInterval = setInterval(updateTimeOnPage, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  // Log tracking data periodically (for demo purposes)
  useEffect(() => {
    const logInterval = setInterval(() => {
      console.log('Current tracking data:', trackingData);
    }, 30000); // Log every 30 seconds
    
    return () => clearInterval(logInterval);
  }, [trackingData]);

  const value = {
    trackingData,
    trackPageView,
    trackClick,
    trackScroll,
    trackFormProgress,
    resetTracking
  };

  return (
    <TrackingContext.Provider value={value}>
      {children}
    </TrackingContext.Provider>
  );
};

export const useTracking = (): TrackingContextType => {
  const context = useContext(TrackingContext);
  if (context === undefined) {
    throw new Error('useTracking must be used within a TrackingProvider');
  }
  return context;
};
