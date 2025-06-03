import React from 'react';
import { useRun } from '../context/RunContext';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimeModuleProps {
  className?: string;
  compact?: boolean;
}

const TimeModule: React.FC<TimeModuleProps> = ({ className = '', compact = false }) => {
  const { runData, startRun, pauseRun, resetRun } = useRun();
  const { hours, minutes, seconds, isRunning } = runData.time;

  const formatTime = (value: number): string => {
    return value.toString().padStart(2, '0');
  };

  return (
    <div className={`bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 rounded-3xl shadow-lg backdrop-blur-sm border border-gray-100 dark:border-gray-800 ${compact ? 'p-4' : 'p-6'} ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent ${compact ? 'text-lg' : 'text-xl'}`}>
          Tiempo
        </h2>
      </div>
      
      <div className="flex flex-col items-center">
        <div className={`font-bold font-mono tracking-wider bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent ${compact ? 'text-4xl' : 'text-6xl'}`}>
          {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
        </div>
        
        <div className="flex justify-center gap-4 mt-6">
          {isRunning ? (
            <button
              onClick={pauseRun}
              className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
              aria-label="Pause"
              title="Pausar"
            >
              <Pause size={24} />
            </button>
          ) : (
            <button
              onClick={startRun}
              className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
              aria-label="Start"
              title="Iniciar"
            >
              <Play size={24} />
            </button>
          )}
          
          <button
            onClick={resetRun}
            className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 hover:from-gray-300 hover:to-gray-400 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
            aria-label="Reset"
            title="Reiniciar"
          >
            <RotateCcw size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeModule;