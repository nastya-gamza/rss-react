import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './base-api.ts';
import { Character, Data } from '../../types';
import { setCurrentPageData } from '../slices/current-page-data-slice.ts';
import { setSelectedCharacter } from '../slices/selected-character-sice.ts';

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery,
  endpoints: (builder) => ({
    getAllCharacters: builder.query<Data, { name?: string; page?: number }>({
      query: (params) => {
        const queryParams: Record<string, string | undefined> = {};

        if (params.name) {
          queryParams.name = params.name;
        }

        if (params.page) {
          queryParams.page = params.page.toString();
        }

        return {
          url: '/',
          params: queryParams,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCurrentPageData(data));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    getSingleCharacter: builder.query<Character, string>({
      query: (id) => ({
        url: `/${id}`,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSelectedCharacter(data));
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const { useGetAllCharactersQuery, useGetSingleCharacterQuery } =
  charactersApi;
