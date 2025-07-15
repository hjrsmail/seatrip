"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HomeIcon, Menu, X } from "lucide-react";
import clsx from "clsx";
import dynamic from "next/dynamic";
import MyCalendar from "@/components/Calendar";
import HeroCarousel from "@/components/Carousel";
import Logo from "@/public/logo.webp";
import Button from "@/components/ui/Button";

const LocationMap = dynamic(() => import("@/components/Map"), {
    ssr: false,
    loading: () => <p>Loading Map...</p>,
});

export default function Home() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Navbar */}
            <header className="fixed top-0 w-full z-50 backdrop-blur bg-white/20 text-black shadow-md">
                <nav className="bg-transparent text-white">
                    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex-shrink-0">
                                <Image
                                    src={Logo}
                                    alt="Logo"
                                    width={50}
                                    height={50}
                                    className="object-contain"
                                />
                            </div>

                            <div className="hidden md:flex">
                                <Link href="/" className="bg-blue-500 text-white py-2 px-4 rounded-xl">Beranda</Link>
                            </div>

                            <div className="md:hidden">
                                <Button
                                    onClick={() => setIsOpen(true)}
                                    className="text-white focus:outline-none"
                                >
                                    <Menu size={24} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Overlay / backdrop */}
                <div
                    className={clsx(
                        "fixed inset-0 z-40 transition-opacity duration-300",
                        {
                            "opacity-100 visible": isOpen,
                            "opacity-0 invisible": !isOpen,
                        }
                    )}
                    onClick={() => setIsOpen(false)}
                />

                {/* Sidebar container */}
                <div
                    className={clsx(
                        "fixed top-0 right-0 w-64 h-screen bg-white shadow-lg z-50 transform transition-transform duration-300",
                        {
                            "translate-x-0": isOpen,
                            "translate-x-full": !isOpen,
                        }
                    )}
                >
                    {/* Header dalam sidebar */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <Image src={Logo} alt="Logo" width={40} height={40} />
                        <button onClick={() => setIsOpen(false)}>
                            <X size={24} className="text-black" />
                        </button>
                    </div>

                    {/* Menu dalam sidebar */}
                    <div className="bg-white flex flex-col p-4 space-y-4 text-black">
                        <Link href="/" onClick={() => setIsOpen(false)}>
                            <div className="flex bg-blue-500 text-white py-2 px-4 rounded-xl items-center gap-2">
                                <HomeIcon className="w-5 h-5" />
                                <span>Beranda</span>
                            </div>
                        </Link>
                    </div>
                </div>


            </header>

            {/* Carousel */}
            <HeroCarousel />

            {/* Main */}
            <main className="p-4 lg:p-24 max-w-screen-2xl mx-auto space-y-20">
                {/* Info + Map */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Info */}
                    <div className="space-y-6 px-4 py-6 md:px-0">
                        <h1 className="text-2xl md:text-4xl font-bold text-blue-500">Pantai Galesong</h1>
                        <p className="text-gray-700 text-base md:text-lg text-justify leading-relaxed">
                            Pantai Galesong terletak di Kabupaten Takalar, Sulawesi Selatan. Pantai ini menawarkan pemandangan laut yang indah,
                            dengan suasana yang tenang dan cocok untuk liburan keluarga maupun rombongan. Dilengkapi berbagai fasilitas dan wahana air.
                        </p>

                        <ul className="list-disc list-inside text-gray-600 text-sm md:text-base space-y-1">
                            <li><strong>Jam Operasional:</strong> 07.00 - 17.00</li>
                            <li><strong>Harga Tiket Masuk:</strong> Rp 20.000 (Weekday) / Rp 30.000 (Weekend)</li>
                            <li><strong>Fasilitas:</strong> Kolam Renang, Penginapan, Tempat Makan, Area Parkir, Banana Boat, Gazebo</li>
                        </ul>

                        <Button
                            onClick={() => {
                                const calendarSection = document.getElementById("calendar");
                                if (calendarSection) {
                                    calendarSection.scrollIntoView({ behavior: "smooth" });
                                }
                            }}
                            className="mt-4 w-70"
                        >
                            Pesan Tiket Sekarang
                        </Button>
                    </div>



                    {/* Map */}
                    <div className="rounded overflow-hidden">
                        <LocationMap />
                    </div>
                </div>

                {/* Kalender */}
                <MyCalendar />
            </main>

            {/* Footer */}
            <footer className="bg-blue-300 text-black p-4 text-center mt-10 flex items-center gap-0.5 md:gap-3 justify-center">
                <Image src={Logo} alt="Logo" width={40} height={40}></Image>
                <p className="text-sm ">&copy; 2025 Pantai Galesong. All rights reserved. | Develop by GercepTechnology</p>
            </footer>
        </>
    );
}
