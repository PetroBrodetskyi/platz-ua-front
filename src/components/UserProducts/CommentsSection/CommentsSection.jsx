import { useNavigate } from 'react-router-dom';
import { TbGhost } from 'react-icons/tb';
import { nanoid } from 'nanoid';
import scss from './CommentsSection.module.scss';

const CommentsSection = ({ comments, newComment, setNewComment, handleAddComment, currentUser }) => {
  const navigate = useNavigate();

  const handleUserClick = (userId) => {
    if (userId) {
      navigate(`/user/${userId}`);
    }
  };

  return (
    <div className={scss.commentsSection}>
      <h3>Питання та коментарі</h3>
      <ul className={scss.commentsList}>
        {comments.map(comment => (
          <li key={comment._id || nanoid()} className={scss.commentItem}>
            <div 
              className={scss.avatarName} 
              onClick={() => handleUserClick(comment.user?._id)}
              style={{ cursor: comment.user ? 'pointer' : 'default' }}
            >
              {comment.user && comment.user.avatarURL ? (
                <img 
                  src={comment.user.avatarURL} 
                  alt={comment.user.name} 
                  className={scss.avatar} 
                />
              ) : (
                <div className={scss.iconContainer}>
                  <TbGhost className={scss.icon} />
                </div>
              )}
              <h4>{comment.user ? comment.user.name : 'Видалений акаунт'}</h4>
            </div>
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
};

export default CommentsSection;
