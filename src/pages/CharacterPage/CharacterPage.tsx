import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchData } from '../../services/api.ts';
import { BASE_URL } from '../../constants/api.ts';
import { Character } from '../../types';
import { Loader } from '../../components/Loader';
import { Error } from '../../components/Error';
import { CardDetails } from '../../components/CardDetails';
import styles from './CharacterPage.module.css';

export const CharacterPage = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const fetchCharacter = async () => {
    try {
      setLoading(true);
      const character = await fetchData<Character>(`${BASE_URL}/${id}`);
      setCharacter(character);
      setError(false);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate(`/${location.search}`);
  };

  useEffect(() => {
    fetchCharacter();
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        {loading && <Loader />}
        {error && <Error message='Nothing was found ☹️' />}
      </div>
      {character && !loading && <CardDetails character={character} handleClose={handleClose} />}
    </>
  );
};
