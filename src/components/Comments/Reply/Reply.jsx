import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addReply,
  deleteReply,
  editReply,
  fetchComments
} from '../../../redux/features/commentsSlice';
import { useTheme } from '../../../context/ThemeContext';
import { TbGhost } from 'react-icons/tb';
import { formatDistanceToNow } from 'date-fns';
import { uk } from 'date-fns/locale';
import scss from './Reply.module.scss';

const Reply = ({
  replies,
  productId,
  commentId,
  currentUser,
  onUserClick,
  onSetNotification,
  replyTo,
  setReplyTo
}) => {
  const dispatch = useDispatch();
  const [replyText, setReplyText] = useState('');
  const [editing, setEditing] = useState({ id: null, text: '' });
  const { isDarkMode } = useTheme();

  const handleAddReply = useCallback(async () => {
    if (replyText.trim()) {
      const resultAction = await dispatch(
        addReply({ productId, commentId, reply: replyText, user: currentUser })
      );

      onSetNotification(
        addReply.fulfilled.match(resultAction)
          ? 'Ваша відповідь додана'
          : 'Помилка додавання відповіді'
      );

      if (addReply.fulfilled.match(resultAction)) {
        dispatch(fetchComments(productId));
        setReplyTo(null);
      }
      setReplyText('');
    }
  }, [
    replyText,
    dispatch,
    productId,
    commentId,
    currentUser,
    onSetNotification,
    setReplyTo
  ]);

  const handleDeleteReply = useCallback(
    async (replyId) => {
      const resultAction = await dispatch(
        deleteReply({ productId, commentId, replyId })
      );

      onSetNotification(
        deleteReply.fulfilled.match(resultAction)
          ? 'Відповідь видалена'
          : 'Помилка видалення відповіді'
      );
    },
    [dispatch, productId, commentId, onSetNotification]
  );

  const handleEditReply = useCallback(
    async (replyId) => {
      if (editing.text.trim()) {
        const resultAction = await dispatch(
          editReply({ productId, commentId, replyId, text: editing.text })
        );

        if (editReply.fulfilled.match(resultAction)) {
          onSetNotification('Відповідь оновлено');
          setEditing({ id: null, text: '' });
        } else {
          onSetNotification('Помилка редагування відповіді');
        }
      }
    },
    [editing.text, dispatch, productId, commentId, onSetNotification]
  );

  const handleCancelReply = () => {
    setReplyText('');
    setReplyTo(null);
  };

  const handleInput = (event) => {
    const target = event.target;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  };

  return (
    <div
      className={`${scss.replyContainer} ${isDarkMode ? scss.darkMode : ''}`}
    >
      {replyTo === commentId && (
        <div className={scss.replyInput}>
          <div className={scss.avatarText}>
            <img
              src={currentUser.avatarURL || <TbGhost className={scss.icon} />}
              alt={currentUser.name || 'Анонім'}
              className={scss.avatar}
            />
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onInput={handleInput}
              placeholder="Ваша відповідь..."
              className={`${scss.textarea} ${isDarkMode ? scss.darkMode : ''}`}
            />
          </div>
          <div className={scss.actions}>
            <button className={scss.button} onClick={handleAddReply}>
              Відповісти
            </button>
            <button className={scss.button} onClick={handleCancelReply}>
              Скасувати
            </button>
          </div>
        </div>
      )}

      {replies.length > 0 && (
        <div className={scss.replyList}>
          {replies.map(({ _id, user, text, createdAt }) => (
            <div key={_id} className={scss.reply}>
              <div
                className={scss.userContainer}
                onClick={() => user && onUserClick(user._id)}
                style={{ cursor: user ? 'pointer' : 'default' }}
              >
                <img
                  src={user?.avatarURL || <TbGhost className={scss.icon} />}
                  alt={user?.name || 'Анонім'}
                  className={scss.avatar}
                />
                <div className={scss.nameContainer}>
                  <h4>{user ? user.name : 'Видалений акаунт'}</h4>
                  <p className={scss.date}>
                    {formatDistanceToNow(new Date(createdAt), {
                      addSuffix: true,
                      locale: uk
                    })}
                  </p>
                </div>
              </div>
              {editing.id === _id ? (
                <div className={scss.editForm}>
                  <textarea
                    value={editing.text}
                    onChange={(e) =>
                      setEditing({ id: _id, text: e.target.value })
                    }
                    onInput={handleInput}
                    placeholder="Редагувати відповідь..."
                    className={`${scss.textarea} ${isDarkMode ? scss.darkMode : ''}`}
                  />
                  <div className={scss.actions}>
                    <button
                      className={scss.button}
                      onClick={() => handleEditReply(_id)}
                    >
                      Зберегти
                    </button>
                    <button
                      className={scss.button}
                      onClick={() => setEditing({ id: null, text: '' })}
                    >
                      Скасувати
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className={scss.text}>{text}</p>
                  {currentUser?._id === user?._id && (
                    <div className={scss.actions}>
                      <button
                        className={scss.button}
                        onClick={() => setEditing({ id: _id, text })}
                      >
                        Редагувати
                      </button>
                      <button
                        className={scss.button}
                        onClick={() => handleDeleteReply(_id)}
                      >
                        Видалити
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reply;
