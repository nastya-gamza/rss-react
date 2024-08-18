import { createSlice } from '@reduxjs/toolkit';
import { COUNTRIES } from '../../constants/countries.ts';

type CountriesState = {
  countries: string[];
};

const initialState: CountriesState = {
  countries: COUNTRIES,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  selectors: {
    countriesSelector: (state) => state.countries,
  },
});

export default countriesSlice.reducer;

export const { countriesSelector } = countriesSlice.selectors;
