import React from 'react';
import styles from './DeleteButton.module.scss';
import { UI_MESSAGES } from '../../constants/messages';

interface DeleteButtonProps {
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => {
  return (
    <button 
      className={styles.deleteButton}
      onClick={onDelete}
      title={UI_MESSAGES.ACTIONS.DELETE_TITLE} 
    >
      {UI_MESSAGES.ACTIONS.DELETE_CONFIRM}
    </button>
  );
};

export default DeleteButton;