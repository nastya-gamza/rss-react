import { ChangeEvent, FormEvent } from 'react';
import SearchIcon from '/public/icons/search.svg?react';
import styles from './SearchInput.module.css';

interface SearchProps {
  searchQuery: string;
  handleClick: () => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({ searchQuery, handleInputChange, handleClick }: SearchProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleClick();
  };

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <button className={styles.btn}>
        <SearchIcon className={styles.loupe} />
      </button>
      <input
        value={searchQuery}
        onChange={handleInputChange}
        placeholder='Search by name...'
        className={styles.input}
      />
    </form>
  );
};
