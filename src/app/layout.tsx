import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Veya kullandığın font
import "@/app/globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ali Köroğlu | Portfolio",
  description: "Full-Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        
        
        {/* Sayfa içerikleri buraya gelecek */}
        {children}
      </body>
    </html>
  );
}