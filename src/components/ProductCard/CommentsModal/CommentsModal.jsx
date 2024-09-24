import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import Comments from '../../Comments/Comments';
import scss from './CommentsModal.module.scss';

const CommentsModal = ({ show, onToggle, productId }) => {
  const handleOverlayClick = (event) => {
    if (event.target.classList.contains(scss.modalOverlay)) {
      onToggle();
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={scss.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            className={scss.commentsModal}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className={scss.container}>
              <div className={scss.header}>
                <h3>Питання та коментарі</h3>
                <button onClick={onToggle}>
                  <FiX className={scss.closeIcon} />
                </button>
              </div>
              <Comments productId={productId} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommentsModal;
