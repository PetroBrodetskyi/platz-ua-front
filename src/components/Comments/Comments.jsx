import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react';
import {
  fetchComments,
  addComment,
  deleteComment,
  editComment
} from '../../redux/features/commentsSlice';
import Notification from '../Notification';
import SubmitButton from '../SubmitButton';
import Modal from '../Modal';
import { TbGhost } from 'react-icons/tb';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { LuSmilePlus } from 'react-icons/lu';
import { nanoid } from 'nanoid';
import { useTheme } from '../../context/ThemeContext';
import scss from './Comments.module.scss';
import { formatDistanceToNow } from 'date-fns';
import { uk } from 'date-fns/locale';
import { Skeleton } from '@mui/material';
import Reply from './Reply';

const Comments = ({ productId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    comments: allComments,
    loading,
    error
  } = useSelector((state) => state.comments);
  const currentUser = useSelector((state) => state.auth.user);

  const commentsForProduct =
    allComments.find((comment) => comment.productId === productId)?.comments ||
    [];

  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [notification, setNotification] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    dispatch(fetchComments(productId));
  }, [dispatch, productId]);

  const handleAction = useCallback(
    async (action, args, successMessage, errorMessage) => {
      const resultAction = await dispatch(action(args));
      setNotification(
        resultAction?.type.endsWith('fulfilled') ? successMessage : errorMessage
      );
      if (resultAction?.type.endsWith('fulfilled'))
        dispatch(fetchComments(productId));
    },
    [dispatch, productId]
  );

  const handleAddComment = () => {
    if (newComment.trim()) {
      handleAction(
        addComment,
        { productId, comment: newComment, user: currentUser },
        'Ваш коментар додано',
        'Помилка додавання коментаря'
      );
      setNewComment('');
      const textareaElement = document.querySelector(`.${scss.textarea}`);
      if (textareaElement) {
        textareaElement.style.height = 'auto';
      }
    }
  };

  const handleDeleteComment = (commentId) =>
    handleAction(
      deleteComment,
      { productId, commentId },
      'Коментар видалено',
      'Помилка видалення коментаря'
    );

  const handleEditComment = (commentId) => {
    if (editingText.trim()) {
      handleAction(
        editComment,
        { productId, commentId, text: editingText },
        'Коментар оновлено',
        'Помилка редагування коментаря'
      );
      setEditingCommentId(null);
      setEditingText('');
    }
  };

  const handleInput = (event) => {
    const target = event.target;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  };

  const onEmojiClick = (emojiData) => {
    setNewComment((prevComment) => prevComment + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleUserClick = (userId) => navigate(`/user/${userId}`);
  const handleLoginClick = () => navigate('/auth');
  const { isDarkMode } = useTheme();

  if (error) return <p>Помилка завантаження коментарів: {error}</p>;

  return (
    <div className={scss.comments}>
      {notification && <Notification message={notification} />}
      <div className={scss.commentList}>
        {loading ? (
          Array.from({ length: 7 }, (_, index) => (
            <div key={index} className={scss.skeleton}>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="80%" />
            </div>
          ))
        ) : commentsForProduct.length ? (
          commentsForProduct.map(({ _id, user, text, createdAt, replies }) => (
            <div key={_id || nanoid()} className={scss.commentsContainer}>
              <div
                className={`${scss.comment} ${isDarkMode ? scss.darkMode : ''}`}
              >
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
                    <p className={scss.date}>
                      {formatDistanceToNow(new Date(createdAt), {
                        addSuffix: true,
                        locale: uk
                      })}
                    </p>
                  </div>
                </div>

                {editingCommentId === _id ? (
                  <div className={scss.editForm}>
                    <div>
                      <textarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onInput={handleInput}
                        placeholder="Редагувати коментар..."
                        className={`${scss.textarea} ${isDarkMode ? scss.darkMode : ''}`}
                      />
                    </div>
                    <div className={scss.actions}>
                      <button
                        className={scss.button}
                        onClick={() => handleEditComment(_id)}
                      >
                        Зберегти
                      </button>
                      <button
                        className={scss.button}
                        onClick={() => {
                          setEditingCommentId(null);
                          setEditingText('');
                        }}
                      >
                        Скасувати
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className={scss.text}>{text}</p>
                    <div className={scss.actions}>
                      {currentUser?._id === user?._id && (
                        <>
                          <button
                            className={scss.button}
                            onClick={() => {
                              setEditingCommentId(_id);
                              setEditingText(text);
                            }}
                          >
                            Редагувати
                          </button>
                          <button
                            className={scss.button}
                            onClick={() => handleDeleteComment(_id)}
                          >
                            Видалити
                          </button>
                        </>
                      )}
                      {currentUser && (
                        <button
                          className={scss.button}
                          onClick={() => setReplyTo(_id)}
                        >
                          Відповісти
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className={scss.replies}>
                <Reply
                  replies={replies}
                  productId={productId}
                  commentId={_id}
                  currentUser={currentUser}
                  onUserClick={handleUserClick}
                  onSetNotification={setNotification}
                  replyTo={replyTo}
                  setReplyTo={setReplyTo}
                />
              </div>
            </div>
          ))
        ) : (
          <p className={scss.noComments}>
            Ви можете написати перший коментар або поставити запитання автору
          </p>
        )}
      </div>

      {currentUser ? (
        <div
          className={`${scss.addComment} ${isDarkMode ? scss.darkMode : ''}`}
        >
          <div className={scss.userText}>
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
              onInput={handleInput}
              placeholder="Додайте коментар..."
              className={`${scss.textarea} ${isDarkMode ? scss.darkMode : ''}`}
            />
          </div>
          <div className={scss.emoji}>
            <button
              className={` ${isDarkMode ? scss.darkMode : ''}`}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <LuSmilePlus className={scss.icon} />
            </button>
            <Modal
              isOpen={showEmojiPicker}
              onClose={() => setShowEmojiPicker(false)}
            >
              <div className={scss.emojiPickerContainer}>
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                  emojiStyle="google"
                  className={scss.EmojiPickerReact}
                />
              </div>
            </Modal>
            <button
              className={`${scss.add} ${isDarkMode ? scss.darkMode : ''}`}
              onClick={handleAddComment}
            >
              Коментувати
            </button>
          </div>
        </div>
      ) : (
        <div className={scss.loginPrompt}>
          <p>Увійдіть, щоб додати коментарі</p>
          <SubmitButton buttonText="Увійти" onClick={handleLoginClick} />
        </div>
      )}
    </div>
  );
};

export default Comments;
