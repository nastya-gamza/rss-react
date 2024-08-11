import { CardDetails } from '../CardDetails';
import { Character } from '../../types';
import { useSearchParams } from '@remix-run/react';
import styles from './Aside.module.css';

type AsideProps = {
  characterData: Character;
};

export const Aside = ({ characterData }: AsideProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get('page') || '1';
  const name = searchParams.get('name') || '';
  const character = searchParams.get('character') || '';

  const handleNavigate = () => {
    if (character) {
      setSearchParams({ page: currentPage || '1', name: name || '' });
    }
  };

  return (
    <aside data-testid='character-page' className={styles.details}>
      <CardDetails character={characterData} handleClose={handleNavigate} />
    </aside>
  );
};
