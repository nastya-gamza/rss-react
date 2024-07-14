import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchData } from '../../services/api.ts';
import { BASE_URL } from '../../constants/api.ts';
import { Character } from '../../types';
import { Loader } from '../../components/Loader';
import { Error } from '../../components/Error';
import { CardDetails } from '../../components/CardDetails';
import styles from './CharacterPage.module.css';
import { useFetch } from '../../hooks';

export const CharacterPage = () => {
  const [character, setCharacter] = useState<Character | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [fetching, isLoading, isError] = useFetch(async () => {
    const character = await fetchData<Character>(`${BASE_URL}/${id}`);
    setCharacter(character);
  });

  const handleClose = () => {
    navigate(`/${location.search}`);
  };

  useEffect(() => {
    fetching();
  }, []);

  return (
    <div data-testid='character-page' className={styles.page}>
      <div className={styles.wrapper}>
        {isLoading && <Loader />}
        {isError && <Error message='Nothing was found ☹️' />}
      </div>
      {character && !isLoading && <CardDetails character={character} handleClose={handleClose} />}
    </div>
  );
};
