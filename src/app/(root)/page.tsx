import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import ProjectsSection from '@/components/sections/Projects';
import Navbar from '@/components/layout/Navbar';
// YENİ: Contact bileşeni (Footer içinde dahil)
import Contact from '@/components/sections/Contact';
import Preloader from '@/components/ui/Preloader';

export default function Page() {
  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black">
      <Preloader />
      {/* Navbar artık Layout.tsx içinde, burada gerek yok */}
      <Navbar />
      {/* 1. Hero Section */}
      <section id="hero" className="h-screen w-full snap-start ">
        <Hero />
      </section>

      {/* 2. About Section */}
      <section id="about" className="min-h-screen w-full snap-start md:snap-center flex items-center justify-center">
        <About />
      </section>

      {/* 3. Projects Section */}
      <section id="projects" className="h-screen w-full snap-center relative">
        <ProjectsSection />
      </section>

      {/* 4. Contact & Footer Section */}
      <section id="contact" className="h-screen w-full snap-start flex items-center justify-center">
         <Contact />
      </section>
      
    </main>
  );
}