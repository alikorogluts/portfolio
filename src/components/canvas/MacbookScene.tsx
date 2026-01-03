'use client';
import React, { useRef, useState, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, Environment, Sparkles, SpotLight, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Macbook } from '@/components/canvas/Macbook'; 
import { projectsData } from '@/data/portfolio-data';

// --- OPTİMİZE EDİLMİŞ SCROLL HANDLER ---
export const ScrollHandler = ({ onScrollChange }: { onScrollChange: (data: { index: number, showUI: boolean }) => void }) => {
  const scroll = useScroll();
  
  // Önceki değerleri hafızada tutuyoruz
  const lastIndex = useRef(-1);
  const lastShowUI = useRef(false);

  useFrame(() => {
    const rOffset = scroll.offset;
    const rawIndex = Math.floor(rOffset * projectsData.length);
    const index = Math.max(0, Math.min(rawIndex, projectsData.length - 1));
    
    // UI Görünürlük mantığı: %3'ten fazla kaydırıldıysa göster
    const showUI = rOffset > 0.03;

    // SADECE DEĞİŞİKLİK VARSA GÜNCELLE (Performansın sırrı burası)
    if (lastIndex.current !== index || lastShowUI.current !== showUI) {
      lastIndex.current = index;
      lastShowUI.current = showUI;
      onScrollChange({ index, showUI });
    }
  });
  return null;
};

const AnimatedMacbook = () => {
  const scroll = useScroll();
  const ref = useRef<THREE.Group>(null);
  const { width } = useThree((state) => state.viewport);
  const isMobile = width < 8;
  const [currentIndex, setCurrentIndex] = useState(0);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    // Smoothness (Akıcılık) ayarı
    const dt = Math.min(delta, 0.1); 
    const rOffset = scroll.offset;

    const rawIndex = Math.floor(rOffset * projectsData.length);
    const index = Math.max(0, Math.min(rawIndex, projectsData.length - 1));
    if (index !== currentIndex) setCurrentIndex(index);

    const targetX = isMobile ? 0 : -width / 4;
    const targetY = isMobile ? 0.5 : -1.5;
    
    // Bilgisayarın sola kayma eşiği (Daha erken kayması için 0.02 yaptık)
    const moveX = isMobile ? 0 : (rOffset > 0.02 ? targetX : 0);
    
    // Damp faktörünü 3'ten 4'e çıkardık (Biraz daha hızlı tepki)
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
            scale={0.3} 
            screenTexture={currentProject?.media} 
            mediaType={currentProject?.type} 
        />
    </group>
  );
};

export const MacbookSceneContent = ({ setScrollData }: { setScrollData: (data: { index: number, showUI: boolean }) => void }) => {
  return (
    <>
      <ScrollHandler onScrollChange={setScrollData} />
      
      <ambientLight intensity={0.5} />
      <SpotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={200} color="#ffffff" />
      <SpotLight position={[-10, 5, 10]} angle={0.5} penumbra={1} intensity={100} color="#8b5cf6" />
      <Environment preset="city" />
      
      <Suspense fallback={null}>
        <AnimatedMacbook />
      </Suspense>
      
      <Sparkles count={40} scale={20} size={3} speed={0.2} opacity={0.4} />
      <ContactShadows frames={1} resolution={512} scale={30} blur={2} opacity={0.5} far={10} color="#fff" />
    </>
  );
};