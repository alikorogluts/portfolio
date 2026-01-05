import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  // DEBUG 1: İstek buraya ulaştı mı?
  console.log("🟢 API ROUTE TETİKLENDİ: /api/contact");

  try {
    const body = await req.json();
    
    // DEBUG 2: Veri doğru geldi mi?
    console.log("📦 Gelen Veri:", body);

    const { name, email, subject, message } = body;

    // DEBUG 3: .env değişkenleri okunuyor mu?
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("❌ HATA: EMAIL_USER veya EMAIL_PASS .env dosyasında bulunamadı!");
      return NextResponse.json({ success: false, message: 'Server konfigürasyon hatası' }, { status: 500 });
    }

    // 1. Veritabanına Kaydet
    console.log("⏳ Veritabanına kaydediliyor...");
    const savedMessage = await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });
    console.log("✅ Veritabanına kaydedildi. ID:", savedMessage.id);

    // 2. Mail Ayarları
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Mail Gönderimi
    console.log("⏳ Mailler gönderiliyor...");
    await Promise.all([
      // Bildirim Maili
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `🔔 Yeni Mesaj: ${subject}`,
        html: `
          <h3>Portfolyondan Yeni Mesaj Var!</h3>
          <p><strong>Kimden:</strong> ${name} (${email})</p>
          <p><strong>Mesaj:</strong> ${message}</p>
        `,
      }),
      // Teşekkür Maili
      transporter.sendMail({
        from: `"Ali Köroğlu" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Mesajın ulaştı! 🚀`,
        html: `<h3>Merhaba ${name}, mesajını aldım!</h3>`,
      }),
    ]);
    console.log("✅ Mailler başarıyla gönderildi.");

    return NextResponse.json({ success: true, message: 'Mesaj gönderildi!' });

  } catch (error) {
    // DEBUG 4: Hata tam olarak ne?
    console.error('🔴 DETAYLI HATA:', error);
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu.', error: String(error) }, 
      { status: 500 }
    );
  }
}