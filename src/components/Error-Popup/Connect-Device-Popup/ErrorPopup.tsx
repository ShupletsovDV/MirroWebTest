
import React, { useEffect } from 'react';
import styles from './ErrorPopup.module.css';


interface ErrorPopupProps {
  message: string;
  onClose: () => void;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({message, onClose }) => {

  useEffect(() => {
  }, []);


  return (
    <>
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <button className={styles.closeButton} onClick={onClose}>✖</button>
          <p>{message}</p>
        </div>
      </div>
    </>
  );
};

export default ErrorPopup;