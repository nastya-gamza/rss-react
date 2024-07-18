import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './base-api.ts';
import { Character, Data } from '../../types';

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({
    getAllCharacters: builder.query<Data, { name: string; page?: number }>({
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
    }),
    getSingleCharacter: builder.query<Character, string>({
      query: (id) => ({
        url: `/${id}`,
      }),
    }),
  }),
});

export const { useLazyGetAllCharactersQuery, useGetSingleCharacterQuery } =
  charactersApi;
