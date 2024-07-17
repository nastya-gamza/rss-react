import { Dispatch, SetStateAction } from 'react';
import style from './Header.module.css';
import { SearchInput } from '../SearchInput';
import { ThemeToggle } from '../ThemeToggle';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  handleClick: () => void;
}

export const Header = ({
  searchQuery,
  handleClick,
  setSearchQuery,
}: HeaderProps) => (
  <header className={style.header}>
    <div className={style.container}>
      <SearchInput
        searchQuery={searchQuery}
        handleClick={handleClick}
        setSearchQuery={setSearchQuery}
      />
      <ThemeToggle />
    </div>
  </header>
);
