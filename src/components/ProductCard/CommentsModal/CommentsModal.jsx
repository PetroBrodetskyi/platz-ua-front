import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import Comments from '../../Comments/Comments';
import scss from './CommentsModal.module.scss';
import { useEffect, useState } from 'react';

const CommentsModal = ({ show, onToggle, productId }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains(scss.modalOverlay)) {
      onToggle();
    }
  };

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
            initial={isMobile ? { opacity: 0, x: '100%' } : { opacity: 0, scale: 0.9, y: -20 }}
            animate={isMobile ? { opacity: 1, x: '0%' } : { opacity: 1, scale: 1, y: 0 }}
            exit={isMobile ? { opacity: 0, x: '100%' } : { opacity: 0, scale: 0.9, y: -20 }}
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
