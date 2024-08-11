import { http, HttpResponse, delay } from 'msw';
import { BASE_URL } from '../../constants/api';
import { mockCharacter, mockCharacters } from '../characters';

export const handlers = [
  http.get(BASE_URL, async () => {
    await delay(150);
    return HttpResponse.json(mockCharacters);
  }),
  http.get(`${BASE_URL}/1`, async () => {
    await delay(150);
    return HttpResponse.json(mockCharacter);
  }),
];
