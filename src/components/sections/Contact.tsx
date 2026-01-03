'use client';
import React from 'react';
import { Mail, Linkedin, Github, MapPin, ArrowRight } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col justify-between pt-24 pb-8 px-6 md:px-20 relative overflow-hidden">
      
      {/* Arka Plan Efekti */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl mx-auto flex-grow items-center z-10">
        
        {/* SOL TARA: İletişim Bilgileri */}
        <div className="space-y-8">
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
            <p className="text-gray-400 mt-4 text-lg max-w-md">
              Yeni bir proje fikrin mi var veya sadece merhaba demek mi istiyorsun? 
              Mail kutum her zaman açık.
            </p>
          </div>

          <div className="space-y-4">
            <a href="mailto:ali@example.com" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
              <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400 group-hover:text-purple-300">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Mail Gönder</p>
                <p className="text-white font-medium">ali.koroglu@example.com</p>
              </div>
              <ArrowRight className="ml-auto text-gray-500 group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="flex gap-4">
              <SocialBtn icon={<Linkedin size={20} />} href="#" label="LinkedIn" />
              <SocialBtn icon={<Github size={20} />} href="#" label="GitHub" />
              <SocialBtn icon={<MapPin size={20} />} href="#" label="Konum: Türkiye" />
            </div>
          </div>
        </div>

        {/* SAĞ TARAF: Form */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-2xl">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Adınız" placeholder="John Doe" type="text" />
              <InputGroup label="E-posta" placeholder="john@example.com" type="email" />
            </div>
            <InputGroup label="Konu" placeholder="Proje Hakkında" type="text" />
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">Mesajınız</label>
              <textarea 
                rows={4}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                placeholder="Projenizden bahsedin..."
              />
            </div>
            <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-bold text-white hover:opacity-90 transition-opacity">
              Mesajı Gönder
            </button>
          </form>
        </div>
      </div>

      {/* FOOTER (Contact section'ın en altına entegre) */}
      <footer className="w-full border-t border-white/10 pt-8 mt-10 z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 max-w-6xl mx-auto">
          <p>© {new Date().getFullYear()} Ali Köroğlu. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Gizlilik</a>
            <a href="#" className="hover:text-white transition-colors">Şartlar</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Alt Bileşenler (Sadece bu dosyada kullanılacağı için buraya yazdım)
const SocialBtn = ({ icon, href, label }: { icon: React.ReactNode, href: string, label: string }) => (
  <a 
    href={href} 
    className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-purple-500/50 transition-all text-gray-300 hover:text-white"
    title={label}
  >
    {icon}
  </a>
);

const InputGroup = ({ label, placeholder, type }: { label: string, placeholder: string, type: string }) => (
  <div className="space-y-2">
    <label className="text-sm text-gray-400 font-medium">{label}</label>
    <input 
      type={type}
      className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
      placeholder={placeholder}
    />
  </div>
);

export default Contact;