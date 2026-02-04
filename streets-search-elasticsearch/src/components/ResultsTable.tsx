import React from 'react';
import ResultRow from './ResultRow';
import { useSearch } from '../context/SearchContext';

const ResultsTable: React.FC = () => {
  const { results, setResults } = useSearch();

  const handleDelete = (id: string) => {
    // לוגיקה זמנית: סינון הרשומה מהרשימה המוצגת (מחיקה לוגית בצד הלקוח)
    const updatedResults = results.filter(s => s._id !== id);
    setResults(updatedResults);
    console.log(`Record ${id} marked as deleted`);
  };

  if (results.length === 0) return null;

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', direction: 'rtl', marginTop: '20px' }}>
      <thead>
        <tr style={{ backgroundColor: '#f0f0f0' }}>
          <th>מחק</th>
          <th>עמודה 6</th>
          <th>עמודה 5</th>
          <th>עמודה 4</th>
          <th>עמודה 3</th>
          <th>עמודה 2</th>
          <th>עמודה 1</th>
        </tr>
      </thead>
      <tbody>
        {results.map((street) => (
          <ResultRow 
            key={street._id} 
            street={street} 
            onDeleteRow={handleDelete} 
          />
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;