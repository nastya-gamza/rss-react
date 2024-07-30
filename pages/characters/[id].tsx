import { useRouter } from 'next/router';
import { useGetSingleCharacterQuery } from '../../src/store/api/charactersApi.ts';
import { Loader } from '../../src/components/Loader';
import { Error } from '../../src/components/Error';
import { CardDetails } from '../../src/components/CardDetails';
import styles from '../../src/styles/CharacterPage.module.css';

const CharacterPage = () => {
  const { query, push } = useRouter();
  const { id } = query;
  const search = query.page;
  console.log(search);

  const {
    data: character,
    isFetching,
    isError,
  } = useGetSingleCharacterQuery(id as string, { skip: !id });

  const handleClose = async () => {
    await push(`/?page=${search}`);
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

export default CharacterPage;
