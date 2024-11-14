// src/Notifications.jsx
import './Notifications.css';
import { Link } from 'react-router-dom';

const notificationsData = [
	{
		type: 'follow',
		username: 'Duki',
		message: 'te ha comenzado a seguir',
		time: '2 min',
		profilePic: '/img/duki.png',
	},
	{
		type: 'like',
		username: 'Bad Bunny',
		message: 'le gustó tu publicación',
		time: '1 h',
		profilePic: '/img/BadBunny.jpg',
		postThumbnail: '/img/post.jpg',
	},
	{
		type: 'comment',
		username: 'Eladio',
		message: 'comentó en tu publicación: "🔥"',
		time: '3 h',
		profilePic: '/img/eladio.png',
		postThumbnail: '/img/post.jpg',
	},
	// Agrega tres notificaciones más según lo solicitado
	{
		type: 'follow',
		username: 'Drake',
		message: 'te ha comenzado a seguir',
		time: '5 min',
		profilePic: '/img/drake.png',
	},
	{
		type: 'like',
		username: 'Peso Pluma',
		message: 'le gustó tu publicación',
		time: '2 h',
		profilePic: '/img/pesopluma.png',
		postThumbnail: '/img/post.jpg',
	},
	{
		type: 'comment',
		username: 'R. Santos',
		message: 'comentó en tu publicación: "👌"',
		time: '4 h',
		profilePic: '/img/romeo.jpeg',
		postThumbnail: '/img/post.jpg',
	},
];

const Notifications = () => {
	return (
		<div className="notifications-page">
			{/* Sidebar */}
			<div className="sidebar">
			<h2>
          <Link to="/" className="logo">SPOTIGRAM</Link> {/* Enlace al Home Feed */}
        </h2>
				<ul>
				<Link to="/search" className="icon-button">
            <img src="/icons/SearchIcon.svg" alt="Search Icon" className="search-icon" />
            <span className="icon-text">Buscar</span>
          </Link>
          <Link to="/explore" className="icon-button">
            <img src="/icons/ExploreIcon.svg" alt="Explore Icon" className="search-icon" />
            <span className="icon-text">Explorar</span>
          </Link>
          <Link to="/notifications" className="icon-button">
            <img src="/icons/NotificationsIcon.svg" alt="Notifications Icon" className="search-icon" />
            <span className="icon-text">Notificaciones</span>
          </Link>
          <Link to="/music" className="icon-button">
            <img src="/icons/MusicIcon.svg" alt="Music Icon" className="search-icon" />
            <span className="icon-text">Mi Música</span>
          </Link>
          <Link to="/profile" className="icon-button profile-button">
            <img src="/icons/UserIcon.svg" alt="Profile Icon" className="search-icon" />
            <span className="icon-text">Mi Perfil</span>
          </Link>
				</ul>
			</div>

			{/* Main Content */}
			<div className="notifications-content">
				<h2 className="notifications-title">Notificaciones</h2>
				<div className="notifications-list">
					{notificationsData.map((notification, index) => (
						<div className="notification-item" key={index}>
							<img src={notification.profilePic} alt={`${notification.username} profile`} className="notification-profile-pic" />
							<div className="notification-content">
								<div>
									<span className="notification-username">{notification.username}</span>
									<span className="notification-message">{notification.message}</span>
								</div>
								<div className="notification-time">{notification.time}</div>
							</div>
							{/* Elemento adicional para mostrar la imagen de la publicación, si es una notificación de tipo "like" o "comment" */}
							{(notification.type === 'like' || notification.type === 'comment') && (
								<img src={notification.postThumbnail} alt="Post Thumbnail" className="notification-thumbnail" />
							)}
							{/* Botón de seguir para notificaciones de tipo "follow" */}
							{notification.type === 'follow' && (
								<button className="follow-button">Seguir</button>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Notifications;
