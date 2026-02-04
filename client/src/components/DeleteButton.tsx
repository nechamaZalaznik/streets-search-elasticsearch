import React from 'react';

interface DeleteButtonProps {
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => {
  return (
    <button 
      onClick={onDelete}
      style={{
        backgroundColor: 'red',
        color: 'white',
        border: '1px solid black',
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}
    >
      מחק
    </button>
  );
};

export default DeleteButton;