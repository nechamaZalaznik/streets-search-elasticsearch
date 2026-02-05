import React from 'react';
import DeleteButton from './DeleteButton';
import type { Street } from '../types/street';

interface ResultRowProps {
  street: Street;
  onDeleteRow: (id: string) => void;
}

const ResultRow: React.FC<ResultRowProps> = ({ street, onDeleteRow }) => {
  return (
    <tr style={{ borderBottom: '1px solid black' }}>
      {/* עמודת המחיקה - הצבע האדום בתמונה הוא על כל התא */}
      
      <td>{street.street_name}</td>
      <td>{street.secondary_name}</td>
      <td>{street.title}</td>
      <td>{street.neighborhood}</td>
      <td>{street.street_type}</td>
      <td>{street.ID_street}</td>
      <td style={{ backgroundColor: 'red', padding: 0, width: '50px' }}>
        <DeleteButton onDelete={() => onDeleteRow(street.id)} />
      </td>
    </tr>
  );
};

export default ResultRow;