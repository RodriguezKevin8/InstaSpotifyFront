// Layout.js

import Sidebar from "./Sidebar";
import Player from "./Player";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen w-screen bg-zinc-900 text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Outlet: Área Principal */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>

        {/* Player en la parte inferior */}
        <Player />
      </div>
    </div>
  );
};

export default Layout;
