'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export const useNavigation = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchName = searchParams.get('name');
  const page = searchParams.get('page');
  const character = searchParams.get('character');

  const currentPage = page ? Number(page) : 1;
  const name = typeof searchName === 'string' ? searchName : '';

  const handleCurrentPage = (page: number) => {
    if (pathname === '/') {
      push(`?page=${page}&name=${name}`);
    }
  };

  const handleNavigate = () => {
    if (character) {
      push(`?page=${currentPage}&name=${name}`);
    }
  };

  const handleNavigateToCharacter = (id: number) => {
    if (!character) {
      push(`?page=${currentPage}&name=${name}&character=${id}`);
    }
  };

  return {
    currentPage,
    handleNavigate,
    handleCurrentPage,
    handleNavigateToCharacter,
  };
};
