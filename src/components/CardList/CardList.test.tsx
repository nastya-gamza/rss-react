import { screen, fireEvent } from '@testing-library/react';
import { CardList } from './CardList';
import mockRouter from 'next-router-mock';
import { mockCharacters } from '../../__mocks__/characters.ts';
import { renderWithProviders } from '../../store/tests/renderWithProviders.tsx';

jest.mock('next/router', () => require('next-router-mock'));

describe('CardList', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/?page=1&name=Rick');
  });

  test('renders a list of characters', () => {
    renderWithProviders(<CardList results={mockCharacters} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockCharacters.length);

    const firstCharacter = screen.getByText('Rick Sanchez');
    const secondCharacter = screen.getByText('Morty Smith');

    expect(firstCharacter).toBeInTheDocument();
    expect(secondCharacter).toBeInTheDocument();
  });

  test('navigates to character details on click', () => {
    renderWithProviders(<CardList results={mockCharacters} />);

    const firstCharacterItem = screen.getByText('Rick Sanchez');
    fireEvent.click(firstCharacterItem);

    expect(mockRouter.asPath).toBe('/?page=1&name=Rick&character=1');
  });
});
