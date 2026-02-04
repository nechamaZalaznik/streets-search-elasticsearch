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
      <td style={{ backgroundColor: 'red', padding: 0, width: '50px' }}>
        <DeleteButton onDelete={() => onDeleteRow(street._id)} />
      </td>
      <td>{street.last_updated}</td>
      <td>{street.region}</td>
      <td>{street.city_name}</td>
      <td>{street.neighborhood}</td>
      <td>{street.street_code}</td>
      <td>{street.street_name}</td>
    </tr>
  );
};

export default ResultRow;