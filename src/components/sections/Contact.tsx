'use client';
import React from 'react';
import { Mail, Linkedin, Github, MapPin, ArrowRight } from 'lucide-react';
import Footer from '@/components/layout/Footer';

const Contact = () => {
  return (
    // DÜZELTME 1: 'overflow-hidden' yerine 'overflow-y-auto' yaptık.
    // Böylece içerik sığmazsa aşağı kaydırıp footer'ı görebilirsin.
    // pt-24 mobilde çok fazlaydı, pt-20'ye çektik (md:pt-24 ile PC'de koruduk).
    <div className="h-screen w-full bg-black text-white flex flex-col pt-20 md:pt-24 relative overflow-y-auto no-scrollbar">
      
      {/* Arka Plan Efekti */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-purple-600/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none -z-10" />

      {/* Ana İçerik Kapsayıcısı */}
      {/* flex-grow ekledik ki footer'ı en aşağı itsin, ama içerik taşarsa scroll olsun */}
      <div className="flex-grow w-full max-w-6xl mx-auto px-6 md:px-20 z-10 flex flex-col justify-center">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* SOL TARAF: İletişim Bilgileri */}
          <div className="space-y-6 md:space-y-8 text-center md:text-left">
            <div>
              <span className="text-purple-500 font-mono text-sm tracking-wider uppercase mb-2 block">
                İletişime Geç
              </span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                Birlikte <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                  Çalışalım.
                </span>
              </h2>
              {/* Mobilde yazıyı biraz kıstık */}
              <p className="text-gray-400 mt-4 text-base md:text-lg max-w-md mx-auto md:mx-0">
                Proje fikrin mi var? Mail kutum her zaman açık.
              </p>
            </div>

            <div className="space-y-4">
              <a href="mailto:ali.koroglu@example.com" className="flex items-center gap-4 p-3 md:p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group text-left">
                <div className="p-2 md:p-3 bg-purple-500/10 rounded-lg text-purple-400 group-hover:text-purple-300">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Mail Gönder</p>
                  <p className="text-white font-medium text-sm md:text-base">ali.koroglu@example.com</p>
                </div>
                <ArrowRight className="ml-auto text-gray-500 group-hover:translate-x-1 transition-transform" />
              </a>

              <div className="flex gap-4 justify-center md:justify-start">
                <SocialBtn icon={<Linkedin size={20} />} href="#" label="LinkedIn" />
                <SocialBtn icon={<Github size={20} />} href="#" label="GitHub" />
                <SocialBtn icon={<MapPin size={20} />} href="#" label="Konum" />
              </div>
            </div>
          </div>

          {/* SAĞ TARAF: Form */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 md:p-8 rounded-2xl shadow-2xl mb-8 md:mb-0">
            <form className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <InputGroup label="Adınız" placeholder="John Doe" type="text" />
                <InputGroup label="E-posta" placeholder="john@example.com" type="email" />
              </div>
              <InputGroup label="Konu" placeholder="Proje Hakkında" type="text" />
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">Mesajınız</label>
                <textarea 
                  rows={3} // Mobilde çok yer kaplamasın diye 3 satıra düşürdük
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none text-sm"
                  placeholder="Projenizden bahsedin..."
                />
              </div>
              <button className="w-full py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-bold text-white hover:opacity-90 transition-opacity text-sm md:text-base">
                Mesajı Gönder
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* FOOTER - Artık sayfanın doğal akışında en altta */}
      <div className="w-full mt-auto">
         <Footer />
      </div>
    </div>
  );
};

// --- ALT BİLEŞENLER ---
const SocialBtn = ({ icon, href, label }: { icon: React.ReactNode, href: string, label: string }) => (
  <a 
    href={href} 
    className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-purple-500/50 transition-all text-gray-300 hover:text-white"
    title={label}
  >
    {icon}
  </a>
);

const InputGroup = ({ label, placeholder, type }: { label: string, placeholder: string, type: string }) => (
  <div className="space-y-1 md:space-y-2">
    <label className="text-sm text-gray-400 font-medium">{label}</label>
    <input 
      type={type}
      className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 transition-colors text-sm"
      placeholder={placeholder}
    />
  </div>
);

export default Contact;