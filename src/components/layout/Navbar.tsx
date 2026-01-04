'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // YENİ MANTIK: Ekranın Ortası Yöntemi
    const options = {
      root: null,
      // rootMargin: Ekranın üstünden %45 ve altından %45 kırp.
      // Geriye ortada %10'luk ince bir şerit kalır.
      // Hangi bölüm bu şeride girerse o aktiftir.
      rootMargin: '-45% 0px -45% 0px', 
      threshold: 0 // Çizgiye değer değmez tetikle
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const visibleId = entry.target.id;
          const activeItem = navItems.find(item => item.href === `#${visibleId}`);
          
          if (activeItem) {
            setActiveTab(activeItem.name);
          }

          // Navbar arkaplan kontrolü
          setIsScrolled(visibleId !== 'hero');
        }
      });
    }, options);

    navItems.forEach((item) => {
      const element = document.getElementById(item.href.substring(1));
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-[9998] w-full max-w-fit px-4">
      <nav
        className={`
          flex items-center gap-2 p-2 rounded-full
          border border-white/10
          transition-all duration-500 ease-in-out
          ${isScrolled 
            ? 'bg-black/80 backdrop-blur-xl shadow-2xl shadow-purple-500/10' 
            : 'bg-white/5 backdrop-blur-md shadow-lg'}
        `}
      >
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={(e) => handleScrollTo(e, item.href)}
            className={`
              relative px-4 py-2 text-sm md:text-base font-medium transition-colors duration-300 z-10
              ${activeTab === item.name ? 'text-white' : 'text-white/50 hover:text-white/90'}
            `}
          >
            {activeTab === item.name && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-white/10 rounded-full -z-10 border border-white/5"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            
            {item.name}
            
            {activeTab === item.name && (
               <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent blur-[1px]" />
            )}
          </a>
        ))}
      </nav>
    </header>
  );
}