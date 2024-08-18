import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Form } from '../../types';

export type FormState = Form & { date: Date };

type SubmittedDataState = {
  allSubmittedForms: FormState[];
};

const initialState: SubmittedDataState = {
  allSubmittedForms: [],
};

const submittedDataSlice = createSlice({
  name: 'submittedData',
  initialState,
  reducers: {
    setSubmittedData: (state, action: PayloadAction<FormState>) => {
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
