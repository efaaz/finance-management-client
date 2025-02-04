import { Outlet } from "react-router";
import Navbar from "../components/Header/Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Navbar />
      {/* Main Content */}
      <main className="grow">
        <Outlet />
      </main>

      {/* Footer */}
    </div>
  );
};

export default Layout;
