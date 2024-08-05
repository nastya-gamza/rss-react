/* eslint-disable react-refresh/only-export-components */
import { GetServerSideProps } from 'next';
import { Main } from '../src/components/Main';
import { Aside } from '../src/components/Aside';
import { fetchData } from '../src/api';
import { BASE_URL } from '../src/constants/api.ts';
import { Character, Data } from '../src/types';
import styles from '../src/styles/main.module.css';

type MainProps = {
  pageData: Data;
  characterData: Character;
};

const Home = ({ pageData, characterData }: MainProps) => (
  <main className={styles.container}>
    <div className={styles.row}>
      {pageData && <Main pageData={pageData} />}
      {characterData && <Aside characterData={characterData} />}
    </div>
  </main>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page, name, character } = context.query;
  const currentPage = page ? Number(page) : 1;
  const searchName = typeof name === 'string' ? name : '';

  let characterData: Character | null = null;

  const pageData = await fetchData<Data>(
    `${BASE_URL}/?name=${searchName}&page=${currentPage}`,
  );

  if (character) {
    characterData = await fetchData<Character>(`${BASE_URL}/${character}`);
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

export default Home;
