import React from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import ProjectsSection from '@/components/sections/Projects';
import Navbar from '@/components/layout/Navbar'; // Eğer layout.tsx'te varsa bunu buradan silmelisin!
import Contact from '@/components/sections/Contact';
import Preloader from '@/components/ui/Preloader';

export default function Page() {
  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black">
      <Preloader />
      
      
       <Navbar /> 

      {/* 1. Hero Section */}
      {/* Hero genelde az içeriklidir, mobilde de ortalı kalabilir ama garanti olsun diye mobilde pt verilebilir */}
      <section id="hero" className="h-screen w-full snap-start ">
        <Hero />
      </section>

      {/* 2. About Section - KRİTİK DÜZELTME */}
      {/* MOBİL (Varsayılan): items-start (Üstten başlat), pt-28 (Navbar payı bırak)
          PC (md: prefix): items-center (Ortala), pt-0 (Boşluğu sıfırla)
      */}
      <section 
        id="about" 
        className="min-h-screen w-full snap-start md:snap-center flex items-start justify-center pt-28 md:items-center md:pt-0"
      >
        <About />
      </section>

      {/* 3. Projects Section */}
      {/* Burası zaten kendi içinde düzeni sağlıyor */}
      <section id="projects" className="h-screen w-full snap-center relative">
        <ProjectsSection />
      </section>

      {/* 4. Contact & Footer Section - AYNI DÜZELTME */}
      {/* Mobilde klavye açılınca veya içerik taşınca sorun olmasın diye items-start ve padding ekledik */}
      <section 
        id="contact" 
        className="h-screen w-full snap-start flex items-start justify-center pt-24 md:items-center md:pt-0"
      >
         <Contact />
      </section>
      
    </main>
  );
}