import React, { ReactNode } from 'react';
import styles from "@/style/Popup.module.css";

interface PopupProps {
  content: ReactNode;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ content, onClose }) => {
  return (
    <div className={styles.popup_overlay}>
      <div className={styles.popup_container}>
        <div className={styles.button_container}>
          <button className={styles.close_button} onClick={onClose}>
            &times;
          </button>
        </div>
        {content}
      </div>
    </div>
  );
};

export default Popup;


