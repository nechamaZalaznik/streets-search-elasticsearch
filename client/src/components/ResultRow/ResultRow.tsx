import React from 'react';
import DeleteButton from '../DeleteButton/DeleteButton';
import type { Street } from '../../types/street';
import styles from './ResultRow.module.scss';

interface ResultRowProps {
  street: Street;
  onDeleteRow: (id: string) => void;
}

const ResultRow: React.FC<ResultRowProps> = ({ street, onDeleteRow }) => {
  return (
    <tr className={styles.row}>
      <td>{street.street_name}</td>
      <td>{street.secondary_name}</td>
      <td>{street.title}</td>
      <td>{street.neighborhood}</td>
      <td>{street.street_type}</td>
      <td>{street.ID_street}</td>
      
      <td className={styles.deleteCell}>
        <DeleteButton onDelete={() => onDeleteRow(street.id)} />
      </td>
    </tr>
  );
};

export default ResultRow;