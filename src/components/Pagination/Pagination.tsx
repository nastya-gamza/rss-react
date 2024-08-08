'use client';

import classNames from 'classnames';
import { usePagination } from '../../hooks';
import styles from './Pagination.module.css';

type PaginationProps = {
  totalPages: number;
};

export const Pagination = ({ totalPages }: PaginationProps) => {
  const {
    arrayOfPagesNumber,
    handlePrevPage,
    handleNextPage,
    handleCurrentPage,
    currentPage,
  } = usePagination(totalPages);

  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <button className={styles.arrowBtn} onClick={handlePrevPage}>
          {'<'}
        </button>
      )}
      {arrayOfPagesNumber.map((page) => (
        <button
          key={page}
          onClick={() => handleCurrentPage(page)}
          className={classNames(styles.paginationBtn, {
            [styles.activeBtn]: page === currentPage,
          })}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button className={styles.arrowBtn} onClick={handleNextPage}>
          {'>'}
        </button>
      )}
    </div>
  );
};
