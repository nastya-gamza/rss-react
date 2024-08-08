'use client';

import { Character } from '../../types';
import styles from './CardDetails.module.css';
import { useNavigation } from '../../hooks';

type CardDetailsProps = {
  character: Character;
};

export const CardDetails = ({ character }: CardDetailsProps) => {
  const { handleNavigate } = useNavigation();

  return (
    <div className={styles.container} data-testid='card-details'>
      <header className={styles.header}>
        <h3 className={styles.name}>{character?.name}</h3>
        <button
          data-testid='close-btn'
          className={styles.closeBtn}
          onClick={handleNavigate}
        >
          x
        </button>
      </header>
      <img
        src={character?.image}
        draggable={false}
        alt={`${character.name}'s image`}
      />
      <div className={styles.info}>
        <p>
          <b>Species: </b> {character?.species}
        </p>
        <p>
          <b>Status: </b> {character?.status}
        </p>
        <p>
          <b>Gender: </b> {character?.gender}
        </p>
        <p>
          <b>Type: </b> {character?.type || '-'}
        </p>
        <p>
          <b>Location: </b> {character?.location?.name}
        </p>
      </div>
    </div>
  );
};
