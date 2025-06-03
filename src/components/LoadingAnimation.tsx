import React from "react";

interface LoadingAnimationProps {
  compact?: boolean;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  compact = false,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className={`relative ${compact ? "scale-75" : "scale-100"}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl blur-xl animate-pulse-slow opacity-30" />
        <div className="relative w-16 h-16 flex items-center justify-center bg-gradient-to-br from-white-500 to-white-600 rounded-2xl shadow-lg animate-bounce">
          <img
            src="https://img.icons8.com/?size=100&id=3nFQK2eI2Iq4&format=png&color=000000"
            alt="Footprints"
            className="w-8 h-8"
          />
        </div>
      </div>
      <h2
        className={`mt-4 font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent animate-pulse ${
          compact ? "text-lg" : "text-xl"
        }`}
      >
        PUMA Runnin App
      </h2>
    </div>
  );
};

export default LoadingAnimation;
