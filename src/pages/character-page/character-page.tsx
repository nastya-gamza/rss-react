import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchData } from '../../services/api.ts';
import { BASE_URL } from '../../constants/api.ts';
import { Character } from '../../types';
import { Loader } from '../../components/loader';
import { Error } from '../../components/error';
import { CardDetails } from '../../components/card-details';
import styles from './character-page.module.css';

export const CharacterPage = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('character');

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
    navigate(-1);
  };

  const handleRefresh = () => {
    setError(false);
    handleClose();
  };

  useEffect(() => {
    fetchCharacter();
  }, []);

  return (
    <>
      <div className={styles.loader}>{loading && <Loader />}</div>
      {error && (
        <Error
          message={'Oops! Nothing was found ☹️'}
          btnText={'Try again'}
          handleRefresh={handleRefresh}
        />
      )}
      {character && !loading && <CardDetails character={character} handleClose={handleClose} />}
    </>
  );
};
