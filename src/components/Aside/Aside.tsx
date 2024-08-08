'use client';

import { CardDetails } from '../CardDetails';
import { Character } from '../../types';
import { useNavigation } from '../../hooks';
import styles from './Aside.module.css';

type AsideProps = {
  characterData: Character;
};

export const Aside = ({ characterData }: AsideProps) => {
  const { handleNavigate } = useNavigation();

  return (
    <aside data-testid='character-page' className={styles.details}>
      <CardDetails character={characterData} handleClose={handleNavigate} />
    </aside>
  );
};
