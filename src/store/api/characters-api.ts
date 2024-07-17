import { createApi } from '@reduxjs/toolkit/query/react';
import { Data } from '../../types';
import { baseQuery } from './base-api.ts';

export const charactersApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({
    getAllCharacters: builder.query<Data, { name?: string; page?: number }>({
      query: (params) => {
        const queryParams: Record<string, string | undefined> = {};

        if (params.name) {
          queryParams.name = params.name;
        }

        if (params.page) {
          queryParams.page = params.page;
        }

        return {
          url: '/',
          params: queryParams,
        };
      },
    }),
  }),
});

export const { useGetAllCharactersQuery } = charactersApi;
