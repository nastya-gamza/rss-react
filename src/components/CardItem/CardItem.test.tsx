import { render, screen } from '@testing-library/react';
import { CardItem } from './CardItem';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import { CharacterPage } from '../../pages/CharacterPage';
import { CardList } from '../CardList/CardList.tsx';
import { Character } from '../../types';
import { mockCharacter, mockCharacters } from '../../__mocks__/characters.ts';

jest.mock('axios');

describe('CARD_ITEM TEST', () => {
  test('renders the relevant card data', () => {
    render(
      <MemoryRouter>
        <CardItem character={mockCharacter as Character} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();

    const img = screen.getByAltText("Rick Sanchez's image");
    expect(img).toBeInTheDocument();

    expect(screen.getByText(/Species:/i)).toBeInTheDocument();
    expect(screen.getByText(/Human/i)).toBeInTheDocument();

    expect(screen.getByText(/Location:/i)).toBeInTheDocument();
    expect(screen.getByText(/Citadel of Ricks/i)).toBeInTheDocument();
  });

  test('clicking on a card opens a detailed card component', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path='/'
            element={<CardList results={mockCharacters} currentPage={1} />}
          />
          <Route path='/character/:id' element={<CharacterPage />} />
        </Routes>
      </MemoryRouter>,
    );

    const cardItems = await screen.findAllByTestId('card-item');
    userEvent.click(cardItems[0]);

    const characterPage = await screen.findByTestId('character-page');
    expect(characterPage).toBeInTheDocument();
  });
});
