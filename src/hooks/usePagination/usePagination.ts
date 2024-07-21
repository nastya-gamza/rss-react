import { generatePageArray } from '../../utils/pagination.ts';
import { useAppSelector } from '../useRedux.ts';

const PAGINATION_PAGE_QUANTITY = 7;

export const usePagination = (
  currentPage: number,
  handleCurrentPage: (page: number) => void,
) => {
  const totalPages = useAppSelector((state) => state.currentPage.info.pages);

  const getPaginationRange = ({
    totalPages,
    currentPage,
  }: {
    totalPages: number;
    currentPage: number;
  }) => {
    const startingHalfOfPages = Math.ceil(PAGINATION_PAGE_QUANTITY / 2);
    const endingHalfOfPages = Math.floor(PAGINATION_PAGE_QUANTITY / 2);

    if (totalPages < PAGINATION_PAGE_QUANTITY) {
      return { start: 1, end: totalPages + 1 };
    }

    if (currentPage >= 1 && currentPage <= startingHalfOfPages) {
      return { start: 1, end: PAGINATION_PAGE_QUANTITY + 1 };
    }

    if (currentPage + endingHalfOfPages >= totalPages) {
      return {
        start: totalPages - PAGINATION_PAGE_QUANTITY + 1,
        end: totalPages + 1,
      };
    }

    return {
      start: currentPage - startingHalfOfPages + 1,
      end: currentPage + endingHalfOfPages + 1,
    };
  };

  const paginationRange = getPaginationRange({ totalPages, currentPage });
  const arrayOfPagesNumber = generatePageArray(
    paginationRange.start,
    paginationRange.end,
  );

  const handlePrevPage = () => handleCurrentPage(currentPage - 1);

  const handleNextPage = () => handleCurrentPage(currentPage + 1);

  return { arrayOfPagesNumber, totalPages, handlePrevPage, handleNextPage };
};
