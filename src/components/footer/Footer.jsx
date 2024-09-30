import React from 'react';

function Footer() {
  const year = new Date().getFullYear(); // Gets the current year

  return (
    <footer className="bg-black text-white text-center py-4 bottom-0   w-full md:fixed pb-[env(safe-area-inset-bottom)]">
      <p className="text-sm pb-3">
        &copy; {year} Developer Anurag Yadav. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
