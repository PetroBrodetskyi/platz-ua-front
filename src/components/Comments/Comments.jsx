import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchComments,
  addComment,
  deleteComment,
} from "../../redux/features/commentsSlice";
import Notification from "../Notification/Notification";
import { TbGhost } from "react-icons/tb";
import { nanoid } from "nanoid";
import scss from "./Comments.module.scss";
import { formatDistanceToNow } from "date-fns";
import { uk } from "date-fns/locale";
import { Skeleton } from "@mui/material";

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

  const [newComment, setNewComment] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    dispatch(fetchComments(productId));
  }, [dispatch, productId]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const resultAction = await dispatch(
        addComment({ productId, comment: newComment, user: currentUser }),
      );
      if (addComment.fulfilled.match(resultAction)) {
        setNewComment("");
        setNotification("Ваш коментар додано");
      } else {
        setNotification("Помилка додавання коментаря");
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    const resultAction = await dispatch(
      deleteComment({ productId, commentId }),
    );
    if (deleteComment.fulfilled.match(resultAction)) {
      setNotification("Коментар видалено");
    } else {
      setNotification("Помилка видалення коментаря");
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  if (error) return <p>Помилка завантаження коментарів: {error}</p>;

  return (
    <div className={scss.comments}>
      {notification && <Notification message={notification} />}
      <div className={scss.commentList}>
        {loading ? (
          [...Array(3)].map((_, index) => (
            <div key={index} className={scss.skeleton}>
              <div className={scss.avatarName}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="text" width="40%" />
              </div>
              <Skeleton variant="text" width="80%" />
            </div>
          ))
        ) : commentsForProduct.length > 0 ? (
          commentsForProduct.map(({ _id, user, text, createdAt }) => (
            <div key={_id || nanoid()} className={scss.comment}>
              <div
                className={scss.userContainer}
                onClick={() => user && handleUserClick(user._id)}
                style={{ cursor: user ? "pointer" : "default" }}
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
                <h4>{user ? user.name : "Видалений акаунт"}</h4>
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
                <p>
                  {formatDistanceToNow(new Date(createdAt), {
                    addSuffix: true,
                    locale: uk,
                  })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Ви можете написати перший коментар</p>
        )}
      </div>
      <div>
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
              Додати коментар
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
