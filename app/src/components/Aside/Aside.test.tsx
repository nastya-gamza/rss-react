import { render, screen } from '@testing-library/react';
import { Aside } from './Aside';
import { useNavigation } from '../../hooks';
import { mockCharacter } from '../../__mocks__/characters.ts';

jest.mock('../../hooks', () => ({
  useNavigation: jest.fn(),
}));

describe('Aside Component', () => {
  let handleNavigateMock: jest.Mock;

  beforeEach(() => {
    handleNavigateMock = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({
      handleNavigate: handleNavigateMock,
    });
  });

  test('renders the Aside component with character data', () => {
    render(<Aside characterData={mockCharacter} />);

    const asideElement = screen.getByTestId('character-page');
    expect(asideElement).toBeInTheDocument();

    const characterName = screen.getByText('Rick Sanchez');
    expect(characterName).toBeInTheDocument();
  });
});
