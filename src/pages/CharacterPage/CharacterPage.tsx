import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { Error } from '../../components/Error';
import { CardDetails } from '../../components/CardDetails';
import styles from './CharacterPage.module.css';
import { useGetSingleCharacterQuery } from '../../store/api/charactersApi.ts';

export const CharacterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const {
    data: character,
    isFetching,
    isError,
  } = useGetSingleCharacterQuery(id as string, { skip: !id });

  const handleClose = () => {
    navigate(`/${location.search}`);
  };

  return (
    <div data-testid='character-page' className={styles.page}>
      <div className={styles.wrapper}>
        {isFetching && <Loader />}
        {isError && <Error message='Nothing was found ☹️' />}
      </div>
      {character && !isFetching && (
        <CardDetails character={character} handleClose={handleClose} />
      )}
    </div>
  );
};
