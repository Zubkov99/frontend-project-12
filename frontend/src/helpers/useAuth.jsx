import { useState } from 'react';

const useAuth = (initialValue, localStorageKey) => {
  const getValue = () => {
    const storage = localStorage.getItem(localStorageKey);
    if (storage) return JSON.parse(storage);
    return initialValue;
  };

  const [userData, setLocalData] = useState(getValue);

  const mapping = {
    login(data) {
      setLocalData(data);
      localStorage.setItem(localStorageKey, JSON.stringify(data));
    },
    logout() {
      localStorage.setItem(localStorageKey, JSON.stringify(''));
      setLocalData('');
    },
  };

  return [mapping.login, mapping.logout, userData];
};

export default useAuth;
