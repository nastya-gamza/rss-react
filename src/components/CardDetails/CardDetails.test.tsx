import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { CharacterPage } from '../../pages/CharacterPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CardList } from '../CardList/CardList.tsx';
import { mockCharacters } from '../CardList/CardList.test.tsx';
import { userEvent } from '@testing-library/user-event';
import { CardDetails } from './CardDetails.tsx';

jest.mock('axios');
const handleClose = jest.fn();

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '-',
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
};

describe('CARD_DETAILS TEST', () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockReturnValue(mockCharacter);
  });

  test('displays loading indicator while fetching data', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<CardList results={mockCharacters} currentPage={1} />} />
          <Route path='/character/:id' element={<CharacterPage />} />
        </Routes>
      </MemoryRouter>,
    );

    const cardItems = await screen.findAllByTestId('card-item');
    userEvent.click(cardItems[0]);

    const loader = await screen.findByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  test('correctly displays the detailed card data', () => {
    render(<CardDetails character={mockCharacter} handleClose={handleClose} />);

    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();

    const img = screen.getByAltText("Rick Sanchez's image");
    expect(img).toBeInTheDocument();

    expect(screen.getByText(/Species:/i)).toBeInTheDocument();
    expect(screen.getByText(/Human/i)).toBeInTheDocument();

    expect(screen.getByText(/Status:/i)).toBeInTheDocument();
    expect(screen.getByText(/Alive/i)).toBeInTheDocument();

    expect(screen.getByText(/Gender:/i)).toBeInTheDocument();
    expect(screen.getByText(/Male/i)).toBeInTheDocument();

    expect(screen.getByText(/Type:/i)).toBeInTheDocument();
    expect(screen.getByText(/-/)).toBeInTheDocument();

    expect(screen.getByText(/Location:/i)).toBeInTheDocument();
    expect(screen.getByText(/Citadel of Ricks/i)).toBeInTheDocument();
  });
});
