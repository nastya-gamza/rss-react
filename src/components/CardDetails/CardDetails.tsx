import styles from './CardDetails.module.css';

export const CardDetails = ({ character, handleClose }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h3 className={styles.name}>{character?.name}</h3>
        <button className={styles.closeBtn} onClick={handleClose}>
          x
        </button>
      </header>
      <div>
        <img src={character?.image} className={styles.img} alt={`${character.name}'s image`} />
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
};
