'use client';

import { ChangeEvent, FormEvent, useRef } from 'react';
import { SearchInput } from '../SearchInput';
import { ThemeToggle } from '../ThemeToggle';
import style from './Header.module.css';
import { useRouter, useSearchParams } from 'next/navigation';

export const Header = () => {
  const inputRef = useRef('');
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const searchName = searchParams.get('name');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    inputRef.current = e.target.value;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('searchQuery', inputRef.current);
    push(`/?page=1&name=${inputRef.current}`);
  };

  return (
    <header className={style.header}>
      <div className={style.container}>
        <SearchInput
          defaultValue={searchName ?? ''}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        <ThemeToggle />
      </div>
    </header>
  );
};
