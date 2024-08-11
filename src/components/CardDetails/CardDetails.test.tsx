import { render, screen, fireEvent } from '@testing-library/react';
import { CardDetails } from './CardDetails';
import { useNavigation } from '../../hooks';
import { mockCharacter } from '../../__mocks__/characters.ts';

jest.mock('../../hooks', () => ({
  useNavigation: jest.fn(),
}));

describe('CardDetails Component', () => {
  const mockHandleNavigate = jest.fn();

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({
      handleNavigate: mockHandleNavigate,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders character details correctly', () => {
    render(<CardDetails character={mockCharacter} />);

    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getByAltText("Rick Sanchez's image")).toBeInTheDocument();
    expect(screen.getByText(/Human/i)).toBeInTheDocument();
    expect(screen.getByText(/Male/i)).toBeInTheDocument();
    expect(screen.getByText(/Citadel of Ricks/i)).toBeInTheDocument();
  });

  test('calls handleNavigate when close button is clicked', () => {
    render(<CardDetails character={mockCharacter} />);

    const closeButton = screen.getByTestId('close-btn');
    fireEvent.click(closeButton);

    expect(mockHandleNavigate).toHaveBeenCalledTimes(1);
  });
});
