import { useRef } from 'react';
import { PrimaryButton } from '../PrimaryButton';
import { Character } from '../../types';

type DownloadCSVProps = {
  data: Character[];
  fileName: string;
};

export const DownloadCSV = ({ data, fileName }: DownloadCSVProps) => {
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  const downloadCSV = () => {
    const csvString = data
      .map((item) => [
        item.id,
        item.name,
        item.location.name,
        item.status,
        item.species,
        item.gender,
        item.url,
      ])
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    if (linkRef.current) {
      const link = linkRef.current as HTMLAnchorElement;
      link.href = url;
      link.download = fileName || 'download.csv';
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <PrimaryButton onClick={downloadCSV}>Download</PrimaryButton>
      <a ref={linkRef} style={{ display: 'none' }}>
        Export CSV
      </a>
    </>
  );
};
