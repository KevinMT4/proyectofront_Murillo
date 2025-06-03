export interface RunData {
  distance: {
    value: number;
    unit: 'km' | 'mi';
  };
  time: {
    hours: number;
    minutes: number;
    seconds: number;
    isRunning: boolean;
  };
  route: {
    coordinates: Array<{
      lat: number;
      lng: number;
    }>;
    currentPosition: {
      lat: number;
      lng: number;
    };
  };
}

export type DeviceType = 'wearable' | 'smartphone' | 'desktop';