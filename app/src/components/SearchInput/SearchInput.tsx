import { ChangeEvent, FormEvent } from 'react';
import styles from './SearchInput.module.css';

type SearchInputProps = {
  defaultValue: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const SearchInput = ({
  defaultValue,
  handleSubmit,
  handleInputChange,
}: SearchInputProps) => (
  <form className={styles.search} onSubmit={handleSubmit}>
    <button className={styles.btn} data-testid='search-btn'>
      Search
    </button>
    <input
      defaultValue={defaultValue}
      onChange={handleInputChange}
      placeholder='Search by name...'
      className={styles.input}
    />
  </form>
);
