// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Album from "./Album.jsx";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./Register";
import Profile from "./pages/Profile";
import Crete from "./CreatePost";
import Explore from "./pages/Explorer";
import Search from "./pages/Search";
import Notification from "./pages/Notification";
import MyMusic from "./pages/MyMusic";
import CreatePlaylist from "./CreatePlaylist";
import UserProfile from "./components/UserProfile";
import Cancion from "./Cancion.jsx";
import PlaylistDetail from "./pages/PlaylistDetails.jsx";
import GenreList from "./pages/GenreList.jsx";
import AllSongs from "./pages/AllSongs.jsx";
import AllAlbums from "./pages/AllAlbums.jsx";
import AlbumDetail from "./pages/AlbumDetail.jsx";
import UserEarnings from "./components/UserEarnings.jsx";
import { PlayerProvider } from "./contexts/PlayerContext.jsx";
import "./App.css";

function App() {
  const location = useLocation();

  // Determina si es una página de login o registro para ocultar el Layout
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div>
      <Routes>
        {isAuthPage ? (
          // Rutas de autenticación que no necesitan el Layout
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          // Rutas que usan el Layout y muestran el MusicPlayer
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-post" element={<Crete />} />
            <Route path="/create-playlist" element={<CreatePlaylist />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/search" element={<Search />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="/my-music" element={<MyMusic />} />
            <Route path="/user" element={<UserProfile />} />
            <Route path="/album" element={<Album />} />
            <Route path="/add-canciones" element={<Cancion />} />
            <Route path="/playlist/:playlistId" element={<PlaylistDetail />} />
            <Route path="/generos" element={<GenreList />} />
            <Route path="/songs/:genreId" element={<AllSongs />} />
            <Route path="/albums" element={<AllAlbums />} />
            <Route path="/album/:albumId" element={<AlbumDetail />} />
            <Route path="/user/:userId" element={<UserProfile />} />
            <Route path="/ganancias" element={<UserEarnings />} />
          </Route>
        )}
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <PlayerProvider>
      {" "}
      {/* Envolvemos toda la app en el PlayerProvider */}
      <Router>
        <App />
      </Router>
    </PlayerProvider>
  );
}

export default AppWrapper;
