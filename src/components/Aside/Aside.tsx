import { CardDetails } from '../CardDetails';
import { Character } from '../../types';
import { fetchData } from '../../api';
import { BASE_URL } from '../../constants/api.ts';

export const Aside = async ({ id }: { id: string }) => {
  const characterData = await fetchData<Character>(`${BASE_URL}/${id}`);

  return characterData && <CardDetails character={characterData} />;
};
