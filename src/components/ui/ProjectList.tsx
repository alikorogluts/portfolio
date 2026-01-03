'use client';
import React from 'react';
import { projectsData } from '@/data/portfolio-data';

interface ProjectListProps {
  activeIndex: number;
  showUI: boolean; // YENİ: UI görünsün mü kontrolü
}

const ProjectList: React.FC<ProjectListProps> = ({ activeIndex, showUI }) => {
  return (
    // pointer-events-none: Scroll'un arkaya geçmesini sağlar
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-50 flex flex-col justify-between p-8 md:p-20">
      
      {/* Başlık - showUI true ise görünür */}
      <div 
        className="w-full transition-all duration-1000" 
        style={{ opacity: showUI ? 1 : 0, transform: showUI ? 'translateY(0)' : 'translateY(-20px)' }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter drop-shadow-lg">
            Seçilmiş <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Projeler
            </span>
        </h1>
      </div>

      {/* Liste */}
      <div className="flex flex-col w-full md:w-1/2 ml-auto pb-20 relative h-[400px]">
        {projectsData.map((project, index) => {
          // Hem aktif index hem de showUI true olmalı
          const isActive = activeIndex === index && showUI;

          return (
            <div 
              key={index}
              className="absolute top-0 left-0 w-full flex flex-col gap-4 transition-all duration-700 ease-out"
              style={{
                opacity: isActive ? 1 : 0,
                transform: `translateY(${isActive ? 0 : 50}px) scale(${isActive ? 1 : 0.95})`,
                // ÖNEMLİ: Genel kapsayıcı 'none', böylece scroll çalışır.
                pointerEvents: 'none', 
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-500 origin-left" 
                    style={{ backgroundColor: project.color, transform: isActive ? 'scaleX(1)' : 'scaleX(0)' }} 
                  />
                </div>
                <span className="font-mono text-sm text-white/50">0{index + 1}</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md">
                {project.title}
              </h2>
              
              <div className="backdrop-blur-sm bg-black/20 p-4 rounded-xl border border-white/10 max-w-md">
                <p className="text-lg leading-relaxed text-gray-300">
                    {project.description}
                </p>
              </div>

              <div className="flex gap-2 flex-wrap">
                {project.tech.map((tech, i) => (
                  // Sadece butonlar tıklanabilir olsun (pointer-events-auto)
                  <span key={i} className="pointer-events-auto px-3 py-1 rounded-full text-sm font-medium bg-white/10 border border-white/10 text-white/80 hover:bg-white/20 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectList;