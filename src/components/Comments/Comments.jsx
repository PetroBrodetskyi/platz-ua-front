import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchComments, addComment, deleteComment } from '../../redux/features/commentsSlice';
import Notification from '../Notification/Notification';
import { nanoid } from 'nanoid';
import scss from './Comments.module.scss';

const Comments = ({ productId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allComments = useSelector((state) => state.comments.comments);
  const currentUser = useSelector((state) => state.auth.user);
  const commentsForProduct = allComments.find(comment => comment.productId === productId)?.comments || [];
  const [newComment, setNewComment] = useState('');
  const [notification, setNotification] = useState('');
  const loading = useSelector((state) => state.comments.loading);
  const error = useSelector((state) => state.comments.error);

  useEffect(() => {
    dispatch(fetchComments(productId));
  }, [dispatch, productId]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const resultAction = await dispatch(addComment({ productId, comment: newComment, user: currentUser }));
      if (addComment.fulfilled.match(resultAction)) {
        setNewComment('');
        setNotification('Ваш коментар додано');
      } else {
        setNotification('Помилка додавання коментаря');
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
  const resultAction = await dispatch(deleteComment({ productId, commentId }));
    if (deleteComment.fulfilled.match(resultAction)) {
      setNotification('Коментар видалено');
    } else {
      setNotification('Помилка видалення коментаря');
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  if (loading) return <p>Завантаження коментарів...</p>;
  if (error) return <p>Помилка завантаження коментарів: {error}</p>;

  return (
    <div className={scss.comments}>
      {notification && (
        <Notification message={notification} />
      )}
      <div className={scss.commentList}>
        {commentsForProduct.length > 0 ? (
          commentsForProduct.map((comment) => (
            <div key={comment._id || nanoid()} className={scss.comment}>
              <div className={scss.userContainer} onClick={() => handleUserClick(comment.user._id)}>
                <img 
                  src={comment.user.avatarURL} 
                  alt={comment.user.name} 
                  className={scss.avatar} 
                />
                <h4>{comment.user ? comment.user.name : 'Anonymous'}</h4>
              </div>
              <p>{comment.text}</p>
              <div className={scss.dateTime}>
                <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
                <p>{new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              {currentUser?._id === comment.user._id && (
                <button 
                  className={scss.deleteButton} 
                  onClick={() => handleDeleteComment(comment._id)}
                >
                  Видалити
                </button>
              )}
            </div>
          ))
        ) : (
          <p>Ви можете написати перший коментар</p>
        )}
      </div>
      {currentUser ? (
        <div className={scss.addComment}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Додати коментар..."
            className={scss.textarea}
          />
          <button onClick={handleAddComment}>Додати коментар</button>
        </div>
      ) : (
        <div className={scss.loginPrompt}>
          <p>Увійдіть, щоб відправити повідомлення.</p>
          <button onClick={handleLoginClick}>Увійти</button>
        </div>
      )}
    </div>
  );
};

export default Comments;
