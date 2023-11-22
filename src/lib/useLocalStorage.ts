import { useEffect, useState } from "react";

export default function useLocalStorage(key: string, fallbackValue: string) {
  const [value, setValue] = useState(fallbackValue);
  useEffect(() => {
      const stored = localStorage.getItem(key);
      setValue(stored ? JSON.parse(stored) : fallbackValue);
  }, [fallbackValue, key]);

  useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
