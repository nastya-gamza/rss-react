import { ChangeEvent, FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../SearchInput';
import { ThemeToggle } from '../ThemeToggle';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux.ts';
import { setItemToLocalStorage } from '../../utils';
import {
  currentPageDataSelector,
  setCurrentPageNumber,
  setSearchQuery,
} from '../../store/slices/current-page-data-slice.ts';
import style from './Header.module.css';

export const Header = () => {
  const inputRef = useRef('');
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector(currentPageDataSelector);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    inputRef.current = e.target.value;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setItemToLocalStorage('searchQuery', inputRef.current);
    dispatch(setSearchQuery(inputRef.current));
    dispatch(setCurrentPageNumber(1));
    navigate(`/?page=${1}`);
  };

  return (
    <header className={style.header}>
      <div className={style.container}>
        <SearchInput
          defaultValue={searchQuery}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        <ThemeToggle />
      </div>
    </header>
  );
};
