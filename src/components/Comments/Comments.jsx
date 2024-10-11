import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchComments,
  addComment,
  deleteComment,
  addReply,
  deleteReply
} from '../../redux/features/commentsSlice';
import Notification from '../Notification/Notification';
import { TbGhost } from 'react-icons/tb';
import { LuArrowUpCircle } from 'react-icons/lu';
import { nanoid } from 'nanoid';
import scss from './Comments.module.scss';
import { formatDistanceToNow } from 'date-fns';
import { uk } from 'date-fns/locale';
import { Skeleton } from '@mui/material';

const Comments = ({ productId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allComments = useSelector((state) => state.comments.comments);
  const currentUser = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.comments.loading);
  const error = useSelector((state) => state.comments.error);

  const commentsForProduct =
    allComments.find((comment) => comment.productId === productId)?.comments ||
    [];

  const [newComment, setNewComment] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    dispatch(fetchComments(productId));
  }, [dispatch, productId]);

  const handleAddComment = useCallback(async () => {
    if (newComment.trim()) {
      const resultAction = await dispatch(
        addComment({ productId, comment: newComment, user: currentUser })
      );
      setNotification(
        addComment.fulfilled.match(resultAction)
          ? 'Ваш коментар додано'
          : 'Помилка додавання коментаря'
      );
      setNewComment('');
    }
  }, [newComment, dispatch, productId, currentUser]);

  const handleDeleteComment = useCallback(
    async (commentId) => {
      const resultAction = await dispatch(
        deleteComment({ productId, commentId })
      );
      setNotification(
        deleteComment.fulfilled.match(resultAction)
          ? 'Коментар видалено'
          : 'Помилка видалення коментаря'
      );
    },
    [dispatch, productId]
  );

  const handleAddReply = useCallback(
    async (commentId) => {
      if (replyText.trim()) {
        const resultAction = await dispatch(
          addReply({
            productId,
            commentId,
            reply: replyText,
            user: currentUser
          })
        );

        if (addReply.fulfilled.match(resultAction)) {
          dispatch(fetchComments(productId));
          setNotification('Ваша відповідь додана');
          setReplyText('');
          setReplyTo(null);
        } else {
          setNotification('Помилка додавання відповіді');
        }
      }
    },
    [replyText, dispatch, productId, currentUser]
  );

  const handleDeleteReply = useCallback(
    async (commentId, replyId) => {
      const resultAction = await dispatch(
        deleteReply({ productId, commentId, replyId })
      );

      setNotification(
        deleteReply.fulfilled.match(resultAction)
          ? 'Відповідь видалено'
          : 'Помилка видалення відповіді'
      );
    },
    [dispatch, productId]
  );

  const handleUserClick = useCallback(
    (userId) => {
      navigate(`/user/${userId}`);
    },
    [navigate]
  );

  const handleLoginClick = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  if (error) return <p>Помилка завантаження коментарів: {error}</p>;

  return (
    <div className={scss.comments}>
      <h3 className={scss.title}>Коментарі</h3>
      {notification && <Notification message={notification} />}
      <div className={scss.commentList}>
        {loading ? (
          Array.from({ length: 7 }, (_, index) => (
            <div key={index} className={scss.skeleton}>
              <div className={scss.avatarName}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="text" width="40%" />
              </div>
              <Skeleton variant="text" width="80%" />
            </div>
          ))
        ) : commentsForProduct.length ? (
          commentsForProduct.map(({ _id, user, text, createdAt, replies }) => (
            <div key={_id || nanoid()} className={scss.comment}>
              <div
                className={scss.userContainer}
                onClick={() => user && handleUserClick(user._id)}
                style={{ cursor: user ? 'pointer' : 'default' }}
              >
                {user?.avatarURL ? (
                  <img
                    src={user.avatarURL}
                    alt={user.name}
                    className={scss.avatar}
                  />
                ) : (
                  <div className={scss.iconContainer}>
                    <TbGhost className={scss.icon} />
                  </div>
                )}
                <div className={scss.nameContainer}>
                  <h4 className={scss.name}>
                    {user ? user.name : 'Видалений акаунт'}
                  </h4>
                  <p className={scss.dateTime}>
                    {formatDistanceToNow(new Date(createdAt), {
                      addSuffix: true,
                      locale: uk
                    })}
                  </p>
                </div>
              </div>
              <p className={scss.text}>{text}</p>

              <div className={scss.dateTime}>
                {currentUser?._id === user?._id && (
                  <button
                    className={scss.deleteButton}
                    onClick={() => handleDeleteComment(_id)}
                  >
                    Видалити
                  </button>
                )}
                <button
                  className={scss.replyButton}
                  onClick={() => setReplyTo(_id)}
                >
                  Відповісти
                </button>
              </div>

              {/* {replies?.map((reply) => (
                <div key={reply._id || nanoid()} className={scss.reply}>
                  <p className={scss.replyText}>
                    <strong>{reply.user.name}: </strong>
                    {reply.text}
                  </p>
                </div>
              ))} */}

              {replyTo === _id && (
                <div className={scss.replyForm}>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Написати відповідь..."
                    className={scss.textarea}
                  />
                  <button
                    className={scss.addReplyButton}
                    onClick={() => handleAddReply(_id)}
                  >
                    Відправити
                  </button>
                </div>
              )}
              {replies?.map((reply) => (
                <div key={reply._id || nanoid()} className={scss.reply}>
                  <p className={scss.replyText}>
                    <strong>{reply.user.name}: </strong>
                    {reply.text}
                  </p>
                  {currentUser?._id === reply.user._id && (
                    <button
                      className={scss.deleteReplyButton}
                      onClick={() => handleDeleteReply(_id, reply._id)}
                    >
                      Видалити відповідь
                    </button>
                  )}
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>Ви можете написати перший коментар</p>
        )}
      </div>
      <div className={scss.commentForm}>
        {currentUser ? (
          <div className={scss.addContainer}>
            <div className={scss.addComment}>
              {currentUser.avatarURL ? (
                <img
                  src={currentUser.avatarURL}
                  alt={currentUser.name}
                  className={scss.avatar}
                />
              ) : (
                <div className={scss.iconContainer}>
                  <TbGhost className={scss.icon} />
                </div>
              )}
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Додати коментар..."
                className={scss.textarea}
              />
            </div>
            <button className={scss.add} onClick={handleAddComment}>
              <LuArrowUpCircle className={scss.icon} />
            </button>
          </div>
        ) : (
          <div className={scss.loginPrompt}>
            <p>Увійдіть, щоб відправити повідомлення.</p>
            <button onClick={handleLoginClick}>Увійти</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
