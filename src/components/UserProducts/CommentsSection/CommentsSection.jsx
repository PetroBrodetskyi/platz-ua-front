import React from 'react';
import scss from './CommentsSection.module.scss';
import { nanoid } from 'nanoid';

const CommentsSection = ({ comments, newComment, setNewComment, handleAddComment, currentUser }) => (
  <div className={scss.commentsSection}>
    <h3>Питання та коментарі</h3>
    <ul className={scss.commentsList}>
      {comments.map(comment => (
        <li key={comment._id || nanoid()} className={scss.commentItem}>
          <h4>{comment.user.name}</h4>
          <p>{comment.text}</p>
          <p className={scss.dateTime}>
            {new Date(comment.createdAt).toLocaleDateString()} {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </li>
      ))}
    </ul>
    {currentUser && (
      <div className={scss.addComment}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Додати коментар"
        />
        <button onClick={handleAddComment}>Додати</button>
      </div>
    )}
  </div>
);

export default CommentsSection;
