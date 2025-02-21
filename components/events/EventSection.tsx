// EventSection.tsx
import React, { useState } from "react";
import Typography from "../typography/Typography";
import {
    BuildingOffice2Icon,
    CalendarIcon,
    MapPinIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import BookingDialog from "../ui/BookingDialog"; 
import { getAllEvent } from "@/services/event"; 
import { useQuery } from "@tanstack/react-query"; 
import { IEvent } from "@/types"; 
import Loader from "@/components/ui/Loader";

const EventSection = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

    const { data: events, isLoading } = useQuery({
        queryKey: ["EVENT"],
        queryFn: getAllEvent,
    });

    const handleBookingClick = (event: IEvent) => {
        setSelectedEvent(event);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedEvent(null);
    };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString(); // Simplified date formatting
    };

    if (isLoading) return <Loader />;

    return (
        <section id="event" className="w-full bg-white py-16 px-6 sm:px-12 text-blue-900">
            <div className="max-w-6xl mx-auto text-start">
                <h2 className="text-4xl font-bold mb-8">
                    Upcoming <span className="text-yellow-600">EVENTS</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8"> {/* Four cards on large screens */}
                    {events?.map((event: IEvent) => {
                        const availableSeats = Number(event.remainingSeats);
                        return (
                            <div
                                key={event.id}
                                className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105 relative"
                            >
                                <Typography variant="h5" className="font-bold mb-2 text-xl">{event.title}</Typography>
                                <div className="flex items-center mb-2">
                                    <BuildingOffice2Icon className="h-5 w-5 text-blue-600 mr-2" />
                                    <p className="text-gray-700 truncate w-full max-w-xs">Company: {event.company.name}</p>
                                </div>
                                <div className="flex items-center mb-2">
                                    <MapPinIcon className="h-5 w-5 text-blue-600 mr-2" />
                                    <p className="text-gray-700 truncate w-full max-w-xs">Location: {event.location}</p>
                                </div>
                                <div className="flex items-center mb-2">
                                    <UsersIcon className="h-5 w-5 text-blue-600 mr-2" />
                                    <p className={`text-gray-700 truncate w-full max-w-xs ${availableSeats < 21 ? 'text-red-600 font-semibold' : ''}`}>
                                        Available Seats: {availableSeats}
                                    </p>
                                </div>
                                <div className="flex items-center mb-4">
                                    <CalendarIcon className="h-5 w-5 text-blue-600 mr-2" />
                                    <p className="text-gray-700 truncate w-full max-w-xs">Booking Deadline: {formatDate(event.bookingDeadline)}</p>
                                </div>
                                <button
                                    onClick={() => handleBookingClick(event)}
                                    className="inline-block bg-yellow-600 text-white rounded-full px-4 py-2 text-lg hover:bg-yellow-700 transition-colors"
                                >
                                    Book Now
                                </button>
                                {availableSeats < 21 && (
                                    <span className="absolute top-2 right-2 bg-red-500 text-white rounded-full text-xs px-2 py-1">
                                        Limited Seats
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            {selectedEvent && (
                <BookingDialog
                    event={selectedEvent}
                    isOpen={isDialogOpen}
                    onClose={handleCloseDialog}
                />
            )}
        </section>
    );
};

export default EventSection;
