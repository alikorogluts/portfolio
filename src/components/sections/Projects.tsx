'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import ProjectList from '@/components/ui/ProjectList';
import { MacbookSceneContent } from '@/components/canvas/MacbookScene';
import { projectsData } from '@/data/portfolio-data';
import ProjectProgress from '@/components/ui/ProjectProgress';
import { ScrollManager } from '@/components/canvas/ScrollManager'; 

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showUI, setShowUI] = useState(false);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // OPTİMİZE EDİLMİŞ VERİ İŞLEYİCİ
  // Artık saniyede 60 kere değil, sadece değişim olduğunda çalışır.
  const handleScrollData = useCallback((data: { index: number, showUI: boolean }) => {
    setActiveIndex(data.index);
    setShowUI(data.showUI);
  }, []);

  const handleNavigate = useCallback((index: number) => {
    if (index >= 0 && index < projectsData.length) {
      setTargetIndex(index);
      // Kullanıcı müdahale edince autoplay'i durdurmak daha iyi bir UX olabilir
      // setIsAutoPlay(false); 
    }
  }, []);

  // Auto Play
  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = setInterval(() => {
        setTargetIndex((prevTarget) => {
          const currentBase = prevTarget !== null ? prevTarget : activeIndex;
          return (currentBase + 1) % projectsData.length;
        });
      }, 5000);
    } else {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    }
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [isAutoPlay, activeIndex]);

  return (
    <div ref={containerRef} className="w-full h-screen bg-[#030303] relative overflow-hidden font-sans">
      
      {/* Arayüz */}
      <ProjectList activeIndex={activeIndex} showUI={showUI} />

      {/* Navigasyon Barı */}
      <ProjectProgress 
        data={projectsData} 
        activeIndex={activeIndex} 
        onItemClick={handleNavigate}
        isAutoPlay={isAutoPlay}
        onToggleAutoPlay={() => setIsAutoPlay(!isAutoPlay)}
      />

      {/* 3D Sahne */}
      <Canvas
        shadows={false}
        dpr={[1, 1.5]} // Performans için pixel ratio sınırlandı
        camera={{ position: [0, 0, 28], fov: 35 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        className="absolute top-0 left-0 z-0"
        // style={{ pointerEvents: 'none' }} // BUNU YAPMA! ScrollControls bozulur.
      >
        {/* DAMPING AYARI: 0.2'den 0.1'e düşürdük. 
            Daha düşük değer = Daha az sürtünme = Daha hızlı ve akıcı scroll */}
        <ScrollControls pages={projectsData.length} damping={0.1}>
          
          <ScrollManager 
             targetIndex={targetIndex} 
             total={projectsData.length} 
             onScrollComplete={() => setTargetIndex(null)} 
          />

          <MacbookSceneContent setScrollData={handleScrollData} />
          
        </ScrollControls>
      </Canvas>
    </div>
  );
}