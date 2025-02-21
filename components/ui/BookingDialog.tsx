import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "../ui/dialog";
import { book } from "@/services/booking";
import { useToast } from "@/components/ui/use-toast";
import { QueryClient } from "@tanstack/react-query";

interface BookingDialogProps {
    event: {
        id: string;
        title: string;
        company: {
            name: string;
        };
        location: string;
        availableSeats: number;
        bookingDeadline: string;
        description: string;
        remainingSeats: number;
    };
    isOpen: boolean;
    onClose: () => void;
}

const BookingDialog: React.FC<BookingDialogProps> = ({ event, isOpen, onClose }) => {
    const { toast } = useToast(); // Initialize the toast
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [seats, setSeats] = useState(1);
    const [errors, setErrors] = useState<{ phone?: string; email?: string; seats?: string }>({});
    const queryClient = new QueryClient();

    const validateForm = () => {
        const newErrors: { phone?: string; email?: string; seats?: string } = {};
        if (!phone) {
            newErrors.phone = "Phone number is required.";
        } else if (!/^\d{10}$/.test(phone)) {
            newErrors.phone = "Phone number must be 10 digits.";
        }

        if (!email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email address is invalid.";
        }

        if (seats < 1 || seats > event.remainingSeats) {
            newErrors.seats = `Number of seats must be between 1 and ${event.remainingSeats}.`;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if there are no errors
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return; // Stop submission if validation fails
        }

        const bookingData = {
            eventId: event.id,
            phoneForBooking: phone,
            emailForBooking: email,
            numberOfSeats: seats,
        };

        try {
            await book(bookingData);
            toast({
                title: "Booking successful!", // Use the toast from your custom hook
                variant: "primary",
            });
            queryClient.invalidateQueries({ queryKey: ["EVENT"] });
            onClose();
        } catch (error) {
            console.error("Booking failed:", error);
            toast({
                title: "Booking failed. Please try again.", // Use the toast from your custom hook
                variant: "destructive",
            });
        }
    };

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="rounded-lg shadow-lg p-8 bg-white max-w-lg mx-auto">
                <DialogHeader>
                    <div className="flex justify-between items-center mb-4">
                        <DialogTitle className="text-2xl font-bold text-gray-800">{event.title}</DialogTitle>
                    </div>
                    <DialogDescription className="text-gray-600 mb-4">
                        <p><strong>Company:</strong> {event.company.name}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                        <p><strong>Available Seats:</strong> {event.remainingSeats}</p>
                        <p><strong>Booking Deadline:</strong> {formatDate(event.bookingDeadline)}</p>
                    </DialogDescription>
                    <div className="text-gray-600 mb-4">
                        <strong>Description:</strong>
                        <p className="mt-2">{event.description.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                    </div>
                </DialogHeader>
                <div className="mt-6 space-y-5">
                    <label className="block">
                        <span className="text-gray-700 font-medium">Phone Number</span>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={`mt-1 block w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out p-2`}
                            placeholder="Enter your phone number"
                        />
                        {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
                    </label>
                    <label className="block">
                        <span className="text-gray-700 font-medium">Email</span>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`mt-1 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out p-2`}
                            placeholder="Enter your email"
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                    </label>
                    <label className="block">
                        <span className="text-gray-700 font-medium">Number of Seats</span>
                        <input
                            type="tel"
                            value={seats}
                            onChange={(e) => setSeats(Number(e.target.value))}
                            className={`mt-1 block w-full border ${errors.seats ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out p-2`}
                            placeholder="Enter number of seats"
                            min={1}
                            max={event.remainingSeats}
                        />
                        {errors.seats && <span className="text-red-500 text-sm">{errors.seats}</span>}
                    </label>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-200 ease-in-out"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-200 ease-in-out"
                    >
                        Book Now
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookingDialog;
