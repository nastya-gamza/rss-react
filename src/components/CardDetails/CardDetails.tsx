import { Character } from '../../types';
import styles from './CardDetails.module.css';

type CardDetailsProps = {
  character: Character;
  handleClose: () => void;
};

export const CardDetails = ({ character, handleClose }: CardDetailsProps) => (
  <div className={styles.container} data-testid='card-details'>
    <header className={styles.header}>
      <h3 className={styles.name}>{character?.name}</h3>
      <button
        className={styles.closeBtn}
        onClick={handleClose}
        data-testid='close-btn'
      >
        x
      </button>
    </header>
    <div>
      <img
        src={character?.image}
        className={styles.img}
        alt={`${character.name}'s image`}
      />
    </div>
    <div className={styles.info}>
      <p>
        <b>Species: </b>
        {character?.species}
      </p>
      <p>
        <b>Status: </b>
        {character?.status}
      </p>
      <p>
        <b>Gender: </b>
        {character?.gender}
      </p>
      <p>
        <b>Type: </b>
        {character?.type || '-'}
      </p>
      <p>
        <b>Location: </b>
        {character?.location.name}
      </p>
    </div>
  </div>
);
