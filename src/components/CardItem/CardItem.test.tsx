import * as reduxHooks from '../../hooks/useRedux/useRedux.ts';
import { fireEvent, screen } from '@testing-library/react';
import { CardItem } from './CardItem';
import { MemoryRouter } from 'react-router-dom';
import { Character } from '../../types';
import { mockCharacter } from '../../__mocks__/characters.ts';
import { renderWithProviders } from '../../store/tests/render-with-providers.tsx';
import { setCheckedCharacters } from '../../store/slices/checked-characters-slice.ts';

describe('CARD_ITEM TEST', () => {
  test('renders the relevant card data', () => {
    renderWithProviders(
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

  test('checkbox checked state based on redux store', () => {
    const initialState = [mockCharacter];
    renderWithProviders(
      <MemoryRouter>
        <CardItem character={mockCharacter} />
      </MemoryRouter>,
      {
        preloadedState: {
          checkedCharacters: initialState,
        },
      },
    );

    expect(screen.getByTestId('checkbox-1')).toBeChecked();
  });

  test('dispatches action on checkbox change', () => {
    const mockedDispatch = jest.spyOn(reduxHooks, 'useAppDispatch');
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);

    renderWithProviders(
      <MemoryRouter>
        <CardItem character={mockCharacter} />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByTestId('checkbox-1'));

    expect(dispatch).toHaveBeenCalledWith(setCheckedCharacters(mockCharacter));
  });

  test('handles location path correctly', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/character/1']}>
        <CardItem character={mockCharacter} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('card-item')).toHaveClass('noHover');
  });
});
