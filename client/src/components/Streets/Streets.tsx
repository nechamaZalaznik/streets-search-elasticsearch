import React from 'react';
import { toast } from 'react-toastify';
import { UI_MESSAGES } from '../../constants/messages';
import { STREET_TABLE_COLUMNS } from '../../constants/tableConfig';
import { useSearch } from '../../context/SearchContext';
import { deleteStreet } from '../../services/api';
import StreetItem from '../StreetItem/StreetItem';
import styles from "./Streets.module.scss";

const Streets: React.FC = () => {
  const { results, setResults, isLoading, isInitialState } = useSearch();


  const handleDelete = (id: string) => {
    toast(
      ({ closeToast }) => (
        <div className={styles.confirmContainer}>
          <span className={styles.confirmMessage}>
            {UI_MESSAGES.ACTIONS.DELETE_QUESTION}
          </span>
          <div className={styles.confirmActions}>
            <button
              className={styles.deleteBtn}
              onClick={async () => {
                try {
                  closeToast?.();

                  await toast.promise(
                    deleteStreet(id),
                    {
                      pending: UI_MESSAGES.ACTIONS.DELETING_PROCESS,
                      success: UI_MESSAGES.ACTIONS.DELETE_SUCCESS,
                      error: UI_MESSAGES.ERRORS.DELETE_FAILED,
                    }
                  );

                  const updatedResults = results.filter(s => s.id !== id);
                  setResults(updatedResults);

                } catch (error) {
                  console.error('Delete operation failed:', error);
                }
              }}
            >
              {UI_MESSAGES.ACTIONS.DELETE_CONFIRM}
            </button>

            <button className={styles.cancelBtn} onClick={closeToast}>
              {UI_MESSAGES.ACTIONS.DELETE_CANCEL}
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        position: "top-center"
      }
    );
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
        {UI_MESSAGES.SEARCH.NO_RESULTS}
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
            <StreetItem
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

export default Streets;