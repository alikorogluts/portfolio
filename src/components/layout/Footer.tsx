'use client';
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 pt-8 mt-10 z-10 pb-24 md:pb-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 max-w-6xl mx-auto px-6">
        <p>© {new Date().getFullYear()} Ali Köroğlu. Tüm hakları saklıdır.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Gizlilik</a>
          <a href="#" className="hover:text-white transition-colors">Şartlar</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;