import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/Header/Navbar";
import Footer from "../../components/Landing/Footer";

function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-black bg-grid-small-white/[0.1]">
      {/* Header */}
      <Navbar />
      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default PublicLayout;
