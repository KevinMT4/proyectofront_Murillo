import React from "react";
import DistanceModule from "./DistanceModule";
import TimeModule from "./TimeModule";
import MapModule from "./MapModule";
import LoadingAnimation from "./LoadingAnimation";
import { useTheme } from "../context/ThemeContext";
import { useRun } from "../context/RunContext";
import { Sun, Moon } from "lucide-react";

const DesktopView: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { runData, startRun, pauseRun, resetRun } = useRun();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (runData.time.isRunning) {
          pauseRun();
        } else {
          startRun();
        }
      }

      if (e.code === "KeyR") {
        resetRun();
      }

      if (e.code === "KeyD") {
        toggleDarkMode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [runData.time.isRunning, startRun, pauseRun, resetRun, toggleDarkMode]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-radial from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black transition-colors duration-500 flex items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-radial from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black transition-colors duration-500">
      <div className="h-full w-full p-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-White-500 to-white-600 rounded-2xl shadow-lg">
              <img
                src="https://img.icons8.com/?size=100&id=3nFQK2eI2Iq4&format=png&color=000000"
                
                className="w-8 h-8"
              />
            </div>
            <h1 className="ml-4 text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
              PUMA Runnin App
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Atajos de teclado: Espacio (Iniciar/Pausar), R (Reiniciar), D
              (Modo Oscuro)
            </div>

            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 hover:from-gray-300 hover:to-gray-400 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-140px)]">
          <DistanceModule className="h-full" />
          <TimeModule className="h-full" />
          <MapModule className="h-full" />
        </div>
      </div>
    </div>
  );
};

export default DesktopView;
