import Image from "next/image";
import Logo from "@/public/logo.webp";

export default function Footer() {
    return (
        <footer className="bg-blue-300 text-black p-4 text-center mt-10 flex items-center gap-0.5 md:gap-3 justify-center">
            <Image src={Logo} alt="Logo" width={40} height={40}></Image>
            <p className="text-sm ">&copy; 2025 Wisata Pantai Galesong | Develop by GercepTechnology</p>
        </footer>
    );
}