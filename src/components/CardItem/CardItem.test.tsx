import * as reduxHooks from '../../hooks/useRedux/useRedux.ts';
import { fireEvent, screen } from '@testing-library/react';
import { CardItem } from './CardItem';
import { mockCharacter } from '../../__mocks__/characters.ts';
import { renderWithProviders } from '../../store/tests/renderWithProviders.tsx';
import { setCheckedCharacters } from '../../store/slices/checkedCharactersSlice.ts';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('CardItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the relevant card data', () => {
    (usePathname as jest.Mock).mockReturnValue('/');

    renderWithProviders(<CardItem character={mockCharacter} />);

    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();

    const img = screen.getByAltText("Rick Sanchez's image");
    expect(img).toBeInTheDocument();

    expect(screen.getByText(/Species:/i)).toBeInTheDocument();
    expect(screen.getByText(/Human/i)).toBeInTheDocument();

    expect(screen.getByText(/Location:/i)).toBeInTheDocument();
    expect(screen.getByText(/Citadel of Ricks/i)).toBeInTheDocument();
  });

  test('checkbox checked state based on redux store', () => {
    jest.spyOn(reduxHooks, 'useAppSelector').mockReturnValue([mockCharacter]);

    renderWithProviders(<CardItem character={mockCharacter} />);

    expect(screen.getByTestId('checkbox-1')).toBeChecked();
  });

  test('checkbox unchecked state based on redux store', () => {
    jest.spyOn(reduxHooks, 'useAppSelector').mockReturnValue([]);

    renderWithProviders(<CardItem character={mockCharacter} />);

    expect(screen.getByTestId('checkbox-1')).not.toBeChecked();
  });

  test('dispatches action on checkbox change', () => {
    const dispatch = jest.fn();
    jest.spyOn(reduxHooks, 'useAppDispatch').mockReturnValue(dispatch);

    renderWithProviders(<CardItem character={mockCharacter} />);

    fireEvent.click(screen.getByTestId('checkbox-1'));

    expect(dispatch).toHaveBeenCalledWith(setCheckedCharacters(mockCharacter));
  });

  test('handles location path correctly', () => {
    (usePathname as jest.Mock).mockReturnValue('/character/1');

    renderWithProviders(<CardItem character={mockCharacter} />);

    expect(screen.getByTestId('card-item')).toHaveClass('noHover');
  });
});
