import { SearchInput } from '../search-input';
import style from './header.module.css';

interface HeaderProps {
  searchQuery: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
}

export const Header = ({ searchQuery, handleInputChange, handleClick }: HeaderProps) => (
  <header className={style.header}>
    <div className={style.container}>
      <SearchInput
        searchQuery={searchQuery}
        handleInputChange={handleInputChange}
        handleClick={handleClick}
      />
    </div>
  </header>
);
