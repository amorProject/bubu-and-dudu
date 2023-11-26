import React, { createContext, useContext, useState } from 'react';

export interface Settings {
  mouseTrail: MouseTrailSettings;
  theme?: 'rose';
} 

const defaultSettings: Settings = {
  mouseTrail: {
    enabled: true,
    shape: 'stars',
    hidden: false
  },
  theme: 'rose'
}

export interface MouseTrailSettings {
  enabled: boolean;
  shape: 'stars' | 'hearts';
  hidden: boolean;
}

interface SettingsContextProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  toggleMouseTrail: (type?: 'hide' | 'toggle', active?: boolean | 'toggle') => void;
}

const SettingsContext = createContext<SettingsContextProps | null>(null);

export const SettingsProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  function toggleMouseTrail(type: 'hide' | 'toggle' = 'toggle', active: boolean | 'toggle' = 'toggle') {
    const newMouseTrail = settings.mouseTrail;

    if (type === 'hide') {
      newMouseTrail.hidden = active === 'toggle' ? !newMouseTrail.hidden : active;
    } else if (type === 'toggle') {
      newMouseTrail.enabled = active === 'toggle' ? !newMouseTrail.enabled : active;
    }

    setSettings((prev) => {
      return {
        ...prev,
        mouseTrail: newMouseTrail
      }
    })
  }

  return (
    <SettingsContext.Provider value={{ settings, setSettings, toggleMouseTrail }}>
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