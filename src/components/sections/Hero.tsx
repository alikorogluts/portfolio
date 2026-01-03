'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import TextType from '@/components/ui/TextType';
import Prism from '@/components/canvas/Prism';
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black z-0" />

      <div className="absolute inset-0 z-10 pointer-events-none opacity-70">
       {/*<Prism
          animationType="rotate"
          timeScale={0.4}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0.4}
          glow={1}
        />*/} 
      </div>

      <div className="absolute inset-0 bg-black/40 z-20" />

      {/* CONTENT */}
      <div
        ref={containerRef}
        className="relative z-30 min-h-screen flex items-end justify-center pb-24 px-6"
      >
        <div className="text-center max-w-3xl">

          
          <TextType className='hero-reveal text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight'
            text={["Merhaba, Ben Ali Köroğlu",""]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />

          <p className="hero-reveal text-lg md:text-xl text-gray-300">
            .NET ve Next.js ile modern web çözümleri geliştiriyorum.
          </p>

          <p className="hero-reveal text-lg md:text-xl text-gray-400 mb-10">
            Deneyimlerimi ve projelerimi burada paylaşıyorum.
          </p>

        </div>
      </div>

    </section>
  );
}