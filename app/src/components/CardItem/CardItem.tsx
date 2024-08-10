import { useLocation } from '@remix-run/react';
import { Character } from '../../types';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  checkedCharactersSelector,
  setCheckedCharacters,
} from '~/src/store/slices/checkedCharactersSlice';
import { Checkbox } from '~/src/components/Checkbox/Checkbox';
import styles from './CardItem.module.css';

type CardItemProps = {
  character: Character;
};

export const CardItem = ({ character }: CardItemProps) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const checkedCharacters = useAppSelector(checkedCharactersSelector);
  const isChecked = checkedCharacters.some(({ id }) => id === character.id);

  const handleCheckboxChange = () => {
    dispatch(setCheckedCharacters(character));
  };

  return (
    <li
      className={classNames(styles.card, {
        [styles.noHover]: pathname.includes('character'),
      })}
      data-testid='card-item'
    >
      <div className={styles.img}>
        <img src={character?.image} alt={`${character.name}'s image`} />
      </div>
      <div className={styles.info}>
        <h3>{character?.name}</h3>
        <p>
          <b>Species: </b>
          {character?.species}
        </p>
        <p>
          <b>Location: </b>
          {character?.location.name}
        </p>
      </div>
      <Checkbox
        id={character.id}
        isChecked={isChecked}
        handleCheckboxChange={handleCheckboxChange}
      />
    </li>
  );
};
