import React, { memo } from 'react';
import { STREET_TABLE_COLUMNS } from '../../constants/tableConfig';
import type { Street } from '../../types/street';
import DeleteButton from '../DeleteButton/DeleteButton';
import styles from './StreetItem.module.scss';

interface StreetItemProps {
  street: Street;
  onDeleteRow: (id: string) => void;
}

const StreetItem: React.FC<StreetItemProps> = memo(({ street, onDeleteRow }) => {
  return (
    <tr className={styles.row}>
      {STREET_TABLE_COLUMNS.map((col) => {
        if (col.key === 'actions') {
          return (
            <td key={col.key} className={styles.deleteCell}>
              <DeleteButton onDelete={() => onDeleteRow(street.id)} />
            </td>
          );
        }

        const cellValue = street[col.key as keyof Street];

        return (
          <td key={col.key}>
            {cellValue !== undefined && cellValue !== null ? String(cellValue) : '-'}
          </td>
        );
      })}
    </tr>
  );
});

export default StreetItem;