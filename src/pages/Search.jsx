// src/SearchPage.jsx
import { Link } from "react-router-dom";

const SearchPage = () => {
  return (
    <div className="flex flex-col items-center w-full p-8 font-oswald">
      {/* Barra de búsqueda */}
      <div className="flex items-center w-full max-w-md mb-8 border border-gray-300 rounded-lg overflow-hidden">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 text-gray-700 outline-none"
        />
        <button className="p-2">
          <img
            src="/icons/SearchIcon.svg"
            alt="Search Icon"
            className="w-6 h-6"
          />
        </button>
      </div>

      {/* Resultados de búsqueda */}
      <div className="w-full max-w-lg">
        <div className="flex items-center mb-4 p-4 bg-zinc-800 rounded-lg">
          <img
            src="/img/duki.png"
            alt="Duki"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h3 className="font-semibold text-lg">
              <Link to="/user" className="text-green-500 no-underline hover:text-green-500">DUKI</Link>
            </h3>
            <p className="text-gray-400">
              Mauro Ezequiel Lombardo - 13.7 M seguidores
            </p>
          </div>
        </div>

        <div className="flex items-center mb-4 p-4 bg-zinc-800 rounded-lg">
          <img
            src="/img/BadBunny.jpg"
            alt="Bad Bunny"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h3 className="font-semibold text-lg">
              <Link to="/user" className="text-green-500 no-underline hover:text-green-500">BAD_BUNNY</Link>
            </h3>
            <p className="text-gray-400">
              Benito Martínez Ocasio - 45.6 M seguidores
            </p>
          </div>
        </div>

        <div className="flex items-center mb-4 p-4 bg-zinc-800 rounded-lg">
          <img
            src="/img/eladio.png"
            alt="Eladio Carrión"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h3 className="font-semibold text-lg">
              <Link to="/user" className="text-green-500 no-underline hover:text-green-500">CARION.ELA</Link>
            </h3>
            <p className="text-gray-400">Eladio Carrión - 7 M seguidores</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
