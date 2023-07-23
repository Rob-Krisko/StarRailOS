import { useState, useEffect } from 'react';

export function useLocalStorage() {
  const [storage, setStorage] = useState({ ...localStorage });

  useEffect(() => {
    const handleStorageChange = () => {
      setStorage({ ...localStorage });
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return storage;
}
