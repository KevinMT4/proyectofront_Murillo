import React, { useState } from 'react';
import DistanceModule from './DistanceModule';
import TimeModule from './TimeModule';
import MapModule from './MapModule';
import LoadingAnimation from './LoadingAnimation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const WearableView: React.FC = () => {
  const [activeModule, setActiveModule] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const modules = ['distance', 'time', 'route'];

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const navigatePrev = () => {
    setActiveModule((prev) => (prev === 0 ? modules.length - 1 : prev - 1));
  };

  const navigateNext = () => {
    setActiveModule((prev) => (prev === modules.length - 1 ? 0 : prev + 1));
  };

  const handleSwipe = (e: React.TouchEvent) => {
    const touchStart = e.touches[0].clientX;
    
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEnd = e.changedTouches[0].clientX;
      const diff = touchStart - touchEnd;
      
      if (diff > 50) {
        navigateNext();
      } else if (diff < -50) {
        navigatePrev();
      }
      
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchend', handleTouchEnd);
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingAnimation compact />
      </div>
    );
  }

  return (
    <div 
      className="h-full w-full flex flex-col"
      onTouchStart={handleSwipe}
    >
      <div className="flex-1 flex items-center justify-center p-2">
        {activeModule === 0 && (
          <DistanceModule compact className="w-full h-full" />
        )}
        {activeModule === 1 && (
          <TimeModule compact className="w-full h-full" />
        )}
        {activeModule === 2 && (
          <MapModule compact className="w-full h-full" />
        )}
      </div>
      
      <div className="flex justify-between items-center py-1 px-4">
        <button
          onClick={navigatePrev}
          className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300"
          aria-label="Previous module"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex gap-1">
          {modules.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === activeModule 
                  ? 'bg-red-600 dark:bg-red-500' 
                  : 'bg-gray-300 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={navigateNext}
          className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300"
          aria-label="Next module"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default WearableView