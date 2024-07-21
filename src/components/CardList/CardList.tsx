import { CardItem } from '../CardItem';
import { Character } from '../../types';
import { Flyout } from '../Flyout';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux.ts';
import { uncheckAllCharacters } from '../../store/slices/selected-characters-slice.ts';
import styles from './CardList.module.css';

interface CardListProps {
  results: Character[];
  currentPage: number;
}

export const CardList = ({ results, currentPage }: CardListProps) => {
  const dispatch = useAppDispatch();
  const checkedCharacters = useAppSelector((state) => state.selectedCharacters);

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
