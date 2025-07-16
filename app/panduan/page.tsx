"use client";

import dynamic from 'next/dynamic';

// Import secara dinamis — hanya client-side
const PDFViewer = dynamic(() => import('@/components/PDFViewer'), {
    ssr: false,
});

export default function GuidePage() {
    const guide = {
        title: "Panduan Penggunaan Website",
        file_path: "/buku-panduan.pdf",
    };

    return (
        <>
            <div className=" min-h-screen pt-24 px-4">
                <div className="max-w-screen-lg mx-auto space-y-6">
                    <h1 className="text-3xl font-bold text-center">{guide.title}</h1>
                    <PDFViewer filePath={guide.file_path} />
                </div>
            </div>
        </>
    );
}
