import React from 'react';
import ResultRow from './ResultRow';
import { useSearch } from '../context/SearchContext';
import { deleteStreet } from '../services/api';

const ResultsTable: React.FC = () => {
  const { results, setResults } = useSearch();

 const handleDelete = async (id: string) => {
  if (!window.confirm("האם אתה בטוח שברצונך למחוק רחוב זה?")) return;

  try {
    await deleteStreet(id); // מחיקה בשרת (אלסטיק)
    setResults(results.filter(s => s.id !== id)); // עדכון ה-UI
  } catch (error) {
    alert("המחיקה נכשלה");
  }
};

  if (results.length === 0) return null;

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', direction: 'rtl', marginTop: '20px' }}>
      <thead>
        <tr style={{ backgroundColor: '#f0f0f0' }}>
         
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
  );
};

export default ResultsTable;