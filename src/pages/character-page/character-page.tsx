import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchData } from '../../services/api.ts';
import { BASE_URL } from '../../constants/api.ts';
import { Character } from '../../types';
import styles from './character-page.module.css';

export const CharacterPage = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchCharacter = async () => {
    const character = await fetchData<Character>(`${BASE_URL}/${id}`);
    setCharacter(character);
  };

  const handleClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchCharacter();
  }, []);

  return (
    character && (
      <div className={styles.container}>
        <div>
          <div>
            <header className={styles.header}>
              <h3>{character?.name}</h3>
              <button className={styles.closeBtn} onClick={handleClose}>
                x
              </button>
            </header>
            <div>
              <img src={character?.image} alt={`${character.name}'s image`} />
            </div>
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
      </div>
    )
  );
};
