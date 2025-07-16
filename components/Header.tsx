"use client";

import Link from "next/link";
import { Book, HomeIcon, Menu, X } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import Logo from "@/public/logo.webp";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { usePathname } from "next/navigation";


export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="fixed top-0 w-full z-50 backdrop-blur bg-white/20 text-black shadow-md">
            <nav className="bg-transparent text-white">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20 lg:h-24">
                        <div className="flex items-center flex-shrink-0">
                            <Image
                                src="/logo.webp"
                                alt="Logo"
                                width={100}
                                height={40}
                                className="object-contain"
                            />
                            {/* <p className="text-2xl text-b light">Pantai Galesong</p> */}
                        </div>

                        <div className="hidden md:flex gap-4">
                            <Link
                                href="/"
                                onClick={(e) => {
                                    if (pathname === "/") {
                                        e.preventDefault();
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                    }
                                }}
                                className={clsx(
                                    "py-2 px-4 rounded-xl font-bold transition-all duration-300",
                                    pathname === "/"
                                        ? "bg-blue-500 text-white"
                                        : "text-black hover:bg-blue-500 hover:text-white"
                                )}
                            >
                                Beranda
                            </Link>

                            <Link
                                href="/panduan"
                                className={clsx(
                                    "py-2 px-4 rounded-xl font-bold transition-all duration-300",
                                    pathname === "/panduan"
                                        ? "bg-blue-500 text-white"
                                        : "text-black hover:bg-blue-500 hover:text-white"
                                )}
                            >
                                Panduan
                            </Link>
                        </div>

                        <div className="md:hidden">
                            <Button
                                onClick={() => setIsOpen(true)}
                                className="text-white focus:outline-none"
                                aria-label="Toggle navigation"
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
                    <Image src={Logo} alt="Logo" width={50} height={50} />
                    <button onClick={() => setIsOpen(false)} aria-label="Close sidebar">
                        <X size={24} className="text-black" />
                    </button>
                </div>

                {/* Menu dalam sidebar */}
                <div className="bg-white flex flex-col p-4 gap-y-1 text-black">
                    <Link href="/" onClick={() => setIsOpen(false)}>
                        <div
                            className={clsx(
                                "flex py-2 px-4 rounded-xl items-center gap-2",
                                pathname === "/"
                                    ? "bg-blue-500 text-white"
                                    : "text-black hover:bg-blue-500 hover:text-white"
                            )}
                        >
                            <HomeIcon className="w-5 h-5" />
                            <span>Beranda</span>
                        </div>
                    </Link>

                    <Link href="/panduan" onClick={() => setIsOpen(false)}>
                        <div
                            className={clsx(
                                "flex py-2 px-4 rounded-xl items-center gap-2",
                                pathname.startsWith("/panduan")
                                    ? "bg-blue-500 text-white"
                                    : "text-black hover:bg-blue-500 hover:text-white"
                            )}
                        >
                            <Book className="w-5 h-5" />
                            <span>Panduan</span>
                        </div>
                    </Link>
                </div>
            </div>


        </header>
    )
}