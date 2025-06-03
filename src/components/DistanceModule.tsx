import React from 'react';
import { useRun } from '../context/RunContext';
import { RotateCw } from 'lucide-react';

interface DistanceModuleProps {
  className?: string;
  compact?: boolean;
}

const DistanceModule: React.FC<DistanceModuleProps> = ({ className = '', compact = false }) => {
  const { runData, toggleUnit } = useRun();
  const { value, unit } = runData.distance;

  return (
    <div className={`bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 rounded-3xl shadow-lg backdrop-blur-sm border border-gray-100 dark:border-gray-800 ${compact ? 'p-4' : 'p-6'} ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent ${compact ? 'text-lg' : 'text-xl'}`}>
          Distancia
        </h2>
        <button 
          onClick={toggleUnit}
          className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
          aria-label="Toggle unit"
          title='Cambiar unidad de medida'
        >
          <RotateCw size={18} />
        </button>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="relative">
          <span className={`font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent ${compact ? 'text-4xl' : 'text-6xl'}`}>
            {value.toFixed(2)}
          </span>
          <span className={`absolute ml-2 text-gray-500 dark:text-gray-400 ${compact ? 'text-lg' : 'text-2xl'}`}>
            {unit}
          </span>
        </div>
        
        <p className="text-gray-500 dark:text-gray-400 text-center mt-4 font-medium">
          {unit === 'km' 
            ? `${(value * 0.621371).toFixed(2)} miles` 
            : `${(value * 1.60934).toFixed(2)} km`}
        </p>
      </div>
    </div>
  );
};

export default DistanceModule;