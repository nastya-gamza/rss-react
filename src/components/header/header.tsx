import { SearchInput } from '../search-input';
import style from './header.module.css';

interface HeaderProps {
  searchQuery: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
}

export const Header = ({ searchQuery, handleInputChange, handleSearch }: HeaderProps) => (
  <header className={style.header}>
    <div className={style.container}>
      <SearchInput
        searchQuery={searchQuery}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
      />
    </div>
  </header>
);
