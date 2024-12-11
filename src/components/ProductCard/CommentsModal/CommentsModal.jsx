import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments } from '../../../redux/features/commentsSlice.js';
import Comments from '../../Comments/Comments.jsx';
import { useTheme } from '../../../context/ThemeContext';
import scss from './CommentsModal.module.scss';

const CommentsModal = ({ show, onToggle, productId, image, name }) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.comments.error);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    dispatch(fetchComments(productId));
  }, [dispatch, productId]);

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

  if (error) return <p>Помилка завантаження коментарів: {error}</p>;

  return (
    <Modal
      isOpen={show}
      onRequestClose={onToggle}
      overlayClassName={scss.modalOverlay}
      className={`${scss.modal} ${isDarkMode ? scss.darkMode : ''}`}
      contentLabel="Коментарі"
      shouldCloseOnOverlayClick={true}
    >
      <div className={scss.container}>
        <div className={scss.header}>
          <h3 className={scss.title}>{name}</h3>
          <button onClick={onToggle}>
            <FiX className={scss.icon} />
          </button>
        </div>
        <div className={scss.imageComments}>
          <div className={scss.imageContainer}>
            <img
              src={image}
              alt="product photo"
              loading="lazy"
              className={scss.image}
            />
          </div>
          <div className={scss.comments}>
            <Comments productId={productId} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CommentsModal;
