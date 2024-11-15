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
import RandomAnuncios from "./components/RandomAnuncios.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

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
          // Rutas protegidas que usan el Layout y muestran el MusicPlayer
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-post"
              element={
                <ProtectedRoute>
                  <Crete />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-playlist"
              element={
                <ProtectedRoute>
                  <CreatePlaylist />
                </ProtectedRoute>
              }
            />
            <Route
              path="/explore"
              element={
                <ProtectedRoute>
                  <Explore />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notification />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-music"
              element={
                <ProtectedRoute>
                  <MyMusic />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/album"
              element={
                <ProtectedRoute>
                  <Album />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-canciones"
              element={
                <ProtectedRoute>
                  <Cancion />
                </ProtectedRoute>
              }
            />
            <Route
              path="/playlist/:playlistId"
              element={
                <ProtectedRoute>
                  <PlaylistDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/generos"
              element={
                <ProtectedRoute>
                  <GenreList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/songs/:genreId"
              element={
                <ProtectedRoute>
                  <AllSongs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/albums"
              element={
                <ProtectedRoute>
                  <AllAlbums />
                </ProtectedRoute>
              }
            />
            <Route
              path="/album/:albumId"
              element={
                <ProtectedRoute>
                  <AlbumDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/:userId"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ganancias"
              element={
                <ProtectedRoute>
                  <UserEarnings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/anuncios"
              element={
                <ProtectedRoute>
                  <RandomAnuncios />
                </ProtectedRoute>
              }
            />
          </Route>
        )}
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <PlayerProvider>
      {/* Envolvemos toda la app en el PlayerProvider */}
      <Router>
        <App />
      </Router>
    </PlayerProvider>
  );
}

export default AppWrapper;
