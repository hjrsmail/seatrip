'use client';

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer({ filePath }: { filePath: string }) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [containerWidth, setContainerWidth] = useState<number>(600);
    const [scale, setScale] = useState<number>(0.5);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    return (
        <>
            <div className="flex flex-wrap justify-center gap-2">
                <div className="flex flex-wrap justify-center gap-2">
                    <a
                        href={filePath}
                        download
                        className="bg-primary-600 text-black px-4 py-2 rounded shadow hover:bg-primary-700 transition"
                    >
                        ⬇️ Download Panduan
                    </a>

                    <button
                        onClick={() => setScale(s => Math.max(0.4, s - 0.2))}
                        className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300 active:scale-95 transition"
                    >
                        ➖ Zoom Out
                    </button>

                    <button
                        onClick={() => setScale(s => Math.min(3, s + 0.2))}
                        className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300 active:scale-95 transition"
                    >
                        ➕ Zoom In
                    </button>

                    <button
                        onClick={() => setPageNumber(p => Math.max(1, p - 1))}
                        className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300 active:scale-95 transition"
                        disabled={pageNumber === 1}
                    >
                        ⬅️ Prev
                    </button>

                    <button
                        onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
                        className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300 active:scale-95 transition"
                        disabled={pageNumber === numPages}
                    >
                        ➡️ Next
                    </button>
                </div>

            </div>

            <div ref={containerRef} className="p-4">
                <div className="flex justify-center">
                    <Document
                        file={filePath}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading="Memuat dokumen..."
                    >
                        <Page
                            pageNumber={pageNumber}
                            width={containerWidth * scale}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    </Document>
                </div>
            </div>

            <div className="text-center text-sm text-black">
                Halaman {pageNumber} dari {numPages} — Zoom: {(scale * 100).toFixed(0)}%
            </div>
        </>
    );
}
