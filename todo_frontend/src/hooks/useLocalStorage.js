import { useEffect, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * useLocalStorage syncs a state value with localStorage by key.
 */
export default function useLocalStorage(key, initialValue) {
  const readValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(readValue);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // ignore quota/security errors
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
