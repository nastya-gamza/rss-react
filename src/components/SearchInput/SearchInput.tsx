import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import styles from './SearchInput.module.css';

interface SearchProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  handleClick: () => void;
}

export const SearchInput = ({ searchQuery, setSearchQuery, handleClick }: SearchProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleClick();
  };

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <button className={styles.btn} data-testid='search-btn'>
        Search
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
