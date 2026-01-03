'use client';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ScrollManagerProps {
  targetIndex: number | null;
  total: number;
  onScrollComplete: () => void;
}

export const ScrollManager = ({ targetIndex, total, onScrollComplete }: ScrollManagerProps) => {
  const data = useScroll();
  const isAnimating = useRef(false);
  const targetOffset = useRef(0);

  useEffect(() => {
    if (targetIndex !== null && targetIndex >= 0 && targetIndex < total) {
      const newOffset = targetIndex / (total - 1);
      targetOffset.current = newOffset;
      isAnimating.current = true;
    }
  }, [targetIndex, total]);

  useFrame((state, delta) => {
    // Sadece hedef değiştiğinde (otomatik oynatma veya tıklandığında) müdahale et
    if (!isAnimating.current) return;

    const currentOffset = data.offset;
    const target = targetOffset.current;
    
    // Hız Faktörü: 8 (Ne çok sert ne çok yavaş, akıcı)
    const dampSpeed = 8; 
    
    const nextOffset = THREE.MathUtils.damp(currentOffset, target, dampSpeed, delta);
    
    // Scroll elementini zorla kaydır
    if (data.el) {
      // scrollHeight hesabı bazen 0 dönebilir, güvenli kontrol
      const scrollHeight = data.el.scrollHeight || 1000;
      const clientHeight = data.el.clientHeight || window.innerHeight;
      const scrollableRange = scrollHeight - clientHeight;
      
      if (scrollableRange > 0) {
        data.el.scrollTop = nextOffset * scrollableRange;
      }
    }

    // Hedefe ulaşıldı mı? (Toleransı biraz artırdık: 0.001 -> 0.005 takılmayı önler)
    if (Math.abs(nextOffset - target) < 0.005) {
      isAnimating.current = false;
      onScrollComplete();
    }
  });

  return null;
};