import { render, screen } from '@testing-library/react';
import { DownloadCSV } from './DownloadCSV';
import { mockCharacters } from '../../__mocks__/characters.ts';

describe('DOWNLOAD_CSV TEST', () => {
  const fileName = 'characters.csv';

  beforeEach(() => {
    URL.createObjectURL = jest.fn(() => 'blob:http://localhost:3000/blobid');
    URL.revokeObjectURL = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the download link with the correct attributes', () => {
    render(<DownloadCSV data={mockCharacters} fileName={fileName} />);

    const linkElement = screen.getByRole('link', { name: /download/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      'href',
      'blob:http://localhost:3000/blobid',
    );
    expect(linkElement).toHaveAttribute('download', fileName);
    expect(linkElement).toHaveClass('btn');
  });

  test('revokes the object URL when component unmounts', () => {
    const { unmount } = render(
      <DownloadCSV data={mockCharacters} fileName={fileName} />,
    );

    unmount();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith(
      'blob:http://localhost:3000/blobid',
    );
  });
});
