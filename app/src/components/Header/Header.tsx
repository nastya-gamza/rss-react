import { ChangeEvent, FormEvent, useRef } from 'react';
import { SearchInput } from '../SearchInput';
import { ThemeToggle } from '../ThemeToggle';
import style from './Header.module.css';
import { useNavigation } from '../../hooks';

export const Header = () => {
  const inputRef = useRef('');
  const { name, setSearchParams } = useNavigation();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    inputRef.current = e.target.value;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('searchQuery', inputRef.current);
    setSearchParams(`/?page=${1}&name=${inputRef.current}`);
  };

  return (
    <header className={style.header}>
      <div className={style.container}>
        <SearchInput
          defaultValue={name}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        <ThemeToggle />
      </div>
    </header>
  );
};
