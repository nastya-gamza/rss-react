import { CardDetails } from '../CardDetails';
import { Character } from '../../types';
import { useNavigate, useSearchParams } from '@remix-run/react';
import styles from './Aside.module.css';

type AsideProps = {
  characterData: Character;
};

export const Aside = ({ characterData }: AsideProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page');
  const name = searchParams.get('name');
  const character = searchParams.get('character');

  const handleNavigate = () => {
    if (character) {
      navigate(`?page=${currentPage}&name=${name}`);
    }
  };

  return (
    <aside data-testid='character-page' className={styles.details}>
      <CardDetails character={characterData} handleClose={handleNavigate} />
    </aside>
  );
};
