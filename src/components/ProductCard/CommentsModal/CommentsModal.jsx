import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import Comments from '../../Comments/Comments';
import scss from './CommentsModal.module.scss';
import { useEffect, useState } from 'react';

Modal.setAppElement('#root');

const CommentsModal = ({ show, onToggle, productId }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (show) {
      document.body.classList.add(scss.noScroll);
    } else {
      document.body.classList.remove(scss.noScroll);
    }

    return () => document.body.classList.remove(scss.noScroll);
  }, [show]);

  return (
    <Modal
      isOpen={show}
      onRequestClose={onToggle}
      overlayClassName={scss.modalOverlay}
      className={scss.commentsModal}
      contentLabel="Коментарі"
      shouldCloseOnOverlayClick={true}
    >
      <div className={scss.container}>
        <div className={scss.header}>
          <h3 className={scss.title}>Коментарі</h3>
          <button onClick={onToggle}>
            <FiX className={scss.closeIcon} />
          </button>
        </div>
        <Comments productId={productId} />
      </div>
    </Modal>
  );
};

export default CommentsModal;
