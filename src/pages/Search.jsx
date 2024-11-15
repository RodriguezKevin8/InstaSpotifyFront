import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      try {
        const response = await axios.get(
          `http://localhost:3000/usuario/${value}`
        );
        if (response.data.status) {
          setSearchResults(response.data.value);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-8">
      <div className="flex items-center w-full max-w-md mb-8 border border-gray-300 rounded-lg overflow-hidden">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
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

      <div className="w-full max-w-lg">
        {searchResults.length > 0
          ? searchResults.map((user) => (
              <div
                key={user.id}
                className="flex items-center mb-4 p-4 bg-zinc-700 rounded-lg"
              >
                <img
                  src={user.perfil?.avatar_url || "/img/default-avatar.jpg"}
                  alt={user.username}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-lg">
                    {console.log(user.id)}
                    <Link to={`/user/${user.id}`} className="text-green-500">
                      {user.username}
                    </Link>
                  </h3>
                  <p className="text-gray-400">
                    {user.nombre} - {user.role}
                  </p>
                </div>
              </div>
            ))
          : searchTerm && (
              <p className="text-gray-400 text-center">
                No users found for "{searchTerm}"
              </p>
            )}
      </div>
    </div>
  );
};

export default SearchPage;
