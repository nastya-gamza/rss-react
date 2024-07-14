import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CardList } from './CardList';
import { Main } from '../Main';
import { Character } from '../../types';
import { mockCharacters } from '../../__mocks__/characters.ts';

describe('CARD_LIST TEST', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('component renders the specified number of cards', () => {
    render(
      <MemoryRouter>
        <CardList results={mockCharacters as Character[]} currentPage={1} />
      </MemoryRouter>,
    );

    const cards = screen.getAllByTestId('card-item');
    expect(cards).toHaveLength(mockCharacters.length);
  });

  test('an appropriate message is displayed if no cards are present', async () => {
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
