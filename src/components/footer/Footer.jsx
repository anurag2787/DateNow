import React from 'react';
import { Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-wrap justify-between gap-8">
        {/* Logo and Tagline */}
        <div >
          <div className="flex items-center gap-2">
            <Heart className="h-7 w-7 text-red-400 animate-pulse" />
            <div className="text-2xl font-bold">
              <span className="text-white">Date</span>
              <span className="text-red-400">Now</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            Bringing people closer, one date at a time.
          </p>
        </div>
        {/* Middle links */}
        <div className="flex flex-col items-center space-y-3">
          <h3 className="text-lg font-semibold text-red-400">Quick Links</h3>
          <a href="/" className="hover:text-red-400">
            Home
          </a>
          <a href="/about" className="hover:text-red-400">
            About Us
          </a>
          <a href="/talk" className="hover:text-red-400">
            General Talk
          </a>
          <a href="/personality" className="hover:text-red-400">
            Personality Check
          </a>
          <a href="/contact" className="hover:text-red-400">
            Contact Us
          </a>
          
        </div>
        {/* Contact */}
        <div className="flex flex-col items-center space-y-2">
          <h3 className="text-lg font-semibold text-red-400">Contact</h3>
          <p>📍 IIIT Lucknow</p>
          <a href='/'>📧anuragyadav2787@gmail.com</a>
          <p>📞+91 90648xxxxx</p>
        </div>
        {/* Right: Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-red-400">Join our Newsletter</h3>
          <p className="text-sm text-gray-400 mt-2">
            Get the latest updates and tips.
          </p>
          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-md text-gray-900 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-r-md text-white"
            >Subscribe</button>
          </form>
        </div>
      </div>
       {/* Bottom bar */}
      <div className="border-t border-gray-700 py-4">
        <p className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Developer Anurag Yadav. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
