import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../../constants/api';
import { fetchData } from '../index';
import { server } from '../../__mocks__/msw/server';
import { Character } from '../../types';

describe('fetchData', () => {
  test('should return data when the request is successful', async () => {
    const data: Character = await fetchData(`${BASE_URL}/1`);
    expect(data.name).toEqual('Rick Sanchez');
  });

  test('should throw an error when the request fails', async () => {
    server.use(
      http.get(`${BASE_URL}/*`, async () => {
        return new HttpResponse(null, {
          status: 500,
        });
      }),
    );

    await expect(fetchData(`${BASE_URL}/*`)).rejects.toThrow();
  });

  test('should throw an error if the response is not valid JSON', async () => {
    server.use(
      http.get(`${BASE_URL}/1`, async () => {
        return new HttpResponse(null, {
          status: 404,
        });
      }),
    );

    await expect(fetchData(`${BASE_URL}/1`)).rejects.toThrow(SyntaxError);
  });
});
