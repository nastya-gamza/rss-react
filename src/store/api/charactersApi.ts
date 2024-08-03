import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi.ts';
import { Character } from '../../types';
import { setSelectedCharacter } from '../slices/selectedCharacterSice.ts';
import { HYDRATE } from 'next-redux-wrapper';

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery,
  extractRehydrationInfo(action: unknown, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
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

export const { useGetSingleCharacterQuery } = charactersApi;
