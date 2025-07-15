"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
    "/picture2.webp",
    // "/picture1.webp",
    "/picture3.webp",
    // "/picture4.webp",
    "/picture5.webp",
];

const captions = [
    {
        title: "Selamat Datang di Pantai Galesong",
        subtitle: "Nikmati liburanmu dengan panorama indah dan wahana seru!",
    },
    {
        title: "Liburan Seru Bersama Keluarga",
        subtitle: "Tempat sempurna untuk bersantai dan bermain air.",
    },
    {
        title: "Pesan Sekarang dengan Mudah",
        subtitle: "Gunakan sistem booking kami untuk liburan yang nyaman.",
    },
    // {
    //     title: "Pantai di Sulawesi Selatan",
    //     subtitle: "Dapatkan pengalaman liburan seru di Pantai Galesong.",
    // },
];

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <section className="h-screen relative overflow-hidden">
            {/* Gambar aktif dengan animasi masuk saja */}
            <motion.div
                key={images[current]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src={images[current]}
                    alt={`Slide ${current + 1}`}
                    fill
                    className="object-cover brightness-90"
                    priority
                />
            </motion.div>

            {/* Teks Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-4">
                <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
                    {captions[current].title}
                </h1>
                <p className="mt-4 text-lg md:text-xl font-medium text-white/90">
                    {captions[current].subtitle}
                </p>
            </div>

            {/* Tombol Navigasi */}
            <div className="absolute inset-0 flex items-center justify-between px-4 z-20">
                <button
                    onClick={prevSlide}
                    className="hover:bg-black/60 text-white p-2 rounded-full transition"
                    aria-label="Previous Slide"
                >
                    <ChevronLeft size={28} />
                </button>

                <button
                    onClick={nextSlide}
                    className="hover:bg-black/60 text-white p-2 rounded-full transition"
                    aria-label="Next Slide"
                >
                    <ChevronRight size={28} />
                </button>
            </div>
        </section>
    );
}
