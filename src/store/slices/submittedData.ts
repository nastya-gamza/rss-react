import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormWithBase64File } from '../../types';

type SubmittedDataState = {
  allSubmittedForms: FormWithBase64File[];
};

const initialState: SubmittedDataState = {
  allSubmittedForms: [],
};

const submittedDataSlice = createSlice({
  name: 'submittedData',
  initialState,
  reducers: {
    setSubmittedData: (state, action: PayloadAction<FormWithBase64File>) => {
      state.allSubmittedForms.push(action.payload);
    },
  },
  selectors: {
    submittedDataSelector: (state) => state.allSubmittedForms,
  },
});

export const { setSubmittedData } = submittedDataSlice.actions;

export default submittedDataSlice.reducer;

export const { submittedDataSelector } = submittedDataSlice.selectors;
