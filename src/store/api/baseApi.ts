import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/api.ts';

export const createBaseQuery = () =>
  fetchBaseQuery({
    baseUrl: BASE_URL,
  });

export const baseQuery = createBaseQuery();
