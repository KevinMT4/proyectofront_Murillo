import React, { useRef, useEffect } from 'react';
import { useRun } from '../context/RunContext';

interface MapModuleProps {
  className?: string;
  compact?: boolean;
}

const MapModule: React.FC<MapModuleProps> = ({ className = '', compact = false }) => {
  const { runData } = useRun();
  const { coordinates, currentPosition } = runData.route;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set the scale to fit all coordinates
    const padding = 20;
    let minLat = currentPosition.lat;
    let maxLat = currentPosition.lat;
    let minLng = currentPosition.lng;
    let maxLng = currentPosition.lng;

    if (coordinates.length > 0) {
      coordinates.forEach((coord) => {
        minLat = Math.min(minLat, coord.lat);
        maxLat = Math.max(maxLat, coord.lat);
        minLng = Math.min(minLng, coord.lng);
        maxLng = Math.max(maxLng, coord.lng);
      });
    }

    minLat -= 0.001;
    maxLat += 0.001;
    minLng -= 0.001;
    maxLng += 0.001;

    const latLngToXY = (lat: number, lng: number): [number, number] => {
      const x = ((lng - minLng) / (maxLng - minLng)) * (canvas.width - 2 * padding) + padding;
      const y = canvas.height - (((lat - minLat) / (maxLat - minLat)) * (canvas.height - 2 * padding) + padding);
      return [x, y];
    };

    // Draw grid with gradient
    const gridGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gridGradient.addColorStop(0, 'rgba(238, 238, 238, 0.1)');
    gridGradient.addColorStop(1, 'rgba(238, 238, 238, 0.2)');
    ctx.strokeStyle = gridGradient;
    ctx.lineWidth = 0.5;

    for (let i = 0; i <= 4; i++) {
      const x = padding + (i / 4) * (canvas.width - 2 * padding);
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, canvas.height - padding);
      ctx.stroke();

      const y = padding + (i / 4) * (canvas.height - 2 * padding);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();
    }

    // Draw route with gradient
    if (coordinates.length > 1) {
      const routeGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      routeGradient.addColorStop(0, '#FF0000');
      routeGradient.addColorStop(1, '#D10000');
      
      ctx.strokeStyle = routeGradient;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      ctx.beginPath();
      const [startX, startY] = latLngToXY(coordinates[0].lat, coordinates[0].lng);
      ctx.moveTo(startX, startY);

      for (let i = 1; i < coordinates.length; i++) {
        const [x, y] = latLngToXY(coordinates[i].lat, coordinates[i].lng);
        ctx.lineTo(x, y);
      }

      ctx.stroke();
    }

    // Draw current position with glow effect
    const [currentX, currentY] = latLngToXY(currentPosition.lat, currentPosition.lng);
    
    // Outer glow
    const gradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 20);
    gradient.addColorStop(0, 'rgba(255, 0, 0, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(currentX, currentY, 20, 0, Math.PI * 2);
    ctx.fill();
    
    // Pulsing circle
    ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
    const pulseSize = 12 + 4 * Math.sin(Date.now() / 200);
    ctx.beginPath();
    ctx.arc(currentX, currentY, pulseSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Center dot
    ctx.fillStyle = '#FF0000';
    ctx.shadowColor = 'rgba(255, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(currentX, currentY, 6, 0, Math.PI * 2);
    ctx.fill();

  }, [coordinates, currentPosition]);

  return (
    <div className={`bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 rounded-3xl shadow-lg backdrop-blur-sm border border-gray-100 dark:border-gray-800 overflow-hidden ${compact ? 'p-4' : 'p-6'} ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent ${compact ? 'text-lg' : 'text-xl'}`}>
          Mapa
        </h2>
        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          Seguimiento en tiempo real
        </div>
      </div>
      
      <div className="relative w-full aspect-square">
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="w-full h-full rounded-2xl bg-gray-100 dark:bg-gray-800"
        />
      </div>
      
      <div className="mt-4 text-xs font-medium text-gray-500 dark:text-gray-400 flex justify-between">
        <div>Lat: {currentPosition.lat.toFixed(6)}</div>
        <div>Lng: {currentPosition.lng.toFixed(6)}</div>
      </div>
    </div>
  );
};

export default MapModule;