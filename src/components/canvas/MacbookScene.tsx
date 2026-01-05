'use client';
import React, { useRef, useState, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, Environment, Sparkles, SpotLight, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Macbook } from '@/components/canvas/Macbook'; 
import { Project } from '@prisma/client';

// --- TİPLER ---
// Animasyon bileşeni için prop tipleri
interface AnimatedMacbookProps {
  projects: Project[];
  introMedia?: string; // Veritabanından gelecek (Opsiyonel)
  introType?: string;  // "image" | "video"
}

// Ana Sahne bileşeni için prop tipleri
interface MacbookSceneContentProps {
  setScrollData: (data: { index: number, showUI: boolean }) => void;
  projects: Project[];
  introMedia?: string;
  introType?: string;
}

// --- SCROLL HANDLER ---
export const ScrollHandler = ({ 
  onScrollChange, 
  totalProjects 
}: { 
  onScrollChange: (data: { index: number, showUI: boolean }) => void;
  totalProjects: number;
}) => {
  const scroll = useScroll();
  const lastIndex = useRef(-1);
  const lastShowUI = useRef(false);

  useFrame(() => {
    const rOffset = scroll.offset;
    const rawIndex = Math.floor(rOffset * totalProjects);
    const index = Math.max(0, Math.min(rawIndex, totalProjects - 1));
    const showUI = rOffset > 0.03;

    if (lastIndex.current !== index || lastShowUI.current !== showUI) {
      lastIndex.current = index;
      lastShowUI.current = showUI;
      onScrollChange({ index, showUI });
    }
  });
  return null;
};

// --- ANIMATED MACBOOK ---
const AnimatedMacbook = ({ projects, introMedia, introType }: AnimatedMacbookProps) => {
  const scroll = useScroll();
  const ref = useRef<THREE.Group>(null);
  const { width, height } = useThree((state) => state.viewport);
  
  const isMobile = width < 15 || width < height;
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // YENİ: Başlangıç (Intro) durumunda mıyız?
  const [isIntro, setIsIntro] = useState(true);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const dt = Math.min(delta, 0.1); 
    const rOffset = scroll.offset;

    // --- YENİ MANTIK: INTRO KONTROLÜ ---
    // Eğer scroll %1.5'tan az ise "Intro" modundayız demektir.
    const isAtStart = rOffset < 0.015;
    
    // Gereksiz render'ı önlemek için sadece değişince state güncelle
    if (isAtStart !== isIntro) {
      setIsIntro(isAtStart);
    }
    // -----------------------------------
    
    const rawIndex = Math.floor(rOffset * projects.length);
    const index = Math.max(0, Math.min(rawIndex, projects.length - 1));
    if (index !== currentIndex) setCurrentIndex(index);

    // --- HASSAS AYARLAR (KORUNDU) ---
    const mobileX = 0; 
    const mobileY = 0.5; 

    const targetX = isMobile ? mobileX : -width / 4;
    const targetY = isMobile ? mobileY : -2.5;
    
    const moveX = isMobile ? targetX : (rOffset > 0.02 ? targetX : 0);
    
    ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, moveX, 4, dt);
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, targetY, 4, dt);
    
    const targetRotY = 0.5 - (rOffset * 0.5); 
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, targetRotY, 4, dt);
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, 0.1, 4, dt);
  });

  const currentProject = projects[currentIndex];

  // --- EKRANDA NE GÖSTERİLECEK? ---
  // Eğer Intro modundaysak VE veritabanından introMedia geldiyse onu göster.
  // Yoksa (scroll başladıysa veya introMedia yoksa) o anki projeyi göster.
  const activeTexture = (isIntro && introMedia) ? introMedia : currentProject?.media;
  const activeType = (isIntro && introType) ? introType : currentProject?.type;

  return (
    <group ref={ref} position={[0, -1.5, 0]} rotation={[0.2, 0.5, 0]}>
        <Macbook 
            scale={isMobile ? 0.19 : 0.3} 
            screenTexture={activeTexture} 
            mediaType={activeType as "video" | "image"} 
        />
    </group>
  );
};

// --- SAHNE İÇERİĞİ ---
export const MacbookSceneContent = ({ 
  setScrollData, 
  projects,
  introMedia, // Yeni prop
  introType   // Yeni prop
}: MacbookSceneContentProps) => {
  const { width, height } = useThree((state) => state.viewport);
  const isMobile = width < 15 || width < height;

  return (
    <>
      <ScrollHandler onScrollChange={setScrollData} totalProjects={projects.length} />
      
      <ambientLight intensity={isMobile ? 0.8 : 0.5} />
      
      <SpotLight 
        position={isMobile ? [-4, 8, 5] : [-10, 5, 10]} 
        angle={isMobile ? 0.6 : 0.5} 
        penumbra={1} 
        intensity={isMobile ? 200 : 100} 
        color="#8b5cf6" 
      />

      <Environment preset="city" />
      
      <Suspense fallback={null}>
        {/* Verileri AnimatedMacbook'a aktarıyoruz */}
        <AnimatedMacbook 
          projects={projects} 
          introMedia={introMedia} 
          introType={introType} 
        />
      </Suspense>
      
      <Sparkles count={40} scale={20} size={3} speed={0.2} opacity={0.4} />
      <ContactShadows frames={1} resolution={512} scale={30} blur={2} opacity={0.5} far={10} color="#fff" />
    </>
  );
};