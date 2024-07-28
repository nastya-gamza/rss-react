import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi.ts';
import { Character, Data } from '../../types';
import { setCurrentPageData } from '../slices/currentPageDataSlice.ts';
import { setSelectedCharacter } from '../slices/selectedCharacterSice.ts';

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
          console.log(err);
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
          console.log(err);
        }
      },
    }),
  }),
});

export const { useGetAllCharactersQuery, useGetSingleCharacterQuery } =
  charactersApi;
