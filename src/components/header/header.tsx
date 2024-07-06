import { SearchInput } from '../search-input';
import style from './header.module.css';

interface HeaderProps {
  searchValue: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickClear: () => void;
}

export const Header = ({ searchValue, handleSearch, onClickClear }: HeaderProps) => {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <SearchInput
          searchValue={searchValue}
          handleSearch={handleSearch}
          onClickClear={onClickClear}
        />
      </div>
    </header>
  );
};
