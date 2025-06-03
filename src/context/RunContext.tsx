import React, { createContext, useContext, useState, useEffect } from 'react';
import { RunData } from '../types';

type RunContextType = {
  runData: RunData;
  startRun: () => void;
  pauseRun: () => void;
  resetRun: () => void;
  toggleUnit: () => void;
};

const initialRunData: RunData = {
  distance: {
    value: 0,
    unit: 'km',
  },
  time: {
    hours: 0,
    minutes: 0,
    seconds: 0,
    isRunning: false,
  },
  route: {
    coordinates: [],
    currentPosition: {
      lat: 40.7128,
      lng: -74.0060,
    },
  },
};

const RunContext = createContext<RunContextType | undefined>(undefined);

export const RunProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [runData, setRunData] = useState<RunData>(initialRunData);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const updateTime = () => {
    setRunData((prevData) => {
      let { hours, minutes, seconds } = prevData.time;
      seconds++;
      
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
      }
      
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
      
      return {
        ...prevData,
        time: { ...prevData.time, hours, minutes, seconds },
      };
    });
  };

  const updateDistance = () => {
    setRunData((prevData) => {
      // Simulate distance increase (0.01 to 0.05 km per second)
      const increase = Math.random() * 0.04 + 0.01;
      const newValue = prevData.distance.value + increase;
      
      return {
        ...prevData,
        distance: { ...prevData.distance, value: Number(newValue.toFixed(2)) },
      };
    });
  };

  const updateRoute = () => {
    setRunData((prevData) => {
      // Simulate small movement in random direction
      const latChange = (Math.random() - 0.5) * 0.001;
      const lngChange = (Math.random() - 0.5) * 0.001;
      
      const newLat = prevData.route.currentPosition.lat + latChange;
      const newLng = prevData.route.currentPosition.lng + lngChange;
      
      const newCoordinates = [
        ...prevData.route.coordinates,
        { lat: newLat, lng: newLng },
      ].slice(-100); // Keep only the last 100 points
      
      return {
        ...prevData,
        route: {
          coordinates: newCoordinates,
          currentPosition: { lat: newLat, lng: newLng },
        },
      };
    });
  };

  useEffect(() => {
    if (runData.time.isRunning) {
      const interval = setInterval(() => {
        updateTime();
        updateDistance();
        updateRoute();
      }, 1000);
      
      setTimer(interval);
    } else if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [runData.time.isRunning]);

  const startRun = () => {
    setRunData((prevData) => ({
      ...prevData,
      time: { ...prevData.time, isRunning: true },
    }));
  };

  const pauseRun = () => {
    setRunData((prevData) => ({
      ...prevData,
      time: { ...prevData.time, isRunning: false },
    }));
  };

  const resetRun = () => {
    setRunData(initialRunData);
  };

  const toggleUnit = () => {
    setRunData((prevData) => {
      const currentUnit = prevData.distance.unit;
      const newUnit = currentUnit === 'km' ? 'mi' : 'km';
      
      // Convert value based on unit change
      let newValue = prevData.distance.value;
      if (currentUnit === 'km' && newUnit === 'mi') {
        newValue = Number((prevData.distance.value * 0.621371).toFixed(2));
      } else if (currentUnit === 'mi' && newUnit === 'km') {
        newValue = Number((prevData.distance.value * 1.60934).toFixed(2));
      }
      
      return {
        ...prevData,
        distance: {
          value: newValue,
          unit: newUnit,
        },
      };
    });
  };

  return (
    <RunContext.Provider value={{ runData, startRun, pauseRun, resetRun, toggleUnit }}>
      {children}
    </RunContext.Provider>
  );
};

export const useRun = (): RunContextType => {
  const context = useContext(RunContext);
  if (context === undefined) {
    throw new Error('useRun must be used within a RunProvider');
  }
  return context;
};