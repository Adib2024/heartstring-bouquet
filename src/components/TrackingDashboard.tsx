
import React, { useState } from 'react';
import { useTracking } from '@/contexts/TrackingContext';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

const TrackingDashboard: React.FC = () => {
  const { trackingData } = useTracking();
  const [isOpen, setIsOpen] = useState(false);

  const formatTime = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    const displayHours = hours % 24;
    const displayMinutes = minutes % 60;
    const displaySeconds = seconds % 60;
    
    return `${displayHours.toString().padStart(2, '0')}:${displayMinutes.toString().padStart(2, '0')}:${displaySeconds.toString().padStart(2, '0')}`;
  };

  const sessionDurationFormatted = formatTime(trackingData.sessionDuration);

  return (
    <>
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-romantic-500 text-white rounded-full p-3 shadow-lg hover:bg-romantic-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </button>
      </motion.div>

      {isOpen && (
        <motion.div
          className="fixed bottom-16 right-4 w-80 sm:w-96 z-50 bg-white rounded-lg shadow-xl overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 bg-romantic-100 flex justify-between items-center">
            <h3 className="font-medium text-romantic-800">Analytics Dashboard</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-romantic-600 hover:text-romantic-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="summary" className="flex-1">Summary</TabsTrigger>
              <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
              <TabsTrigger value="user" className="flex-1">User</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="p-4 max-h-80 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Session Duration</span>
                  <span className="font-mono">{sessionDurationFormatted}</span>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Page Views</h4>
                  {Object.entries(trackingData.pageViews).length > 0 ? (
                    <ul className="space-y-1">
                      {Object.entries(trackingData.pageViews).map(([page, count]) => (
                        <li key={page} className="flex justify-between text-sm">
                          <span>{page || 'Home'}</span>
                          <span>{count}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-400">No page views recorded yet</p>
                  )}
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Scroll Depth</h4>
                  <div className="h-4 bg-slate-100 rounded overflow-hidden">
                    <div 
                      className="h-full bg-romantic-400" 
                      style={{ width: `${trackingData.scrollDepth.maxDepth}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-right text-slate-500">
                    {trackingData.scrollDepth.maxDepth}% scrolled
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Interactions</h4>
                  <div className="text-sm">
                    {trackingData.clicks.length} clicks recorded
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="p-4 max-h-80 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Click Tracking</h4>
                  {trackingData.clicks.length > 0 ? (
                    <div className="max-h-32 overflow-y-auto">
                      <ul className="space-y-1">
                        {trackingData.clicks.slice(-5).map((click, index) => (
                          <li key={index} className="text-xs">
                            <span className="font-medium">{click.elementId}</span> ({click.location.x}, {click.location.y}) at {new Date(click.timestamp).toLocaleTimeString()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400">No clicks recorded yet</p>
                  )}
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Time on Page</h4>
                  {Object.entries(trackingData.timeOnPage).length > 0 ? (
                    <ul className="space-y-1">
                      {Object.entries(trackingData.timeOnPage).map(([page, seconds]) => (
                        <li key={page} className="flex justify-between text-sm">
                          <span>{page || 'Home'}</span>
                          <span>{formatTime(seconds * 1000)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-400">No time data recorded yet</p>
                  )}
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Form Progress</h4>
                  {Object.entries(trackingData.formProgress).length > 0 ? (
                    <ul className="space-y-2">
                      {Object.entries(trackingData.formProgress).map(([formId, progress]) => (
                        <li key={formId}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{formId}</span>
                            <span>{progress}%</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded overflow-hidden">
                            <div 
                              className="h-full bg-romantic-400" 
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-400">No form interaction yet</p>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="user" className="p-4 max-h-80 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Session Info</h4>
                  <div className="text-sm">
                    <div className="font-mono text-xs mb-1">ID: {trackingData.sessionId.substring(0, 8)}...</div>
                    <div>Started: {new Date(trackingData.sessionStart).toLocaleTimeString()}</div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Device Information</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span>Device</span>
                      <span>{trackingData.deviceInfo.deviceType}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Browser</span>
                      <span>{trackingData.deviceInfo.browser}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>OS</span>
                      <span>{trackingData.deviceInfo.os}</span>
                    </li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Location</h4>
                  {trackingData.userLocation ? (
                    <ul className="space-y-1 text-sm">
                      {trackingData.userLocation.city && (
                        <li className="flex justify-between">
                          <span>City</span>
                          <span>{trackingData.userLocation.city}</span>
                        </li>
                      )}
                      {trackingData.userLocation.country && (
                        <li className="flex justify-between">
                          <span>Country</span>
                          <span>{trackingData.userLocation.country}</span>
                        </li>
                      )}
                      {(trackingData.userLocation.latitude && trackingData.userLocation.longitude) && (
                        <li className="flex justify-between">
                          <span>Coordinates</span>
                          <span className="font-mono text-xs">
                            {trackingData.userLocation.latitude.toFixed(2)}, {trackingData.userLocation.longitude.toFixed(2)}
                          </span>
                        </li>
                      )}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-400">Location data unavailable</p>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      )}
    </>
  );
};

export default TrackingDashboard;
