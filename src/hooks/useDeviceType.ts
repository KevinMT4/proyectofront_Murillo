import { useState, useEffect } from 'react';
import { DeviceType } from '../types';

const useDeviceType = (): DeviceType => {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < 300) {
        setDeviceType('wearable');
      } else if (width >= 300 && width < 768) {
        setDeviceType('smartphone');
      } else {
        setDeviceType('desktop');
      }
    };

    // Set initial device type
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return deviceType;
};

export default useDeviceType;