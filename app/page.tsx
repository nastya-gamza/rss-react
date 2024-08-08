import '../src/styles/global.css';
import { Main } from '../src/components/Main';
import { Aside } from '../src/components/Aside';
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
  const { character } = searchParams;

  return (
    <main className={styles.container}>
      <Main searchParams={searchParams} />
      {character && (
        <aside data-testid='character-page' className={styles.details}>
          <Suspense fallback={<Loader />}>
            <Aside id={character} />
          </Suspense>
        </aside>
      )}
    </main>
  );
};

export default Home;
