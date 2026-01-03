
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useProgress } from '@react-three/drei';
import { gsap } from 'gsap';

export default function Preloader() {
  const { active, progress } = useProgress(); // 3D yükleme durumunu dinler
  const [percentage, setPercentage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Progress değerini yumuşakça artırmak için (görsel estetik)
    // Gerçek progress 100 olsa bile sayıları tek tek saydırıyoruz.
    const t = setInterval(() => {
      setPercentage((prev) => {
        if (prev < progress) return prev + 1;
        return prev;
      });
    }, 10); // Hız ayarı

    return () => clearInterval(t);
  }, [progress]);

  useEffect(() => {
    // Yükleme %100 olduğunda ve Three.js "active" durumu bittiğinde
    if (percentage === 100) {
      // Çıkış Animasyonu
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        // 1. Önce yazıyı yok et
        tl.to(textRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power2.inOut"
        })
        // 2. Sonra perdeyi yukarı çek
        .to(containerRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          onComplete: () => {
            // Animasyon bitince body scroll'u aç (opsiyonel, eğer kilitlediysen)
          }
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, [percentage]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-white"
    >
      <div ref={textRef} className="text-center space-y-4">
        {/* Yüzdelik Gösterge */}
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter tabular-nums">
          {percentage}%
        </h1>
        
        {/* Loading Bar */}
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-purple-500 transition-all duration-75 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="text-sm text-gray-500 font-mono animate-pulse pt-2">
          EXPERIENCE LOADING
        </p>
      </div>
    </div>
  );
}