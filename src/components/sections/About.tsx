'use client';
import MagicBento from '@/components/ui/MagicBento';
import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 overflow-x-hidden flex flex-col justify-center py-10">
      
      {/* Üst Başlık */}
      <div className="max-w-6xl mx-auto px-6 text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-4">
          Hakkımda & Deneyimlerim
        </h1>
        <p className="text-slate-500 uppercase tracking-[0.2em] text-[10px] md:text-xs">Interactive Portfolio Dashboard</p>
      </div>

      {/* Bento Grid Bölümü */}
      <section className="flex justify-center px-4 md:px-10 w-full">
        <div className="w-full max-w-[1400px]">
          <MagicBento 
            textAutoHide={false} 
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={800} 
            particleCount={20} 
            glowColor="132, 0, 255"
          />
        </div>
      </section>

    </div>
  );
};

export default About;