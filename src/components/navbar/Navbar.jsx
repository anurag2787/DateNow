import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";
import { LogIn,  User, Menu, X, Heart } from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../auth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleprofile = async () => {
    navigate("/profile");
  };

  const toggleMobileMenu = () => {
    const tl = gsap.timeline();
    
    if (!isMenuOpen) {
      // Open menu
      gsap.set(".mobile-menu", {
        opacity: 0,
        y: -20,
        display: "flex"
      });
      
      tl.to(".mobile-menu", {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
      
      setIsMenuOpen(true);
    } else {
      // Close menu
      tl.to(".mobile-menu", {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(".mobile-menu", { display: "none" });
        }
      });
      
      setIsMenuOpen(false);
    }
  };

  const closeMobileMenu = () => {
    if (isMenuOpen) {
      toggleMobileMenu();
    }
  };

  const navLinkClasses = ({ isActive }) =>
    `relative px-4 py-2 text-base font-medium transition-all duration-300 ease-in-out hover:text-red-400 hover:after:absolute hover:after:bottom-0 hover:after:left-1/2 hover:after:transform hover:after:-translate-x-1/2 hover:after:w-full hover:after:h-0.5 hover:after:bg-gradient-to-r hover:after:from-red-400 hover:after:to-pink-400 ${
      isActive 
        ? "text-red-400" 
        : "text-white"
    }`;

  const mobileNavLinkClasses = ({ isActive }) =>
    `block px-6 py-3 text-base font-medium transition-all duration-300 ease-in-out ${
      isActive 
        ? "text-red-400 after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-red-400 after:to-pink-400" 
        : "text-white hover:after:absolute hover:after:bottom-0 hover:after:left-1/2 hover:after:transform hover:after:-translate-x-1/2 hover:after:w-full hover:after:h-0.5 hover:after:bg-gradient-to-r hover:after:from-red-400 hover:after:to-pink-400"
    }`;

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-900 backdrop-blur-md shadow-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick ={() => window.location.href = "/"}>
              <Heart className="h-7 w-7 text-red-400 animate-pulse" />
              <div className="text-2xl font-bold">
                <span className="text-white">Date</span>
                <span className="text-red-400">Now</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="/" className={navLinkClasses}>
                Home
              </NavLink>
              <NavLink to="/about" className={navLinkClasses}>
                About Us
              </NavLink>
              <NavLink to="/contact" className={navLinkClasses}>
                Contact Us
              </NavLink>
              <NavLink to="/talk" className={navLinkClasses}>
                General Talk
              </NavLink>
              <NavLink to="/personality" className={navLinkClasses}>
                Personality Check
              </NavLink>
            </div>

            {/* Desktop Auth Button */}
            <div className="hidden md:flex items-center">
              {user ? (
                <button
                  onClick={handleprofile}
                  className="flex items-center space-x-2 bg-red-500 hover:bg-[#ffdad7] hover:text-black text-white px-5 py-2 rounded-md transition-all duration-300 font-medium text-sm border border-red-500 hover:border-red-600 hover:shadow-md"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className="flex items-center space-x-2 bg-red-500 hover:bg-[#ffdad7] hover:text-black text-white px-5 py-2 rounded-md transition-all duration-300 font-medium text-sm border border-red-500 hover:border-red-600 hover:shadow-md"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </NavLink>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-red-400 hover:bg-gray-800 transition-all duration-300"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
  className="mobile-menu md:hidden bg-gradient-to-b from-gray-900 to-black border-t border-gray-800 shadow-xl flex items-center justify-center"
  style={{ display: "none" }}
>
  <div className="flex flex-col items-center justify-center space-y-2 px-4 py-8">
    <NavLink 
      to="/"
      className={mobileNavLinkClasses}
      onClick={closeMobileMenu}
    >
      Home
    </NavLink>
    <NavLink 
      to="/about"
      className={mobileNavLinkClasses}
      onClick={closeMobileMenu}
    >
      About Us
    </NavLink>
    <NavLink 
      to="/contact"
      className={mobileNavLinkClasses}
      onClick={closeMobileMenu}
    >
      Contact Us
    </NavLink>
    <NavLink 
      to="/talk"
      className={mobileNavLinkClasses}
      onClick={closeMobileMenu}
    >
      General Talk
    </NavLink>
    <NavLink 
      to="/personality"
      className={mobileNavLinkClasses}
      onClick={closeMobileMenu}
    >
      Personality Check
    </NavLink>
    
    <div className="pt-4 mt-2 border-t border-gray-800">
      {user ? (
        <button
          onClick={() => {
            handleProfile();
            closeMobileMenu();
          }}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-full transition-all duration-300 shadow-md"
        >
          <User className="h-4 w-4" />
          <span className="font-medium">Profile</span>
        </button>
      ) : (
        <NavLink
          to="/login"
          onClick={closeMobileMenu}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-full transition-all duration-300 shadow-md"
        >
          <LogIn className="h-4 w-4" />
          <span className="font-medium">Login</span>
        </NavLink>
      )}
    </div>
  </div>
</div>
      </nav>
    </>
  );
}

export default Navbar;