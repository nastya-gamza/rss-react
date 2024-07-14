import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CardList } from './CardList';
import { Main } from '../Main';
import { Character } from '../../types';

export const mockCharacters = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth',
      url: '',
    },
    location: {
      name: 'Citadel of Ricks',
      url: '',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [],
    url: '',
    created: '',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth',
      url: '',
    },
    location: {
      name: 'Citadel of Ricks',
      url: '',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    episode: [],
    url: '',
    created: '',
  },
];

describe('CARD_LIST TEST', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('verify that the component renders the specified number of cards', () => {
    render(
      <MemoryRouter>
        <CardList results={mockCharacters as Character[]} currentPage={1} />
      </MemoryRouter>,
    );

    const cards = screen.getAllByTestId('card-item');
    expect(cards).toHaveLength(mockCharacters.length);
  });

  test('check that an appropriate message is displayed if no cards are present', async () => {
    render(
      <MemoryRouter>
        <Main loading={false} error={true}>
          <CardList results={[]} currentPage={1} />
        </Main>
      </MemoryRouter>,
    );
    const errorMessage = await screen.findByText('Nothing was found ☹️');
    expect(errorMessage).toBeInTheDocument();
  });
});
