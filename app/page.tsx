"use client";

import dynamic from "next/dynamic";
import MyCalendar from "@/components/Calendar";
import HeroCarousel from "@/components/Carousel";
import Button from "@/components/ui/Button";

const LocationMap = dynamic(() => import("@/components/Map"), {
    ssr: false,
    loading: () => <p>Loading Map...</p>,
});

export default function Home() {
    return (
        <>
            {/* Carousel */}
            <HeroCarousel />

            {/* Main */}
            <main className="p-4 lg:p-24 max-w-screen-2xl mx-auto space-y-20">
                {/* Info + Map */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:pt-8 lg:pt-3">
                    {/* Info */}
                    <div className="space-y-6 px-4 py-6 md:py-2 md:px-3">
                        <h1 className="text-2xl md:text-4xl font-bold text-blue-500">Wisata Pantai Galesong</h1>
                        <p className="text-gray-700 text-base md:text-lg text-justify leading-relaxed">
                            Wisata Pantai Galesong terletak di Kabupaten Takalar, Sulawesi Selatan. Pantai ini menawarkan pemandangan laut yang indah,
                            dengan suasana yang tenang dan cocok untuk liburan keluarga maupun rombongan. Dilengkapi berbagai fasilitas dan wahana air.
                        </p>

                        <ul className="list-disc list-inside text-gray-600 text-sm md:text-base space-y-1 mt-4">
                            <li><strong>Jam Operasional:</strong> 24 Jam</li>
                            <li><strong>Harga Tiket Masuk:</strong> Rp 15.000 (Weekday) / Rp 25.000 (Weekend)</li>
                            <li><strong>Fasilitas:</strong> Kolam Renang, Penginapan, Tempat Makan, Area Parkir, Banana Boat, Gazebo</li>
                        </ul>


                        <Button
                            onClick={() => {
                                const calendarSection = document.getElementById("calendar");
                                if (calendarSection) {
                                    calendarSection.scrollIntoView({ behavior: "smooth" });
                                }
                            }}
                            className="mt-4 w-auto md:w-70"
                            aria-label="Pesan Tiket Sekarang"
                        >
                            Pesan Tiket Sekarang
                        </Button>
                    </div>



                    {/* Map */}
                    <div className="rounded overflow-hidden md:px-3 md:py-6 lg:py-2">
                        <LocationMap />
                    </div>
                </div>

                {/* Kalender */}
                <MyCalendar />
            </main>

        </>
    );
}
