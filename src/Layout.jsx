import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Cursor from "./components/Cursor/Cursor";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from 'react-toastify';

function Layout() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-[#F8A199]">
        <Analytics />
        <Navbar />
        <Cursor />
        <main className="flex-grow">
          <Outlet />
        </main>
        <ToastContainer />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default Layout;
