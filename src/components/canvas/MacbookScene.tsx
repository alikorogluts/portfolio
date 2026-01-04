'use client';
import React, { useRef, useState, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, Environment, Sparkles, SpotLight, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Macbook } from '@/components/canvas/Macbook'; 
import { projectsData } from '@/data/portfolio-data';

// --- SCROLL HANDLER (Aynı) ---
export const ScrollHandler = ({ onScrollChange }: { onScrollChange: (data: { index: number, showUI: boolean }) => void }) => {
  const scroll = useScroll();
  const lastIndex = useRef(-1);
  const lastShowUI = useRef(false);

  useFrame(() => {
    const rOffset = scroll.offset;
    const rawIndex = Math.floor(rOffset * projectsData.length);
    const index = Math.max(0, Math.min(rawIndex, projectsData.length - 1));
    const showUI = rOffset > 0.03;

    if (lastIndex.current !== index || lastShowUI.current !== showUI) {
      lastIndex.current = index;
      lastShowUI.current = showUI;
      onScrollChange({ index, showUI });
    }
  });
  return null;
};

// --- ANIMATED MACBOOK (SENİN HASSAS AYARLARIN) ---
const AnimatedMacbook = () => {
  const scroll = useScroll();
  const ref = useRef<THREE.Group>(null);
  const { width, height } = useThree((state) => state.viewport);
  
  // Mobil algılama
  const isMobile = width < 15 || width < height;

  const [currentIndex, setCurrentIndex] = useState(0);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const dt = Math.min(delta, 0.1); 
    const rOffset = scroll.offset;
    const rawIndex = Math.floor(rOffset * projectsData.length);
    const index = Math.max(0, Math.min(rawIndex, projectsData.length - 1));
    if (index !== currentIndex) setCurrentIndex(index);

    // ==========================================
    // SENİN AYARLADIĞIN DEĞERLER (KORUNDU)
    // ==========================================
    const mobileX = 0; 
    const mobileY = 0.5; // Model 1.0'dan 0.5'e indi
    // ==========================================

    const targetX = isMobile ? mobileX : -width / 4;
    const targetY = isMobile ? mobileY : -2.5;
    
    const moveX = isMobile ? targetX : (rOffset > 0.02 ? targetX : 0);
    
    ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, moveX, 4, dt);
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, targetY, 4, dt);
    
    const targetRotY = 0.5 - (rOffset * 0.5); 
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, targetRotY, 4, dt);
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, 0.1, 4, dt);
  });

  const currentProject = projectsData[currentIndex];

  return (
    <group ref={ref} position={[0, -1.5, 0]} rotation={[0.2, 0.5, 0]}>
        <Macbook 
            // SENİN AYARLADIĞIN SCALE (KORUNDU)
            scale={isMobile ? 0.19 : 0.3} 
            screenTexture={currentProject?.media} 
            mediaType={currentProject?.type} 
        />
    </group>
  );
};

// --- SAHNE İÇERİĞİ VE IŞIKLAR ---
export const MacbookSceneContent = ({ setScrollData }: { setScrollData: (data: { index: number, showUI: boolean }) => void }) => {
  // Işıkların da mobil olup olmadığını bilmesi için buraya da useThree ekledik
  const { width, height } = useThree((state) => state.viewport);
  const isMobile = width < 15 || width < height;

  return (
    <>
      <ScrollHandler onScrollChange={setScrollData} />
      
      {/* Ortam ışığı: Model küçük olduğu için biraz parlaklık iyidir */}
      <ambientLight intensity={isMobile ? 0.8 : 0.5} />
      
      
    

      {/* SPOT IŞIK 2 (Mor Dolgu):
         Model aşağı indiği için bunu da Y=2'ye indirdik.
         Modeli sol taraftan hafifçe aydınlatacak.
      */}
      <SpotLight 
        position={isMobile ? [-4, 8, 5] : [-10, 5, 10]} 
        angle={isMobile ? 0.6 : 0.5} 
        penumbra={1} 
        intensity={isMobile ? 200 : 100} 
        color="#8b5cf6" 
      />

      <Environment preset="city" />
      
      <Suspense fallback={null}>
        <AnimatedMacbook />
      </Suspense>
      
      <Sparkles count={40} scale={20} size={3} speed={0.2} opacity={0.4} />
      <ContactShadows frames={1} resolution={512} scale={30} blur={2} opacity={0.5} far={10} color="#fff" />
    </>
  );
};