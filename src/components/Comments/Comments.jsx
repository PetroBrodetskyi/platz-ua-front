import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchComments,
  addComment,
  deleteComment,
  addReply,
  deleteReply,
  editComment,
  editReply
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
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [editingText, setEditingText] = useState('');
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

  const handleEditComment = useCallback(
    async (commentId) => {
      if (editingText.trim()) {
        const resultAction = await dispatch(
          editComment({ productId, commentId, text: editingText })
        );
        if (editComment.fulfilled.match(resultAction)) {
          dispatch(fetchComments(productId));
          setNotification('Коментар оновлено');
          setEditingCommentId(null);
          setEditingText('');
        } else {
          setNotification('Помилка редагування коментаря');
        }
      }
    },
    [editingText, dispatch, productId]
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

  const handleEditReply = useCallback(
    async (commentId, replyId) => {
      if (editingText.trim()) {
        const resultAction = await dispatch(
          editReply({ productId, commentId, replyId, text: editingText })
        );
        if (editReply.fulfilled.match(resultAction)) {
          dispatch(fetchComments(productId));
          setNotification('Відповідь оновлено');
          setEditingReplyId(null);
          setEditingText('');
        } else {
          setNotification('Помилка редагування відповіді');
        }
      }
    },
    [editingText, dispatch, productId]
  );

  const handleUserClick = useCallback(
    (userId) => {
      navigate(`/user/${userId}`);
    },
    [navigate]
  );

  const handleLoginClick = useCallback(() => {
    navigate('/auth');
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
                  <h4>{user ? user.name : 'Видалений акаунт'}</h4>
                  <p className={scss.dateTime}>
                    {formatDistanceToNow(new Date(createdAt), {
                      addSuffix: true,
                      locale: uk
                    })}
                  </p>
                </div>
              </div>

              {editingCommentId === _id ? (
                <div className={scss.editForm}>
                  <textarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    placeholder="Редагувати коментар..."
                    className={scss.textarea}
                  />
                  <button
                    className={scss.addReplyButton}
                    onClick={() => handleEditComment(_id)}
                  >
                    Зберегти
                  </button>
                  <button
                    className={scss.cancelButton}
                    onClick={() => {
                      setEditingCommentId(null);
                      setEditingText('');
                    }}
                  >
                    Скасувати
                  </button>
                </div>
              ) : (
                <>
                  <p className={scss.text}>{text}</p>
                  <div className={scss.dateTime}>
                    {currentUser?._id === user?._id && (
                      <>
                        <button
                          className={scss.editButton}
                          onClick={() => {
                            setEditingCommentId(_id);
                            setEditingText(text);
                          }}
                        >
                          Редагувати
                        </button>
                        <button
                          className={scss.deleteButton}
                          onClick={() => handleDeleteComment(_id)}
                        >
                          Видалити
                        </button>
                      </>
                    )}
                    <button
                      className={scss.replyButton}
                      onClick={() => setReplyTo(_id)}
                    >
                      Відповісти
                    </button>
                  </div>
                </>
              )}

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
                  <button
                    className={scss.cancelButton}
                    onClick={() => setReplyTo(null)}
                  >
                    Скасувати
                  </button>
                </div>
              )}

              {replies.length > 0 && (
                <div className={scss.replies}>
                  {replies.map(
                    ({
                      _id: replyId,
                      user: replyUser,
                      text: replyText,
                      createdAt: replyCreatedAt
                    }) => (
                      <div key={replyId || nanoid()} className={scss.reply}>
                        <div
                          className={scss.userContainer}
                          onClick={() =>
                            replyUser && handleUserClick(replyUser._id)
                          }
                          style={{ cursor: replyUser ? 'pointer' : 'default' }}
                        >
                          {replyUser?.avatarURL ? (
                            <img
                              src={replyUser.avatarURL}
                              alt={replyUser.name}
                              className={scss.avatar}
                            />
                          ) : (
                            <div className={scss.iconContainer}>
                              <TbGhost className={scss.icon} />
                            </div>
                          )}
                          <div className={scss.nameContainer}>
                            <h4 className={scss.name}>
                              {replyUser ? replyUser.name : 'Видалений акаунт'}
                            </h4>
                            <p className={scss.dateTime}>
                              {formatDistanceToNow(new Date(replyCreatedAt), {
                                addSuffix: true,
                                locale: uk
                              })}
                            </p>
                          </div>
                        </div>

                        {editingReplyId === replyId ? (
                          <div className={scss.editForm}>
                            <textarea
                              value={editingText}
                              onChange={(e) => setEditingText(e.target.value)}
                              placeholder="Редагувати відповідь..."
                              className={scss.textarea}
                            />
                            <button
                              className={scss.addReplyButton}
                              onClick={() => handleEditReply(_id, replyId)}
                            >
                              Зберегти
                            </button>
                            <button
                              className={scss.cancelButton}
                              onClick={() => {
                                setEditingReplyId(null);
                                setEditingText('');
                              }}
                            >
                              Скасувати
                            </button>
                          </div>
                        ) : (
                          <>
                            <p className={scss.text}>{replyText}</p>
                            <div className={scss.dateTime}>
                              {currentUser?._id === replyUser?._id && (
                                <>
                                  <button
                                    className={scss.editButton}
                                    onClick={() => {
                                      setEditingReplyId(replyId);
                                      setEditingText(replyText);
                                    }}
                                  >
                                    Редагувати
                                  </button>
                                  <button
                                    className={scss.deleteButton}
                                    onClick={() =>
                                      handleDeleteReply(_id, replyId)
                                    }
                                  >
                                    Видалити
                                  </button>
                                </>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Немає коментарів.</p>
        )}
      </div>

      {currentUser ? (
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
          <button className={scss.add} onClick={handleAddComment}>
            <LuArrowUpCircle className={scss.icon} />
          </button>
        </div>
      ) : (
        <div className={scss.loginPrompt}>
          <p>Увійдіть, щоб додати коментарі</p>
          <button onClick={handleLoginClick}>Увійти</button>
        </div>
      )}
    </div>
  );
};

export default Comments;
