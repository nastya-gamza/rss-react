/* eslint-disable react-refresh/only-export-components */
import { LoaderFunction } from '@remix-run/node';
import { useLoaderData, useLocation, useNavigate } from '@remix-run/react';
import { BASE_URL } from '~/src/constants/api';
import styles from '~/src/styles/Main.module.css';
import { CardList } from '~/src/components/CardList/CardList';
import { Pagination } from '~/src/components/Pagination';
import { Flyout } from '~/src/components/Flyout';
import { Data } from '~/src/types';

type LoaderData = {
  charactersData: Data;
  page: number;
  character: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchQuery = new URLSearchParams(url.search);

  const page = searchQuery.get('page') || 1;
  const character = searchQuery.get('character') || '';
  const name = searchQuery.get('name') || '';

  const response = await fetch(`${BASE_URL}/?page=${page}&name=${name}`);
  const charactersData = await response.json();

  return { charactersData, page: Number(page), character };
};

export default function Index() {
  const { charactersData, page, character } = useLoaderData<LoaderData>();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleCurrentPage = (page: number) => {
    if (pathname === '/') {
      navigate(`?page=${page}&name=${character}`);
    }
  };

  return (
    <main className={styles.container}>
      {charactersData?.results && (
        <CardList results={charactersData?.results} />
      )}
      {charactersData?.info && (
        <Pagination
          currentPage={page}
          totalPages={charactersData.info?.pages}
          handleCurrentPage={handleCurrentPage}
        />
      )}
      <Flyout />
    </main>
  );
}
