import { CardItem } from '../card-item';
import { Character } from '../../types';
import styles from './main.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface MainProps {
  results: Character[];
}

export const Main = ({ results }: MainProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleNavigate = () => {
    if (pathname !== '/rss-react/') {
      navigate('/rss-react/');
    }
  };

  return (
    <main className={styles.container} onClick={handleNavigate}>
      <ul className={styles.list}>
        {results.map((character) => (
          <Link to={`/rss-react/character/${character.id}`} key={character.id}>
            <CardItem character={character} />
          </Link>
        ))}
      </ul>
    </main>
  );
};
