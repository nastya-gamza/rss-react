import { useState } from 'react';
import { getItemFromLocalStorage } from '../../utils';

export const useSearchQuery = (key: string) => {
  const [searchQuery, setSearchQuery] = useState<string>(getItemFromLocalStorage(key) || '');

  return [searchQuery, setSearchQuery] as const;
};
