import React from 'react';
import styles from './DeleteButton.module.scss';

interface DeleteButtonProps {
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => {
  return (
    <button 
      className={styles.deleteButton}
      onClick={onDelete}
    >
      מחק
    </button>
  );
};

export default DeleteButton;