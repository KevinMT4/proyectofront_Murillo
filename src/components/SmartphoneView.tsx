import React from 'react';
import DistanceModule from './DistanceModule';
import TimeModule from './TimeModule';
import MapModule from './MapModule';
import LoadingAnimation from './LoadingAnimation';
import { MapPin, Clock, Activity, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const SmartphoneView: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [activeTab, setActiveTab] = React.useState('all');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 overflow-auto p-4 pb-20">
        {(activeTab === 'all' || activeTab === 'distance') && (
          <DistanceModule className="mb-4" />
        )}
        
        {(activeTab === 'all' || activeTab === 'time') && (
          <TimeModule className="mb-4" />
        )}
        
        {(activeTab === 'all' || activeTab === 'route') && (
          <MapModule className="mb-4" />
        )}
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-md">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex flex-col items-center justify-center w-16 h-16 ${
              activeTab === 'all' ? 'text-red-600 dark:text-red-500' : 'text-gray-600 dark:text-gray-400'
            }`}
            aria-label="All modules"
          >
            <Activity size={24} />
            <span className="text-xs mt-1">General</span>
          </button>
          
          <button
            onClick={() => setActiveTab('distance')}
            className={`flex flex-col items-center justify-center w-16 h-16 ${
              activeTab === 'distance' ? 'text-red-600 dark:text-red-500' : 'text-gray-600 dark:text-gray-400'
            }`}
            aria-label="Distance module"
          >
            <Activity size={24} />
            <span className="text-xs mt-1">Distancia</span>
          </button>
          
          <button
            onClick={() => setActiveTab('time')}
            className={`flex flex-col items-center justify-center w-16 h-16 ${
              activeTab === 'time' ? 'text-red-600 dark:text-red-500' : 'text-gray-600 dark:text-gray-400'
            }`}
            aria-label="Time module"
          >
            <Clock size={24} />
            <span className="text-xs mt-1">Tiempo</span>
          </button>
          
          <button
            onClick={() => setActiveTab('route')}
            className={`flex flex-col items-center justify-center w-16 h-16 ${
              activeTab === 'route' ? 'text-red-600 dark:text-red-500' : 'text-gray-600 dark:text-gray-400'
            }`}
            aria-label="Route module"
          >
            <MapPin size={24} />
            <span className="text-xs mt-1" title="Distancia">Mapa</span>
          </button>
          
          <button
            onClick={toggleDarkMode}
            className="flex flex-col items-center justify-center w-16 h-16 text-gray-600 dark:text-gray-400"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            <span className="text-xs mt-1">Tema</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartphoneView