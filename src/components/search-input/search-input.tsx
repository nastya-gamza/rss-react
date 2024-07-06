import React from 'react';
import styles from './search-input.module.css';

interface SearchProps {
  searchQuery: string;
  handleClick: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({ searchQuery, handleInputChange, handleClick }: SearchProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleClick();
  };

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <button className={styles.btn}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 32 32'
          className={styles.loupe}
        >
          <path
            fillRule='evenodd'
            d='M13.46 24.45a11.3 11.3 0 0 1-11.39-11.2A11.3 11.3 0 0 1 13.46 2.04a11.3 11.3 0 0 1 11.39 11.21c0 6.19-5.1 11.2-11.39 11.2Zm18.23 5.8-8.26-8.13a13.05 13.05 0 0 0 3.49-8.87C26.92 5.93 20.89 0 13.46 0A13.35 13.35 0 0 0 0 13.25c0 7.31 6.03 13.24 13.46 13.24 3.21 0 6.16-1.11 8.47-2.96l8.3 8.16c.4.4 1.05.4 1.46 0a1 1 0 0 0 0-1.44Z'
          />
        </svg>
      </button>
      <input
        value={searchQuery}
        onChange={handleInputChange}
        placeholder='Search for...'
        className={styles.input}
      />
    </form>
  );
};
