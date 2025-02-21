import httpClient from "./httpClient";

export const book = async (data: {
    eventId: string;
    numberOfSeats: number;
    emailForBooking: string;
    phoneForBooking: string;
    userId?: number; // Optional since it defaults to 0
}): Promise<any> => {
    // Default userId to 0 if not provided
    const bookingData = {
        userId: data.userId ?? 0,
        eventId: data.eventId,
        numberOfseats: data.numberOfSeats,
        emailForBooking: data.emailForBooking,
        phoneForBooking: data.phoneForBooking,
    };

    const response = await httpClient.post("/bookings", bookingData);
    return response.data;
};
