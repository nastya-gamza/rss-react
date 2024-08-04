import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { renderWithProviders } from '../../store/tests/renderWithProviders.tsx';
import { CardList } from './CardList.tsx';
import { mockCharacters } from '../../__mocks__/characters.ts';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('CARD_LIST TEST', () => {
  test('should show characters list', async () => {
    renderWithProviders(
      <MemoryRouter>
        <CardList results={mockCharacters} />
      </MemoryRouter>,
    );

    expect(await screen.findByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  test('clicking on a card opens a detailed card component', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<CardList results={mockCharacters} />} />
        </Routes>
      </MemoryRouter>,
    );

    const cardItems = await screen.findAllByTestId('card-item');
    userEvent.click(cardItems[0]);

    const characterPage = await screen.findByTestId('character-page');
    expect(characterPage).toBeInTheDocument();
  });
});
