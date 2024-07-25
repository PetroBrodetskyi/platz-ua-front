import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments, addComment } from '../../redux/features/commentsSlice';
import { fetchUsers } from '../../redux/features/usersSlice'; // Імпортуємо fetchUsers
import { nanoid } from 'nanoid';
import scss from './Comments.module.scss';

const Comments = ({ productId }) => {
  const dispatch = useDispatch();
  const commentsState = useSelector((state) => state.comments);
  const usersState = useSelector((state) => state.users); // Додаємо селектор для користувачів
  const { comments, loading, error } = commentsState || {};
  const { users } = usersState || {};
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    dispatch(fetchComments(productId));
    dispatch(fetchUsers()); // Додаємо виклик fetchUsers
  }, [dispatch, productId]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      dispatch(addComment({ productId, comment: newComment }));
      setNewComment('');
    }
  };

  const getUserById = (userId) => {
    return users.find(user => user._id === userId) || { name: 'Unknown User' };
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>Error loading comments: {error}</p>;

  return (
    <div className={scss.comments}>
      <h2>Питання та коментарі</h2>
      <div className={scss.commentList}>
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id || nanoid()} className={scss.comment}>
              <h4>{getUserById(comment.user).name}</h4>
              <p>{comment.text}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
      <div className={scss.addComment}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default Comments;
