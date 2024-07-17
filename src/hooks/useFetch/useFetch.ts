import { useState } from 'react';

type CallbackFunction<T extends unknown[]> = (...args: T) => Promise<void>;

export const useFetch = <T extends unknown[]>(
  callback: CallbackFunction<T>,
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetching = async (...args: T) => {
    try {
      setIsLoading(true);
      await callback(...args);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, isError] as const;
};
