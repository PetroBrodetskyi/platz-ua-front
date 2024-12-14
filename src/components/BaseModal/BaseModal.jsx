import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import scss from './BaseModal.module.scss';

const BaseModal = ({
  show,
  onToggle,
  contentLabel,
  children,
  title,
  className
}) => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [show]);

  return (
    <Modal
      isOpen={show}
      onRequestClose={onToggle}
      overlayClassName={scss.modalOverlay}
      className={`${scss.modal} ${className} ${isDarkMode ? scss.darkMode : ''}`}
      contentLabel={contentLabel}
      shouldCloseOnOverlayClick
    >
      <div className={scss.container}>
        <div className={scss.header}>
          <h3 className={scss.title}>{title}</h3>
          <button className={scss.closeButton} onClick={onToggle}>
            <FiX className={scss.icon} />
          </button>
        </div>
        {children}
      </div>
    </Modal>
  );
};

export default BaseModal;
