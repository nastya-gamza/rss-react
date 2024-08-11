import { useEffect, useMemo, useState } from 'react';
import { Character } from '../../types';
import styles from '../PrimaryButton/PrimaryButton.module.css';

type DownloadCSVProps = {
  data: Character[];
  fileName: string;
};

export const DownloadCSV = ({ data, fileName }: DownloadCSVProps) => {
  const [url, setUrl] = useState<string | null>(null);

  const csvString = useMemo(() => {
    const header = [
      'ID',
      'Name',
      'Location',
      'Status',
      'Species',
      'Gender',
      'URL',
    ];
    const rows = data.map((item) => [
      item.id,
      item.name,
      item.location.name,
      item.status,
      item.species,
      item.gender,
      item.url,
    ]);

    return [header, ...rows].map((row) => row.join(';')).join('\n');
  }, [data]);

  useEffect(() => {
    const blob = new Blob([csvString], { type: 'text/csv' });
    const newUrl = URL.createObjectURL(blob);
    setUrl(newUrl);

    return () => {
      URL.revokeObjectURL(newUrl);
    };
  }, [csvString]);

  if (!url) {
    return null;
  }

  return (
    <a href={url} download={fileName} className={styles.btn}>
      Download
    </a>
  );
};
