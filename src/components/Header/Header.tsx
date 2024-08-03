import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useRef } from 'react';
import { SearchInput } from '../SearchInput';
import { ThemeToggle } from '../ThemeToggle';
import style from './Header.module.css';

export const Header = () => {
  const inputRef = useRef('');
  const { push, pathname, query } = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    inputRef.current = e.target.value;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('searchQuery', inputRef.current);
    push({
      pathname: pathname,
      query: { page: 1, name: inputRef.current },
    });
  };

  return (
    <header className={style.header}>
      <div className={style.container}>
        <SearchInput
          defaultValue={query.name as string}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        <ThemeToggle />
      </div>
    </header>
  );
};
