import { ChangeEvent, FormEvent, useRef } from 'react';
import { useNavigate } from '@remix-run/react';
import { SearchInput } from '../SearchInput';
import { ThemeToggle } from '../ThemeToggle';
import { useLocation } from 'react-router-dom';
import style from './Header.module.css';

export const Header = () => {
  const inputRef = useRef('');
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('name');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    inputRef.current = e.target.value;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/?page=${1}&name=${inputRef.current}`);
  };

  return (
    <header className={style.header}>
      <div className={style.container}>
        <SearchInput
          defaultValue={searchQuery ?? ''}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        <ThemeToggle />
      </div>
    </header>
  );
};
