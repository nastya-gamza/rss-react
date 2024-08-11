import { ReactNode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Flyout } from './Flyout';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { mockCharacters } from '../../__mocks__/characters';
import { uncheckAllCharacters } from '../../store/slices/checkedCharactersSlice.ts';
import { Character } from '../../types';

jest.mock('../../hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('../PrimaryButton', () => ({
  PrimaryButton: ({
    onClick,
    children,
  }: {
    onClick: () => void;
    children: ReactNode;
  }) => <button onClick={onClick}>{children}</button>,
}));

jest.mock('../DownloadCSV', () => ({
  DownloadCSV: ({ fileName }: { data: Character[]; fileName: string }) => (
    <button>{fileName}</button>
  ),
}));

describe('Flyout Component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly when no items are selected', () => {
    (useAppSelector as jest.Mock).mockReturnValue([]);

    render(<Flyout />);

    const flyoutElement = screen.getByText(/characters are selected/i)
      .parentElement?.parentElement;
    expect(flyoutElement).not.toHaveClass('visible');
  });

  test('renders correctly when multiple items are selected', () => {
    (useAppSelector as jest.Mock).mockReturnValue(mockCharacters);

    render(<Flyout />);

    const infoText = screen.getByText('2 characters are selected');
    expect(infoText).toBeInTheDocument();

    const downloadButton = screen.getByText('2_characters.csv');
    expect(downloadButton).toBeInTheDocument();
  });

  test('renders correctly when one item is selected', () => {
    (useAppSelector as jest.Mock).mockReturnValue([mockCharacters[0]]);

    render(<Flyout />);

    const infoText = screen.getByText('1 character is selected');
    expect(infoText).toBeInTheDocument();
  });

  test('calls uncheckAllCharacters when "Unselect all" is clicked', () => {
    (useAppSelector as jest.Mock).mockReturnValue(mockCharacters);

    render(<Flyout />);

    const unselectButton = screen.getByRole('button', { name: 'Unselect all' });
    fireEvent.click(unselectButton);

    expect(mockDispatch).toHaveBeenCalledWith(uncheckAllCharacters());
  });
});
