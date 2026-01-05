import {PrismaClient } from '@prisma/client';
import { s } from 'framer-motion/client';

const prisma = new PrismaClient();
// src/data/portfolio-data.ts

 const projectsData = [
  {
    title: "Ziraat Teknoloji",
    description: "Finansal operasyonlar için yüksek performanslı, gerçek zamanlı veri işleme.",
    tech: ["React", ".NET 8", "SignalR"],
    color: "#e11d48",
    media: "https://qkbymrbqptafcupuatst.supabase.co/storage/v1/object/public/portfolio-media/placeholder.png", // public klasörüne koymayı unutma
    type: "image" as const
  },
  {
    title: "Halkbank",
    description: "Kurumsal inovasyon süreçlerini dijitalleştiren fikir yönetim platformu.",
    tech: ["MVC", "SQL", "Azure"],
    color: "#2563eb",
    media: "https://qkbymrbqptafcupuatst.supabase.co/storage/v1/object/public/portfolio-media/placeholder.png",
    type: "image" as const
  },
  {
    title: "GRIT",
    description: "Coğrafi veri görselleştirme ve risk analizi sağlayan 3D dashboard.",
    tech: ["Next.js", "Three.js", "Mapbox"],
    color: "#7c3aed",
    media: "https://qkbymrbqptafcupuatst.supabase.co/storage/v1/object/public/portfolio-media/placeholder.png",
    type: "image" as const
  }
];

// src/data/portfolio-data.ts dosyasının içine (projectsData'nın altına):

 const bentoData = [
  {
    color: '#060010',
    title: 'Ali Köroğlu',
    description: 'Mühendislik 4. sınıf öğrencisi olarak .NET ekosistemi ve modern frontend teknolojileriyle (React, Flutter) ölçeklenebilir çözümler geliştiriyorum.',
    label: 'Profil'
  },
  {
    color: '#060010',
    title: 'Vizyon',
    description: 'Karmaşık problemlere temiz kod prensipleriyle (Clean Arch) yaklaşım.',
    label: 'Analitik'
  },
  {
    color: '#060010',
    title: 'Halkbank',
    description: 'ASP.NET Core MVC ve SignalR ile kurumsal anonim fikir paylaşım platformu geliştirme (Staj 2024).',
    label: 'Deneyim'
  },
  {
    color: '#060010',
    title: 'Ziraat Teknoloji',
    description: 'React, TypeScript ve .NET Web API ile gerçek zamanlı mesajlaşma ve dosya paylaşım uygulaması (Staj 2025).',
    label: 'Deneyim'
  },
  {
    color: '#060010',
    title: 'Back-End Core',
    description: '.NET Core, Web API, Entity Framework, SignalR, SQL Server mimarileri.',
    label: 'Tech Stack'
  },
  {
    color: '#060010',
    title: 'Frontend & Mobile',
    description: 'Next.js, Tailwind CSS ve Flutter ile modern, responsive arayüzler.',
    label: 'Tech Stack'
  },
];

const siteSettings = [{
  introMedia:"https://qkbymrbqptafcupuatst.supabase.co/storage/v1/object/public/portfolio-media/Ekran%20Resmi%202026-01-05%2001.15.38.png",
  introType:"image",
  heroTextWriter:"Merhaba, Ben Ali Köroğlu",
  heroTitle:".NET ve Next.js ile modern web çözümleri geliştiriyorum.",
  heroSubtitle:"Deneyimlerimi ve projelerimi burada paylaşıyorum.",
  contactLinkedIn:"https://www.linkedin.com/in/alikorogluts",
  contactGithub:"https://github.com/alikorogluts",
  contactEmail:"alikorogluts@gmail.com"
}];


async function main(){
    console.log("Seeding started...");
    await prisma.project.deleteMany();
    await prisma.bentoData.deleteMany();
    await prisma.siteSettings.deleteMany();

    console.log("Old data cleared.");

    for(const project of projectsData){
        await prisma.project.create({
            data:project
        })
    }
    console.log("Projects data seeded.");

    for(const bento of bentoData){
        await prisma.bentoData.create({
            data:bento
        })
    }
    console.log("Bento data seeded.");

    for(const setting of siteSettings){
        await prisma.siteSettings.create({
            data:setting
        })
    }
    console.log("Site settings data seeded.");




}
main()
.catch((e)=>{
    console.error(e);
    process.exit(1);
})
.finally(async()=>{
    await prisma.$disconnect();
});