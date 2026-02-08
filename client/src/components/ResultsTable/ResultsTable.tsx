import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UI_MESSAGES } from '../../constants/messages';
import { STREET_TABLE_COLUMNS } from '../../constants/tableConfig';
import { useSearch } from '../../context/SearchContext';
import { deleteStreet } from '../../services/api';
import ResultRow from '../ResultRow/ResultRow';
import styles from './ResultsTable.module.scss';

const ResultsTable: React.FC = () => {
  const { results, setResults, isLoading, isInitialState } = useSearch();
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setHasSearched(true);
    }
  }, [isLoading]);
  const handleDelete = async (id: string) => {
    if (!window.confirm(UI_MESSAGES.ACTIONS.DELETE_QUESTION)) return;

    try {
      await deleteStreet(id); 
      setResults(results.filter(s => s.id !== id)); 
    } catch (error) {
      toast.error(UI_MESSAGES.ERRORS.DELETE_FAILED);
    }
  };

  if (isInitialState) {
    return null;
  }

  if (isLoading) {
    return <div className={styles.statusMessage}>{UI_MESSAGES.SEARCH.LOADING}</div>;
  }

  if (results.length === 0) {
    return (
      <div className={styles.statusMessage}>
        לא נמצאו תוצאות עבור החיפוש שלך
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
  <tr>
    {STREET_TABLE_COLUMNS.map((col) => (
      <th key={col.key}>{col.label}</th>
    ))}
  </tr>
</thead>
        <tbody>
          {results.map((street) => (
            <ResultRow 
              key={street.id} 
              street={street} 
              onDeleteRow={handleDelete} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;