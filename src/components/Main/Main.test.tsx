import { render, screen } from '@testing-library/react';
import { Main } from './Main';
import { useNavigation } from '../../hooks';
import { mockCharacters, mockPageData } from '../../__mocks__/characters';
import { Character } from '../../types';

jest.mock('../../hooks', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../CardList/CardList.tsx', () => ({
  CardList: ({ results }: { results: Character[] }) => (
    <div data-testid='card-list'>
      {results.map((result) => (
        <div key={result.id}>{result.name}</div>
      ))}
    </div>
  ),
}));

jest.mock('../Pagination', () => ({
  Pagination: ({
    currentPage,
    totalPages,
  }: {
    currentPage: number;
    totalPages: number;
  }) => (
    <div data-testid='pagination'>
      Page {currentPage} of {totalPages}
    </div>
  ),
}));

jest.mock('../Flyout', () => ({
  Flyout: () => <div data-testid='flyout'>Flyout Component</div>,
}));

describe('Main Component', () => {
  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({
      currentPage: 1,
      handleNavigate: jest.fn(),
      handleCurrentPage: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders CardList, Pagination, and Flyout components', () => {
    render(<Main pageData={mockPageData} />);

    const cardList = screen.getByTestId('card-list');
    expect(cardList).toBeInTheDocument();
    expect(cardList.children.length).toBe(mockCharacters.length);

    const pagination = screen.getByTestId('pagination');
    expect(pagination).toBeInTheDocument();
    expect(pagination).toHaveTextContent('Page 1 of 42');

    const flyout = screen.getByTestId('flyout');
    expect(flyout).toBeInTheDocument();
    expect(flyout).toHaveTextContent('Flyout Component');
  });
});
