import { useNavigation } from '../../hooks';
import { CardItem } from '../CardItem';
import { Error } from '../Error';
import { Character } from '../../types';
import styles from './CardList.module.css';

type CardListProps = {
  results: Character[];
};

export const CardList = ({ results }: CardListProps) => {
  const { handleNavigateToCharacter } = useNavigation();

  return results ? (
    <ul className={styles.list}>
      {results.map((character) => (
        <li
          onClick={() => handleNavigateToCharacter(character.id)}
          key={character.id}
        >
          <CardItem character={character} />
        </li>
      ))}
    </ul>
  ) : (
    <Error message={'Nothing was found :(️'} />
  );
};
