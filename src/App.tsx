import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { RunProvider } from './context/RunContext';
import WearableView from './components/WearableView';
import SmartphoneView from './components/SmartphoneView';
import DesktopView from './components/DesktopView';
import useDeviceType from './hooks/useDeviceType';

function App() {
  const deviceType = useDeviceType();

  return (
    <ThemeProvider>
      <RunProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white transition-colors duration-300">
          {deviceType === 'wearable' && <WearableView />}
          {deviceType === 'smartphone' && <SmartphoneView />}
          {deviceType === 'desktop' && <DesktopView />}
        </div>
      </RunProvider>
    </ThemeProvider>
  );
}

export default App;