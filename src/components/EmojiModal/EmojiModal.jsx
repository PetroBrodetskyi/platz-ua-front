import { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import scss from './EmojiModal.module.scss';

const EmojiModal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className={scss.overlay} onClick={onClose}>
      <div className={scss.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={scss.closeButton} onClick={onClose}>
          <IoClose className={scss.icon} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default EmojiModal;
