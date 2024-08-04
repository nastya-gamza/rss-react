/* eslint-disable react-refresh/only-export-components */
import { Flyout } from '../src/components/Flyout';
import { useAppDispatch, useAppSelector } from '../src/hooks';
import { useRouter } from 'next/router';
import {
  checkedCharactersSelector,
  uncheckAllCharacters,
} from '../src/store/slices/checkedCharactersSlice.ts';
import { CardList } from '../src/components/CardList/CardList.tsx';
import { Pagination } from '../src/components/Pagination';
import styles from '../src/styles/main.module.css';
import { GetServerSideProps } from 'next';
import { BASE_URL } from '../src/constants/api.ts';
import { Character, Data } from '../src/types';
import { CardDetails } from '../src/components/CardDetails';

type MainProps = {
  pageData: Data;
  characterData: Character;
};

const Main = ({ pageData, characterData }: MainProps) => {
  const dispatch = useAppDispatch();
  const { query, pathname, push } = useRouter();

  const checkedCharacters = useAppSelector(checkedCharactersSelector);

  const currentPage = query.page ? Number(query.page) : 1;
  const name = typeof query.name === 'string' ? query.name : '';

  const totalPages = pageData ? pageData.info?.pages : 1;

  const handleCurrentPage = (page: number) => {
    if (pathname === '/') {
      push(`?page=${page}&name=${name}`);
    }
  };

  const handleUncheck = () => {
    dispatch(uncheckAllCharacters());
  };

  const handleNavigate = () => {
    if (query.character) {
      push(`?page=${currentPage}&name=${name}`);
    }
  };

  return (
    <>
      <main className={styles.container}>
        <div className={styles.row}>
          <div className={styles.main} onClick={handleNavigate}>
            {pageData && <CardList results={pageData?.results} />}
            {pageData?.results && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handleCurrentPage={handleCurrentPage}
              />
            )}
          </div>
          {characterData && (
            <div data-testid='character-page' className={styles.details}>
              <CardDetails
                character={characterData}
                handleClose={handleNavigate}
              />
            </div>
          )}
        </div>
        <Flyout items={checkedCharacters} onClick={handleUncheck} />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page, name, character } = context.query;
  const currentPage = page ? Number(page) : 1;
  const searchName = typeof name === 'string' ? name : '';

  const getPageData = await fetch(
    `${BASE_URL}/?name=${searchName}&page=${currentPage}`,
  );
  const pageData: Data = await getPageData.json();
  let characterData: Character | null = null;

  if (character) {
    const id = Number(character);
    const res = await fetch(`${BASE_URL}/${id}`);
    characterData = await res.json();
  }

  if (!pageData && !characterData) {
    return {
      notFound: true,
    };
  }

  return {
    props: { pageData, characterData },
  };
};

export default Main;
