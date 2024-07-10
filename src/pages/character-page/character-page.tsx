import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchData } from '../../services/api.ts';
import { BASE_URL } from '../../constants/api.ts';
import { Character } from '../../types';
import styles from './character-page.module.css';
import { Loader } from '../../components/loader';
import { Error } from '../../components/error';

export const CharacterPage = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchCharacter = async () => {
    try {
      setLoading(true);
      setError(false);
      const character = await fetchData<Character>(`${BASE_URL}/${id}`);
      setCharacter(character);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate('/rss-react/');
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
      <div className={styles.container}>
        {character && !loading && (
          <div>
            <header className={styles.header}>
              <h3 className={styles.name}>{character?.name}</h3>
              <button className={styles.closeBtn} onClick={handleClose}>
                x
              </button>
            </header>
            <div>
              <img src={character?.image} alt={`${character.name}'s image`} />
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
        )}
      </div>
    </>
  );
};
