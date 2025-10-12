import React from 'react';
import { Heart } from "lucide-react";
import { FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 relative overflow-hidden border-t border-gray-800">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/95 to-gray-800/30"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-red-500/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-64 h-24 bg-blue-500/5 blur-2xl rounded-full"></div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-8 relative z-10">
        
        {/* Top section with logo and navigation */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-6">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Heart className="h-6 w-6 text-red-400 animate-pulse" />
            <div className="text-2xl font-bold tracking-tight">
              <span className="text-white">Date</span>
              <span className="text-red-400">Now</span>
            </div>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="/about"
              className="text-gray-300 hover:text-white text-sm font-medium transition-all duration-300 hover:scale-105"
            >
              About Us
            </a>
            <a
              href="/contact"
              className="text-gray-300 hover:text-white text-sm font-medium transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </a>
            <a
              href="/privacy-policy"
              className="text-gray-300 hover:text-white text-sm font-medium transition-all duration-300 hover:scale-105"
            >
              Privacy Policy
            </a>
          </nav>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6"></div>

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          
          {/* Copyright */}
          <div className="text-gray-400 order-2 sm:order-1">
            © {new Date().getFullYear()} DateNow. All rights reserved.
          </div>
          
          {/* Made by section */}
          <div className="flex items-center gap-3 text-gray-500 order-1 sm:order-2">
            <span className="flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-red-400 animate-pulse" /> by
            </span>
            <span className="text-gray-300 font-medium">Anurag Yadav</span>
            <a
              href="https://github.com/anurag2787"
              className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 p-1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <FaGithub className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;