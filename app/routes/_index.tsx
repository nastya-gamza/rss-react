/* eslint-disable react-refresh/only-export-components */
import { LoaderFunction } from '@remix-run/node';
import { useLoaderData, useNavigation } from '@remix-run/react';
import { BASE_URL } from '~/src/constants/api';
import { Character, Data } from '~/src/types';
import { Aside } from '~/src/components/Aside';
import { fetchData } from '~/src/api';
import { Main } from '~/src/components/Main';
import { Loader } from '~/src/components/Loader';
import styles from '~/src/styles/Main.module.css';

type LoaderData = {
  pageData: Data;
  currentPage: number;
  character: string;
  characterData: Character;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchQuery = new URLSearchParams(url.search);

  const currentPage = searchQuery.get('page') || 1;
  const character = searchQuery.get('character') || '';
  const searchName = searchQuery.get('name') || '';

  let characterData: Character | null = null;

  const pageData = await fetchData<Data>(
    `${BASE_URL}/?name=${searchName}&page=${currentPage}`,
  );

  if (character) {
    characterData = await fetchData<Character>(`${BASE_URL}/${character}`);
  }

  return {
    pageData,
    currentPage: Number(currentPage),
    character,
    characterData,
  };
};

export default function Index() {
  const navigation = useNavigation();
  const { pageData, character, characterData } = useLoaderData<LoaderData>();

  if (navigation.state === 'loading') {
    return <Loader />;
  }

  return (
    <main className={styles.container}>
      <div className={styles.row}>
        {pageData && <Main pageData={pageData} />}
        {character && <Aside characterData={characterData} />}
      </div>
    </main>
  );
}
