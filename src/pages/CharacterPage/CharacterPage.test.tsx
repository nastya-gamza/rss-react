import { renderWithProviders } from '../../store/tests/render-with-providers.tsx';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { CharacterPage } from './CharacterPage.tsx';

describe('CARD_PAGE TEST', () => {
  test('renders the relevant card data', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/character/1']}>
        <CharacterPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('character-page')).toBeInTheDocument();
  });
});
