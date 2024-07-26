import { screen, waitFor } from '@testing-library/react';
import { Main } from './Main.tsx';
import { renderWithProviders } from '../../store/tests/render-with-providers.tsx';
import { MemoryRouter } from 'react-router-dom';
import { CardList } from '../CardList/CardList.tsx';
import { mockCharacters } from '../../__mocks__/characters.ts';
import { server } from '../../__mocks__/msw/server.ts';
import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../../constants/api.ts';

describe('App', function () {
  test('should display loader and characters list', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Main />
        <CardList results={mockCharacters} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    });
  });

  test('should display an error when the request fail', async () => {
    server.use(
      http.get(`${BASE_URL}/*`, async () => {
        return new HttpResponse(null, {
          status: 404,
          statusText: 'Nothing was found :(',
        });
      }),
    );

    renderWithProviders(
      <MemoryRouter>
        <Main />
        <CardList results={mockCharacters} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Nothing was found :(️')).toBeInTheDocument();
    });
  });
});
