// src/Notifications.jsx
import { Link } from "react-router-dom";

const notificationsData = [
  {
    type: "follow",
    username: "Duki",
    message: "te ha comenzado a seguir",
    time: "2 min",
    profilePic: "/img/duki.png",
  },
  {
    type: "like",
    username: "Bad Bunny",
    message: "le gustó tu publicación",
    time: "1 h",
    profilePic: "/img/BadBunny.jpg",
    postThumbnail: "/img/post.jpg",
  },
  {
    type: "comment",
    username: "Eladio",
    message: 'comentó en tu publicación: "🔥"',
    time: "3 h",
    profilePic: "/img/eladio.png",
    postThumbnail: "/img/post.jpg",
  },
  {
    type: "follow",
    username: "Drake",
    message: "te ha comenzado a seguir",
    time: "5 min",
    profilePic: "/img/drake.png",
  },
  {
    type: "like",
    username: "Peso Pluma",
    message: "le gustó tu publicación",
    time: "2 h",
    profilePic: "/img/pesopluma.png",
    postThumbnail: "/img/post.jpg",
  },
  {
    type: "comment",
    username: "R. Santos",
    message: 'comentó en tu publicación: "👌"',
    time: "4 h",
    profilePic: "/img/romeo.jpeg",
    postThumbnail: "/img/post.jpg",
  },
];

const Notifications = () => {
  return (
    <div className="flex flex-col items-center w-full p-8 space-y-4 font-oswald">
      <h2 className="text-5xl font-bold text-green-500 mb-4">Notificaciones</h2>
      <div className="w-full max-w-3xl space-y-4">
        {notificationsData.map((notification, index) => (
          <div
            key={index}
            className="flex items-center bg-zinc-800 rounded-lg p-4 space-x-4"
          >
            <img
              src={notification.profilePic}
              alt={`${notification.username} profile`}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col flex-1">
              <div className="text-lg text-green-500">
                <span className="font-bold">{notification.username} </span>
                <span>{notification.message}</span>
              </div>
              <div className="text-md text-gray-400">{notification.time}</div>
            </div>
            {/* Imagen de la publicación si es una notificación de tipo "like" o "comment" */}
            {(notification.type === "like" ||
              notification.type === "comment") && (
              <img
                src={notification.postThumbnail}
                alt="Post Thumbnail"
                className="w-12 h-12 rounded-lg object-cover"
              />
            )}
            {/* Botón de seguir si es una notificación de tipo "follow" */}
            {notification.type === "follow" && (
              <button className="text-lg font-semibold text-green-500 border border-green-500 rounded-lg px-4 py-1 hover:bg-green-500 hover:text-white transition">
                Seguir
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
