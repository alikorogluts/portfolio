'use client';
import React from 'react';
import { Project } from '@prisma/client';

interface ProjectListProps {
  activeIndex: number;
  showUI: boolean;
  projectsData: Project[]; // İsmi burada projectsData yaptık
} 

const ProjectList: React.FC<ProjectListProps> = ({ activeIndex, showUI, projectsData }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-40 flex flex-col justify-between p-6 md:p-20 pt-24 md:pt-20">
      
      {/* Başlık */}
      <div 
        className="w-full transition-all duration-1000" 
        style={{ opacity: showUI ? 1 : 0, transform: showUI ? 'translateY(0)' : 'translateY(-20px)' }}
      >
        <h1 className="text-3xl md:text-6xl font-bold text-white tracking-tighter drop-shadow-2xl">
            Seçilmiş <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Projeler
            </span>
        </h1>
      </div>

      {/* Liste */}
      <div className="flex flex-col w-full md:w-1/2 ml-auto pb-24 relative h-[350px] md:h-[400px]">
        {projectsData.map((project, index) => {
          const isActive = activeIndex === index && showUI;

          return (
            <div 
              key={project.id || index} // Varsa ID kullanmak daha sağlıklıdır
              className={`
                absolute top-0 left-0 w-full flex flex-col gap-3 md:gap-4 
                transition-all duration-700 ease-out
                p-6 -ml-6 rounded-3xl
                ${isActive ? 'bg-gradient-to-r from-black/80 via-black/40 to-transparent backdrop-blur-[2px]' : ''}
              `}
              style={{
                opacity: isActive ? 1 : 0,
                transform: `translateY(${isActive ? 0 : 50}px) scale(${isActive ? 1 : 0.95})`,
                pointerEvents: 'none', 
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-500 origin-left" 
                    // Renk null gelirse varsayılan beyaz olsun
                    style={{ backgroundColor: project.color || '#ffffff', transform: isActive ? 'scaleX(1)' : 'scaleX(0)' }} 
                  />
                </div>
                <span className="font-mono text-sm text-white/80 font-bold shadow-black drop-shadow-md">0{index + 1}</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                {project.title}
              </h2>
              
              <div className="backdrop-blur-md bg-black/60 p-4 rounded-xl border border-white/10 max-w-md shadow-2xl">
                <p className="text-sm md:text-lg leading-relaxed text-gray-100 font-medium">
                    {project.description}
                </p>
              </div>

              <div className="flex gap-2 flex-wrap">
                {project.tech.map((tech, i) => (
                  <span key={i} className="pointer-events-auto px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium bg-black/50 border border-white/20 text-white hover:bg-white/20 transition-colors shadow-lg">
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