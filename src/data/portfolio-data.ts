// src/data/portfolio-data.ts

export const projectsData = [
  {
    title: "Ziraat Teknoloji",
    description: "Finansal operasyonlar için yüksek performanslı, gerçek zamanlı veri işleme.",
    tech: ["React", ".NET 8", "SignalR"],
    color: "#e11d48",
    media: "/textures/deneme.mp4", // public klasörüne koymayı unutma
    type: "video" as const
  },
  {
    title: "Halkbank",
    description: "Kurumsal inovasyon süreçlerini dijitalleştiren fikir yönetim platformu.",
    tech: ["MVC", "SQL", "Azure"],
    color: "#2563eb",
    media: "/textures/deneme.png",
    type: "image" as const
  },
  {
    title: "GRIT",
    description: "Coğrafi veri görselleştirme ve risk analizi sağlayan 3D dashboard.",
    tech: ["Next.js", "Three.js", "Mapbox"],
    color: "#7c3aed",
    media: "/textures/deneme.png",
    type: "image" as const
  }
];

// src/data/portfolio-data.ts dosyasının içine (projectsData'nın altına):

export const bentoData = [
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