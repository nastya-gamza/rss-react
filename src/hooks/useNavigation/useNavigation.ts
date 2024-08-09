import { useRouter } from 'next/router';

export const useNavigation = () => {
  const { query, pathname, push } = useRouter();
  const currentPage = query.page ? Number(query.page) : 1;
  const name = typeof query.name === 'string' ? query.name : '';

  const handleCurrentPage = (page: number) => {
    if (pathname === '/') {
      push(`?page=${page}&name=${name}`);
    }
  };

  const handleNavigate = () => {
    if (query.character) {
      push(`?page=${currentPage}&name=${name}`);
    }
  };

  const handleNavigateToCharacter = (id: number) => {
    if (!query.character) {
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
