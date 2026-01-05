'use client';
import  { useState, useRef, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import ProjectList from '@/components/ui/ProjectList';
import { MacbookSceneContent } from '@/components/canvas/MacbookScene';
import ProjectProgress from '@/components/ui/ProjectProgress';
import { ScrollManager } from '@/components/canvas/ScrollManager'; 

import { Project } from '@prisma/client';

interface ProjectsSectionProps {
  projectsData: Project[];
  introMedia?: string; 
  introType?: string;
}

export default function ProjectsSection({ projectsData,introMedia,introType }: ProjectsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showUI, setShowUI] = useState(false);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  // YENİ 1: Sahne ekranda mı değil mi takip eden state
  const [isInView, setIsInView] = useState(true);

  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // YENİ 2: Intersection Observer (Görünürlük İzleyicisi)
  // Bu kod, kullanıcı bu bölümden çıktığı anı yakalar.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Bölüm ekrandaysa (veya %10'u görünüyorsa) true, tamamen çıktıysa false
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 } 
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.disconnect();
    };
  }, []);

  const handleScrollData = useCallback((data: { index: number, showUI: boolean }) => {
    setActiveIndex(data.index);
    setShowUI(data.showUI);
  }, []);

  const handleNavigate = useCallback((index: number) => {
    if (index >= 0 && index < projectsData.length) {
      setTargetIndex(index);
    }
  }, []);

  // Auto Play (Sadece görünürken çalışsın diye isInView eklendi)
  useEffect(() => {
    if (isAutoPlay && isInView) {
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
  }, [isAutoPlay, activeIndex, isInView]);

  return (
    <div ref={containerRef} className="w-full h-screen bg-[#030303] relative overflow-hidden font-sans">
      
      <ProjectList projectsData={projectsData} activeIndex={activeIndex} showUI={showUI} />

      <ProjectProgress 
        data={projectsData} 
        activeIndex={activeIndex} 
        onItemClick={handleNavigate}
        isAutoPlay={isAutoPlay}
        onToggleAutoPlay={() => setIsAutoPlay(!isAutoPlay)}
      />

      {/* YENİ 3: frameloop Ayarı 
          isInView false ise (ekranda değilse) "never" moduna geçer ve 
          3D çizimi tamamen durdurur. Bu sayede Contact sayfasında kasmayı önler.
      */}
      <Canvas
        frameloop={isInView ? "always" : "never"}
        shadows={false}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 28], fov: 35 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        className="absolute top-0 left-0 z-0"
      >
        <ScrollControls pages={projectsData.length} damping={0.1}>
          
          <ScrollManager 
             targetIndex={targetIndex} 
             total={projectsData.length} 
             onScrollComplete={() => setTargetIndex(null)} 
          />

          <MacbookSceneContent projects={projectsData} setScrollData={handleScrollData} introMedia={introMedia} introType={introType} />
          
        </ScrollControls>
      </Canvas>
    </div>
  );
}