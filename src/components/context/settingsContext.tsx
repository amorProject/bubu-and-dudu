import React, { createContext, useContext, useState } from 'react';

export interface Settings {
  mouseTrail: MouseTrailSettings;
  theme?: 'rose'
} 

const defaultSettings: Settings = {
  mouseTrail: {
    enabled: true,
    shape: 'stars'
  },
  theme: 'rose'
}

export interface MouseTrailSettings {
  enabled: boolean;
  shape: 'stars' | 'hearts';
}

interface SettingsContextProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

const SettingsContext = createContext<SettingsContextProps | null>(null);

export const SettingsProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextProps => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};