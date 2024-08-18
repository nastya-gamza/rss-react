import { FormState } from '../store/slices/submittedData.ts';

export const sortByDate = (data: FormState[]) =>
  [...data].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
