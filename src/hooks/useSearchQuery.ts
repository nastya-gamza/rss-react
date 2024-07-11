import { useEffect, useState } from 'react';
import { getItemFromLocalStorage, setItemToLocalStorage } from '../utils';

export const useSearchQuery = (key: string) => {
  const [searchQuery, setSearchQuery] = useState(getItemFromLocalStorage(key) || '');

  useEffect(() => {
    const saveQuery = () => setItemToLocalStorage(key, searchQuery);

    window.addEventListener('beforeunload', saveQuery);

    return () => {
      window.removeEventListener('beforeunload', saveQuery);
    };
  }, [searchQuery, key]);

  return [searchQuery, setSearchQuery];
};
