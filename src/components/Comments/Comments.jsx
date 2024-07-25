import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments, addComment } from '../../redux/features/commentsSlice';
import { nanoid } from 'nanoid';
import scss from './Comments.module.scss';

const Comments = ({ productId }) => {
  const dispatch = useDispatch();
  const commentsState = useSelector((state) => state.comments);
  const { comments, loading, error } = commentsState || {};
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    dispatch(fetchComments(productId));
  }, [dispatch, productId]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      await dispatch(addComment({ productId, comment: newComment }));
      setNewComment('');
    }
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>Error loading comments: {error}</p>;

  return (
    <div className={scss.comments}>
      <h2>Comments</h2>
      <div className={scss.commentList}>
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id || nanoid()} className={scss.comment}>
              <h4>{comment.user ? comment.user.name : 'Anonymous'}</h4>
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
