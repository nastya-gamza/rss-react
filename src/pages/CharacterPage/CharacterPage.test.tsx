import { renderWithProviders } from '../../store/tests/renderWithProviders.tsx';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { CharacterPage } from './CharacterPage.tsx';
import { CardDetails } from '../../components/CardDetails';
import { mockCharacter } from '../../__mocks__/characters.ts';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('CARD_PAGE TEST', () => {
  const mockNavigate = jest.fn();

  test('renders the relevant card data', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/character/1']}>
        <CharacterPage />
        <CardDetails character={mockCharacter} handleClose={mockNavigate} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('character-page')).toBeInTheDocument();
    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
  });
});
