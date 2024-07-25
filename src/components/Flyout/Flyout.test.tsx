import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Flyout } from './Flyout';
import { mockCharacters } from '../../__mocks__/characters.ts';
import { Character } from '../../types';

jest.mock('../PrimaryButton', () => ({
  PrimaryButton: ({
    onClick,
    children,
  }: {
    onClick: () => void;
    children: React.ReactNode;
  }) => <button onClick={onClick}>{children}</button>,
}));

jest.mock('../DownloadCSV', () => ({
  DownloadCSV: ({ fileName }: { data: Character[]; fileName: string }) => (
    <button>{fileName}</button>
  ),
}));

describe('Flyout component', () => {
  const mockOnClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly when no items are present', () => {
    render(<Flyout items={[]} onClick={mockOnClick} />);

    const flyoutElement = screen.getByRole('button', { name: 'Unselect all' })
      .parentElement?.parentElement;
    expect(flyoutElement).not.toHaveClass('visible');
  });

  test('renders correctly when items are present', () => {
    render(<Flyout items={mockCharacters} onClick={mockOnClick} />);

    const flyoutElement = screen.getByRole('button', { name: 'Unselect all' })
      .parentElement?.parentElement;
    expect(flyoutElement).toHaveClass('visible');

    const infoText = screen.getByText('2 characters are selected');
    expect(infoText).toBeInTheDocument();

    const downloadButton = screen.getByText('2_characters.csv');
    expect(downloadButton).toBeInTheDocument();
  });

  test('displays correct text when one item is present', () => {
    render(<Flyout items={[mockCharacters[0]]} onClick={mockOnClick} />);

    const infoText = screen.getByText('1 character is selected');
    expect(infoText).toBeInTheDocument();
  });

  test('calls onClick when "Unselect all" is clicked', () => {
    render(<Flyout items={mockCharacters} onClick={mockOnClick} />);

    const unselectButton = screen.getByRole('button', { name: 'Unselect all' });
    fireEvent.click(unselectButton);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
