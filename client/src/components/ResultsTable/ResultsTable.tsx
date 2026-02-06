import React from 'react';
import styles from './ResultsTable.module.scss';
import { useSearch } from '../../context/SearchContext';
import { deleteStreet } from '../../services/api';
import ResultRow from '../ResultRow/ResultRow';

const ResultsTable: React.FC = () => {
  const { results, setResults } = useSearch();

  const handleDelete = async (id: string) => {
    if (!window.confirm("האם אתה בטוח שברצונך למחוק רחוב זה?")) return;

    try {
      await deleteStreet(id); 
      setResults(results.filter(s => s.id !== id)); 
    } catch (error) {
      alert("המחיקה נכשלה");
    }
  };

  if (results.length === 0) return null;

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th>שם הרחוב</th>
            <th>שם משני</th>
            <th>כותרת</th>
            <th>שכונה</th>
            <th>סוג רחוב</th>
            <th>מזהה רחוב</th> 
            <th>מחק</th>
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