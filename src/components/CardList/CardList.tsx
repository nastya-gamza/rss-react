import { CardItem } from '../CardItem';
import { Character } from '../../types';
import { Flyout } from '../Flyout';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  checkedCharactersSelector,
  uncheckAllCharacters,
} from '../../store/slices/checked-characters-slice.ts';
import { currentPageDataSelector } from '../../store/slices/current-page-data-slice.ts';
import styles from './CardList.module.css';

type CardListProps = {
  results: Character[];
};

export const CardList = ({ results }: CardListProps) => {
  const dispatch = useAppDispatch();
  const checkedCharacters = useAppSelector(checkedCharactersSelector);
  const { currentPage } = useAppSelector(currentPageDataSelector);

  const handleUncheck = () => {
    dispatch(uncheckAllCharacters());
  };

  return (
    <>
      <ul className={styles.list}>
        {results.map((character) => (
          <Link
            to={`/character/${character.id}/?page=${currentPage}`}
            key={character.id}
          >
            <CardItem character={character} />
          </Link>
        ))}
      </ul>
      <Flyout items={checkedCharacters} onClick={handleUncheck} />
    </>
  );
};
