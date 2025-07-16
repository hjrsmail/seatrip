import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wisata Pantai Galesong | Liburan Seru di Takalar",
  description: "Nikmati keindahan Pantai Galesong di Takalar, Sulawesi Selatan. Pesan tiket online, lihat fasilitas, jam operasional, dan harga terbaru.",
  keywords: [
    "Pantai Galesong",
    "Wisata Takalar",
    "Pantai Sulawesi Selatan",
    "Tiket Pantai Galesong",
    "Liburan Keluarga",
    "Pantai di Makassar",
    "Tempat wisata Takalar",
  ],
  openGraph: {
    title: "Wisata Pantai Galesong | Liburan Seru di Takalar",
    description:
      "Pantai Galesong menawarkan pemandangan laut indah, fasilitas lengkap, dan kemudahan pemesanan tiket secara online.",
    type: "website",
    url: "http://localhost:3000", // ganti dengan domain kamu
    images: [
      {
        url: "https://example.com/images/logo.webp", // gambar representatif
        width: 1200,
        height: 630,
        alt: "Pantai Galesong",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wisata Pantai Galesong | Liburan Seru di Takalar",
    description:
      "Nikmati keindahan dan kenyamanan wisata pantai terbaik di Sulawesi Selatan. Booking tiket online dengan mudah!",
    images: ["https://example.com/images/cover-galesong.jpg"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}

      >
        {/* Navbar */}
        <Header />
        {children}
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
