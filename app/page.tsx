import '../src/styles/global.css';
import { Main } from '../src/components/Main';
import { Aside } from '../src/components/Aside';
import { fetchData } from '../src/api';
import { BASE_URL } from '../src/constants/api.ts';
import { Character, Data } from '../src/types';
import styles from '../src/styles/main.module.css';
import { Suspense } from 'react';

const Home = async ({
  searchParams,
}: {
  searchParams: {
    page?: string;
    name?: string;
    character?: string;
  };
}) => {
  const { page, name, character } = searchParams;

  const currentPage = page ? Number(page) : 1;
  const searchName = typeof name === 'string' ? name : '';

  let characterData: Character | null = null;

  const pageData = await fetchData<Data>(
    `${BASE_URL}/?name=${searchName}&page=${currentPage}`,
  );

  if (character) {
    characterData = await fetchData<Character>(`${BASE_URL}/${character}`);
  }

  return (
    <Suspense>
      <main className={styles.container}>
        <div className={styles.row}>
          {pageData && <Main pageData={pageData} />}
          {characterData && <Aside characterData={characterData} />}
        </div>
      </main>
    </Suspense>
  );
};

export default Home;
