import { render, screen, fireEvent } from '@testing-library/react';
import { CardDetails } from './CardDetails';
import { mockCharacter } from '../../__mocks__/characters.ts';

const mockHandleClose = jest.fn();

describe('CardDetails component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders character details correctly', () => {
    render(
      <CardDetails character={mockCharacter} handleClose={mockHandleClose} />,
    );

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();

    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('src', mockCharacter.image);
    expect(imageElement).toHaveAttribute(
      'alt',
      `${mockCharacter.name}'s image`,
    );

    expect(screen.getByText(mockCharacter.species)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.status)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.gender)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.location.name)).toBeInTheDocument();
  });

  test('calls handleClose when close button is clicked', () => {
    render(
      <CardDetails character={mockCharacter} handleClose={mockHandleClose} />,
    );

    const closeButton = screen.getByTestId('close-btn');
    fireEvent.click(closeButton);

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  test('renders default type as "-" when type is not provided', () => {
    render(
      <CardDetails
        character={{ ...mockCharacter, type: '' }}
        handleClose={mockHandleClose}
      />,
    );

    expect(screen.getByText('-')).toBeInTheDocument();
  });
});
