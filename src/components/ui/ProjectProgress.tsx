'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react'; // İkonlar

export interface ProjectProgressProps {
  data: { title: string }[];
  activeIndex: number;
  onItemClick: (index: number) => void;
  isAutoPlay: boolean;
  onToggleAutoPlay: () => void;
}

const ProjectProgress: React.FC<ProjectProgressProps> = ({ 
  data, 
  activeIndex, 
  onItemClick,
  isAutoPlay,
  onToggleAutoPlay 
}) => {
  
  return (
    // Konumlandırma: Ekranın altında ve ortada
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 pointer-events-auto">
      
      {/* 1. Kapsül (İndikatörler) */}
      <div className="bg-[#1a1a1a]/90 backdrop-blur-md px-2 py-2 rounded-full flex items-center gap-2 border border-white/5 shadow-xl">
        {data.map((item, index) => {
          const isActive = activeIndex === index;
          
          return (
            <button
              key={index}
              onClick={() => onItemClick(index)}
              className="relative flex items-center justify-center py-2 px-1 outline-none focus:outline-none"
              aria-label={item.title}
            >
              {/* Animasyonlu Çubuk/Nokta */}
              <motion.div
                layout // Layout animasyonu genişlik değişimini yumuşatır
                initial={false}
                animate={{
                  width: isActive ? 32 : 6, // Aktifse geniş çizgi (32px), değilse nokta (6px)
                  height: 6,
                  backgroundColor: isActive ? '#ffffff' : '#666666' // Aktif beyaz, pasif gri
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
                className="rounded-full"
              />
            </button>
          );
        })}
      </div>

      {/* 2. Pause/Play Butonu (Ayrı Yuvarlak) */}
      <button
        onClick={onToggleAutoPlay}
        className="w-10 h-10 bg-[#1a1a1a]/90 backdrop-blur-md rounded-full flex items-center justify-center border border-white/5 text-white hover:bg-white/10 transition-colors shadow-xl"
      >
        {isAutoPlay ? (
          <Pause size={16} fill="white" className="text-white" />
        ) : (
          <Play size={16} fill="white" className="text-white ml-0.5" />
        )}
      </button>

    </div>
  );
};

export default ProjectProgress;