import { useState, useEffect } from 'react';

const useLocalStorage = (initialValue, key) => {
  const getValue = () => {
    const storage = localStorage.getItem(key);
    if (storage) return JSON.parse(storage);
    return initialValue;
  };

  const [value, setValue] = useState(getValue);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setValue];
};

export default useLocalStorage;
