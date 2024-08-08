import '../src/styles/global.css';
import { Main } from '../src/components/Main';
import { Aside } from '../src/components/Aside';
import { fetchData } from '../src/api';
import { BASE_URL } from '../src/constants/api.ts';
import { Data } from '../src/types';
import { Suspense } from 'react';
import { Loader } from '../src/components/Loader';
import styles from '../src/styles/main.module.css';

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

  const pageData = await fetchData<Data>(
    `${BASE_URL}/?name=${searchName}&page=${currentPage}`,
  );

  return (
    <main className={styles.container}>
      <div className={styles.row}>
        {pageData && <Main pageData={pageData} />}
        {character && (
          <aside data-testid='character-page' className={styles.details}>
            <Suspense fallback={<Loader />}>
              <Aside id={character} />
            </Suspense>
          </aside>
        )}
      </div>
    </main>
  );
};

export default Home;
