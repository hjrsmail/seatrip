"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import { isBefore, isToday, startOfDay } from "date-fns";
import BookingModal from "./Modal";
import Button from "./ui/Button";

export default function MyCalendar() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const today = startOfDay(new Date());

    const tileClassName = ({ date, view }: { date: Date; view: string }) => {
        if (view === "month") {
            const dateStart = startOfDay(date);
            if (isToday(dateStart)) return "calendar-today";
            if (isBefore(dateStart, today)) return "calendar-past";
            return "calendar-future";
        }
        return "";
    };

    const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
        return view === "month" && isBefore(startOfDay(date), today);
    };


    return (
        <div id="calendar" className="w-full px-4 md:px-6 py-8 bg-white rounded-xl shadow-lg max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-lg md:text-xl font-semibold text-gray-800">Kalender Booking</h2>
                    <p className="text-sm text-gray-500">Klik tanggal untuk memesan tiket</p>
                </div>
                <Button
                    onClick={() => {
                        const todayDate = startOfDay(new Date());
                        setSelectedDate(todayDate);
                        setIsModalOpen(true);
                    }}
                    className="bg-blue-500"
                >
                    Hari Ini
                </Button>
            </div>

            {/* Kalender */}
            <Calendar
                onChange={(value) => {
                    const selected =
                        value instanceof Date
                            ? value
                            : Array.isArray(value) && value[0] instanceof Date
                                ? value[0]
                                : null;

                    if (selected) {
                        setSelectedDate(selected);
                        setIsModalOpen(true);
                    }
                }}

                value={selectedDate}
                locale="id-ID"
                calendarType="iso8601"
                tileClassName={tileClassName}
                tileDisabled={tileDisabled}
                prevLabel="◀"
                nextLabel="▶"
            />

            {/* Modal */}
            {selectedDate && isModalOpen && (
                <BookingModal
                    selectedDate={selectedDate}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}
