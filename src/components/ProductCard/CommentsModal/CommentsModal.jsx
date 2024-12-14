import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments } from '../../../redux/features/commentsSlice.js';
import Comments from '../../Comments/Comments.jsx';
import BaseModal from '../../BaseModal';
import scss from './CommentsModal.module.scss';

const CommentsModal = ({ show, onToggle, productId, image, name }) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.comments.error);

  useEffect(() => {
    if (show) {
      dispatch(fetchComments(productId));
    }
  }, [dispatch, productId, show]);

  if (error) return <p>Помилка завантаження коментарів: {error}</p>;

  return (
    <BaseModal
      show={show}
      onToggle={onToggle}
      contentLabel="Коментарі"
      title={name}
    >
      <div className={scss.imageComments}>
        <div className={scss.imageContainer}>
          <img src={image} alt={name} loading="lazy" className={scss.image} />
        </div>
        <div className={scss.comments}>
          <Comments productId={productId} />
        </div>
      </div>
    </BaseModal>
  );
};

export default CommentsModal;
