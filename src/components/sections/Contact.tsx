'use client';
import React, { useState } from 'react';
import { Mail, Linkedin, Github, MapPin, ArrowRight, Send, CheckCircle, Loader2 } from 'lucide-react';
import Footer from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactProps {
  contactLinkedIn: string;
  contactGithub: string;
  contactEmail: string;
}

const Contact = ({ contactEmail, contactGithub, contactLinkedIn }: ContactProps) => {
  // Form Verileri
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Input Değişikliklerini Yakala
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form Gönderme İşlemi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Formu temizle
        setTimeout(() => setStatus('idle'), 3000); // 3 sn sonra butonu eski haline getir
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="h-screen w-full bg-[#050505] text-white flex flex-col pt-20 md:pt-24 relative overflow-y-auto overflow-x-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
      
      {/* Arka Plan */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] pointer-events-none -z-10"
        style={{ background: 'radial-gradient(circle at 50% 30%, rgba(147, 51, 234, 0.15) 0%, rgba(0, 0, 0, 0) 70%)' }}
      />

      <div className="flex-grow w-full max-w-6xl mx-auto px-6 md:px-20 z-10 flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* SOL TARAF (Bilgiler) */}
          <div className="space-y-6 md:space-y-8 text-center md:text-left">
            <div>
              <span className="text-purple-500 font-mono text-sm tracking-wider uppercase mb-2 block">İletişime Geç</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                Birlikte <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Çalışalım.</span>
              </h2>
              <p className="text-gray-400 mt-4 text-base md:text-lg max-w-md mx-auto md:mx-0">Proje fikrin mi var? Mail kutum her zaman açık.</p>
            </div>

            <div className="space-y-4">
              <a href={`mailto:${contactEmail}`} className="flex items-center gap-4 p-3 md:p-4 rounded-xl bg-white/5 border border-white/10 active:scale-95 transition-all group text-left hover:border-purple-500/50 hover:bg-purple-500/5 hover:shadow-[0_0_15px_rgba(147,51,234,0.15)]">
                <div className="p-2 md:p-3 bg-purple-500/10 rounded-lg text-purple-400 group-hover:text-purple-300 group-hover:scale-110 transition-transform"><Mail size={20} /></div>
                <div>
                  <p className="text-xs text-gray-400">Mail Gönder</p>
                  <p className="text-white font-medium text-sm md:text-base">{contactEmail}</p>
                </div>
                <ArrowRight className="ml-auto text-gray-500 group-hover:translate-x-1 group-hover:text-purple-400 transition-all" />
              </a>
              <div className="flex gap-4 justify-center md:justify-start">
                <SocialBtn icon={<Linkedin size={20} />} href={contactLinkedIn} label="LinkedIn" />
                <SocialBtn icon={<Github size={20} />} href={contactGithub} label="GitHub" />
                <SocialBtn icon={<MapPin size={20} />} href="#" label="Konum" />
              </div>
            </div>
          </div>

          {/* SAĞ TARAF (Form) */}
          <div className="bg-[#111]/90 border border-white/10 p-5 md:p-8 rounded-2xl shadow-2xl mb-8 md:mb-0">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <InputGroup name="name" value={formData.name} onChange={handleChange} label="Adınız" placeholder="Ali Köroğlu" type="text" />
                <InputGroup name="email" value={formData.email} onChange={handleChange} label="E-posta" placeholder="ornek@email.com" type="email" />
              </div>
              <InputGroup name="subject" value={formData.subject} onChange={handleChange} label="Konu" placeholder="Proje Hakkında" type="text" />
              
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">Mesajınız</label>
                <textarea 
                  name="message" value={formData.message} onChange={handleChange} required
                  rows={3} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none text-sm" placeholder="Projenizden bahsedin..."
                />
              </div>

              {/* HAVALI BUTON ANIMASYONU */}
              <button 
                disabled={status === 'loading' || status === 'success'}
                className="w-full h-12 md:h-14 relative overflow-hidden rounded-lg font-bold text-white shadow-lg group bg-gradient-to-r from-blue-600 to-purple-600 disabled:opacity-80"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                
                <div className="relative flex items-center justify-center gap-2">
                  <AnimatePresence mode="wait">
                    {status === 'loading' ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="animate-spin" size={20} /> Gönderiliyor...
                      </motion.div>
                    ) : status === 'success' ? (
                      <motion.div
                        key="success"
                        initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}
                        className="flex items-center gap-2 text-white"
                      >
                        <CheckCircle size={20} /> Gönderildi!
                      </motion.div>
                    ) : status === 'error' ? (
                      <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Hata Oluştu</motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        className="flex items-center gap-2"
                        initial={{ x: 0, opacity: 1 }}
                        exit={{ x: 50, opacity: 0 }} // Uçak çıkışta sağa uçar
                      >
                        <span>Mesajı Gönder</span>
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* KAĞIT UÇAK ANIMASYONU (Sadece loading'e geçerken uçar) */}
                  {status === 'loading' && (
                    <motion.div
                      className="absolute"
                      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                      animate={{ x: 150, y: -150, opacity: 0, scale: 0.5 }} // Sağ üst köşeye uçar ve küçülür
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                      <Send size={24} className="text-white" />
                    </motion.div>
                  )}
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full mt-auto"><Footer /></div>
    </div>
  );
};

const SocialBtn = ({ icon, href, label }: any) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-3 bg-white/5 border border-white/10 rounded-lg text-gray-400 transition-all duration-300 hover:text-purple-300 hover:border-purple-500/50 hover:bg-purple-500/10 hover:shadow-[0_0_15px_rgba(147,51,234,0.25)] hover:scale-110 active:scale-95" title={label}>
    {icon}
  </a>
);

const InputGroup = ({ label, placeholder, type, name, value, onChange }: any) => (
  <div className="space-y-1 md:space-y-2">
    <label className="text-sm text-gray-400 font-medium">{label}</label>
    <input required name={name} value={value} onChange={onChange} type={type} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 transition-colors text-sm" placeholder={placeholder} />
  </div>
);

export default Contact;