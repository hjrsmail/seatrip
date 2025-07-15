"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = L.icon({
  iconUrl: "/logo.webp", // pastikan path relatif dari public
  iconRetinaUrl: "/logo.webp",
  iconSize: [40, 40], // ukuran disesuaikan dengan proporsi logomu
  iconAnchor: [20, 40], // titik pada ikon yang dianggap sebagai 'titik lokasi'
  popupAnchor: [0, -40], // posisi popup terhadap ikon
  shadowUrl: "/leaflet/marker-shadow.png",
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});


// console.log("Mounted LocationMap");


export default function LocationMap() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setMounted(true);
        }
    }, []);

    const LAT = -5.241338129140065;
    const LNG = 119.38031379122769;
    const locationName = "Pantai Galesong";

    if (!mounted) return null;

    return (
        <div>
            <MapContainer
                center={[LAT, LNG]}
                zoom={13}
                scrollWheelZoom={true}
                className="h-[350px] w-full rounded-md shadow-md z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[LAT, LNG]} icon={customIcon}>
                    <Popup>
                        <a
                            href={`https://www.openstreetmap.org/?mlat=${LAT}&mlon=${LNG}#map=16/${LAT}/${LNG}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            {locationName}
                        </a>
                    </Popup>
                </Marker>
            </MapContainer>
            <div className="mt-1 text-xs text-gray-600">
                Klik ikon untuk melihat dari Google Maps
            </div>
        </div >
    );
}