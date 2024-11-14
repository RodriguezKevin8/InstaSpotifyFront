import PropTypes from 'prop-types';
import { useState } from 'react';
import './HomeFeed.css';

const Post = ({ avatar, name, time, contentImage, comments = [] }) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  // Comentarios de ejemplo para pruebas, incluyendo URLs de avatar
  const sampleComments = [
    { user: "Usuario1", text: "¡Me encanta esta publicación!", avatar: "/img/user1.jpg" },
    { user: "Usuario2", text: "Muy buena foto 👍", avatar: "/img/user2.jpg" },
    { user: "Usuario3", text: "Increíble lugar, ¿dónde es?", avatar: "/img/user3.jpg" }
  ];

  const openComments = () => {
    setIsCommentsOpen(true);
  };

  const closeComments = () => {
    setIsCommentsOpen(false);
  };

  return (
    <div className="feed-post">
      <div className="post-header">
        <img src={avatar} alt={`${name}'s avatar`} />
        <div>
          <h3>{name}</h3>
          <p>{time}</p>
        </div>
      </div>
      <img src={contentImage} alt="post content" className="post-image" />
      <div className="post-actions">
        <button className="like-button">
          <img src="/icons/NotificationsIcon.svg" alt="Like Icon" className="like-icon" />
        </button>
        <button className="comment-button" onClick={openComments}>
          <img src="/icons/CommentIcon.svg" alt="Comment Icon" className="comment-icon" />
        </button>
        <button className="save-button">
          <img src="/icons/FavoriteIcon.svg" alt="Save Icon" className="save-icon" />
        </button>
      </div>

      {isCommentsOpen && (
        <div className="comments-overlay">
          <div className="comments">
            <button onClick={closeComments} className="close-comments">
              &times;
            </button>
            <h2>Comentarios</h2>
            <div className="comments-list">
              {(comments.length > 0 ? comments : sampleComments).map((comment, index) => (
                <div key={index} className="comment">
                  <img src={comment.avatar || "/img/BadBunny.jpg"} alt={`${comment.user}'s avatar`} className="comment-avatar" />
                  <p><strong>{comment.user}:</strong> {comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Validación de tipos de propiedades
Post.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  contentImage: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      avatar: PropTypes.string // URL de la imagen de avatar del usuario
    })
  )
};

export default Post;
