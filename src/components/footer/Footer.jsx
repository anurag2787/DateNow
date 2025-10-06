import React from 'react';
import { Heart } from "lucide-react";
import { FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 relative overflow-hidden border-t border-gray-800">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/95 to-gray-800/30"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-red-500/10 blur-3xl rounded-full"></div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-3 relative z-10">

        {/* All content in single compact section */}
        <div className="text-center">
          {/* Logo and Navigation - Responsive Layout */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-2">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-400 animate-pulse" />
              <div className="text-xl font-bold tracking-tight">
                <span className="text-white">Date</span>
                <span className="text-red-400">Now</span>
              </div>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-600"></div>
            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href="/about"
                className="text-gray-300 hover:text-white text-sm transition-all duration-300"
              >
                About Us
              </a>
              <div className="w-px h-3 bg-gray-700"></div>
              <a
                href="/contact"
                className="text-gray-300 hover:text-white text-sm transition-all duration-300"
              >
                Contact Us
              </a>
              <div className="w-px h-3 bg-gray-700"></div>
              <a
                href="/privacy-policy"
                className="text-gray-300 hover:text-white text-sm transition-all duration-300"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Copyright - Responsive */}
          <div className="text-center">
            <p className="text-gray-400 text-xs">
              © {new Date().getFullYear()} DateNow. All rights reserved.
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-500 text-xs mt-1 sm:mt-0">
              <span className="hidden sm:inline"></span>Made with <Heart className="inline h-2 w-2 text-red-400" /> by Anurag Yadav
              <a
                href="https://github.com/anurag2787"
                className="text-gray-400 hover:text-white transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="inline h-3 w-3" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;