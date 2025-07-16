"use client";

import { useEffect, useRef, useState } from "react";
import { format, getDay } from "date-fns";
import { id } from "date-fns/locale";
import clsx from "clsx";
import { sendForm } from "@emailjs/browser";

interface BookingModalProps {
    selectedDate: Date;
    onClose: () => void;
}

export default function BookingModal({ selectedDate, onClose }: BookingModalProps) {
    const [jumlahTiket, setJumlahTiket] = useState<number>(0);
    const [mobil, setMobil] = useState<number>(0);
    const [motor, setMotor] = useState<number>(0);
    const [step, setStep] = useState<1 | 2>(1);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const day = getDay(selectedDate);
    const isWeekend = day === 0 || day === 6;
    const hargaTiket = isWeekend ? 25000 : 15000;
    const hargaMobil = 5000;
    const hargaMotor = 3000;

    const total = jumlahTiket * hargaTiket + mobil * hargaMobil + motor * hargaMotor;

    const formatRupiah = (angka: number) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(angka);

    const isTiketValid = jumlahTiket > 0;
    const isFormValid = name !== "" && email !== "" && phone !== "";

    const handleChange = (
        setter: React.Dispatch<React.SetStateAction<number>>,
        value: number
    ) => {
        setter((prev) => Math.max(prev + value, 0));
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const form = useRef<HTMLFormElement | null>(null);
    const handleSubmit = async () => {
        if (!form.current) return;

        setIsLoading(true);

        // Validasi manual
        if (!name.trim()) {
            alert("Nama tidak boleh kosong.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Email tidak valid.");
            return;
        }

        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(phone)) {
            alert("Nomor HP harus angka dan panjang 10-15 digit.");
            return;
        }

        if (jumlahTiket <= 0) {
            alert("Jumlah tiket harus lebih dari 0.");
            return;
        }

        try {
            await sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                form.current,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );
            setShowSuccessModal(true);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            alert("Gagal mengirim email.");
        }
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-3">
            <div className="bg-white rounded-xl shadow-lg w-[500px] max-w-full p-6 relative">
                {/* Tombol Tutup */}
                <button
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-lg"
                    onClick={onClose}
                    aria-label="Tutup Modal"
                >
                    ✕
                </button>

                <h2 className="text-xl font-semibold mb-2">Pendaftaran Pemesanan Tiket</h2>
                <p className="text-sm text-gray-600 mb-4">
                    {format(selectedDate, "EEEE, dd MMMM yyyy", { locale: id })}
                </p>

                {/* Step 1: Pilih Tiket */}
                {step === 1 && (
                    <>
                        {/* Tiket Masuk */}
                        <div className="mb-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="block font-bold">Tiket Masuk</span>
                                    <span className="text-xs text-gray-500">
                                        {isWeekend ? "Harga Weekend" : "Harga Weekday"}: {formatRupiah(hargaTiket)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleChange(setJumlahTiket, -1)} className="px-2 py-1 border rounded">−</button>
                                    <span>{jumlahTiket}</span>
                                    <button onClick={() => handleChange(setJumlahTiket, 1)} className="px-2 py-1 border rounded">＋</button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500">{formatRupiah(jumlahTiket * hargaTiket)}</p>
                        </div>

                        <hr className="my-4 border-blue-500" />

                        {/* Parkir Mobil */}
                        <div className="mb-4">
                            <div className="flex justify-between items-center">
                                <span className="block font-bold">Parkir Mobil</span>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleChange(setMobil, -1)} className="px-2 py-1 border rounded">−</button>
                                    <span>{mobil}</span>
                                    <button onClick={() => handleChange(setMobil, 1)} className="px-2 py-1 border rounded">＋</button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500">{formatRupiah(mobil * hargaMobil)}</p>
                        </div>

                        {/* Parkir Motor */}
                        <div className="mb-4">
                            <div className="flex justify-between items-center">
                                <span className="block font-bold">Parkir Motor</span>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleChange(setMotor, -1)} className="px-2 py-1 border rounded">−</button>
                                    <span>{motor}</span>
                                    <button onClick={() => handleChange(setMotor, 1)} className="px-2 py-1 border rounded">＋</button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500">{formatRupiah(motor * hargaMotor)}</p>
                        </div>

                        {/* Total */}
                        <div className="flex justify-between mt-6 font-medium text-lg">
                            <span className="font-bold">Total Pembayaran</span>
                            <span>{formatRupiah(total)}</span>
                        </div>

                        {/* Tombol Lanjut */}
                        <button
                            onClick={() => setStep(2)}
                            className={clsx("w-full mt-3 px-4 py-2 rounded-md text-white font-semibold active:scale-95 transition-transform duration-150 ease-in-out", { "bg-blue-500 hover:bg-blue-600": isTiketValid, "bg-gray-400 cursor-not-allowed": !isTiketValid })}
                            disabled={!isTiketValid}
                            aria-label="Lanjut ke Form Data Diri"
                        >
                            Selanjutnya
                        </button>
                    </>
                )}

                {/* Step 2: Form Data Diri */}
                {step === 2 && (
                    <>
                        <form
                            ref={form}
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                        >
                            {/* Hidden data */}
                            <input
                                type="hidden"
                                name="tanggal"
                                value={format(selectedDate, "EEEE, dd MMMM yyyy", { locale: id })}
                            />
                            <input type="hidden" name="jumlahTiket" value={jumlahTiket.toString()} />
                            <input type="hidden" name="mobil" value={mobil.toString()} />
                            <input type="hidden" name="motor" value={motor.toString()} />
                            <input type="hidden" name="total" value={formatRupiah(total)} />

                            {/* === Input Data === */}
                            <div className="mb-4">
                                <label className="block mb-1 text-sm font-medium">Nama Lengkap</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="w-full border rounded px-3 py-2 text-sm"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Masukkan nama lengkap"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1 text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full border rounded px-3 py-2 text-sm"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Masukkan email"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1 text-sm font-medium">Nomor HP</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="w-full border rounded px-3 py-2 text-sm"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Masukkan nomor HP"
                                    required
                                />
                            </div>

                            {/* Ringkasan Total */}
                            <div className="text-sm text-gray-600 space-y-1 mb-4">
                                <p>Jumlah Tiket: {jumlahTiket}</p>
                                <p>Jumlah Mobil: {mobil}</p>
                                <p>Jumlah Motor: {motor}</p>
                                <p>Total: <strong>{formatRupiah(total)}</strong></p>
                            </div>

                            <button
                                type="submit"
                                className={clsx(
                                    "w-full mt-3 px-4 py-2 rounded-md text-white font-semibold active:scale-95 transition-transform duration-150 ease-in-out",
                                    {
                                        "bg-blue-500 hover:bg-blue-600": isFormValid && !isLoading,
                                        "bg-gray-400 cursor-not-allowed": !isFormValid || isLoading,
                                    }
                                )}
                                disabled={!isFormValid || isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                fill="none"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            />
                                        </svg>
                                        Mengirim...
                                    </div>
                                ) : (
                                    "Kirim ke Email"
                                )}
                            </button>

                        </form>

                        {showSuccessModal && (
                            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                                <div className="bg-white rounded-xl shadow-md p-6 w-[300px] text-center">
                                    <div className="text-green-500 text-4xl mb-2">✅</div>
                                    <h2 className="text-lg font-semibold mb-2">Berhasil!</h2>
                                    <p className="text-sm text-gray-600">Email konfirmasi telah dikirim.</p>
                                    <button
                                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-4 rounded"
                                        onClick={() => {
                                            setShowSuccessModal(false);
                                            onClose();
                                        }}
                                    >
                                        Tutup
                                    </button>
                                </div>
                            </div>
                        )}


                    </>
                )}
            </div>
        </div>
    );
}
