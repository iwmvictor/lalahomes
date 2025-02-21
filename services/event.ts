import type { IEvent } from "@/types/index";
import httpClient from "./httpClient";

export const createEvent = async (data: {
	title: string;
	location: string;
	description: string;
	bookingDeadline: string;
	availableSeats: number;
}): Promise<IEvent> => {
	return (await httpClient.post("/event", data)).data.data;
};

export const getAllEvent = async (): Promise<IEvent[]> => {
	const response = await httpClient.get("/event");
	return response.data.data;
};

export const getAllMyEvent = async (): Promise<IEvent[]> => {
	const response = await httpClient.get("/event/my");
	return response.data.data;
};

export const getEvent = async (id: string): Promise<IEvent> => {
	const response = await httpClient.get(`/event/${id}`);
	return response.data.data;
};

export const updateEvent = async (
	id: string,
	data: Partial<IEvent>,
): Promise<IEvent> => {
	const response = await httpClient.put(`/event/${id}`, data);
	return response.data.data;
};

export const deleteEvent = async (id: string): Promise<void> => {
	await httpClient.delete(`/event/${id}`);
};

export const isAcceptingbooking = async (
	eventId: string,
): Promise<boolean> => {
	const response = await httpClient.get(
		`/event/${eventId}/is-accepting-bookings`,
	);
	return response.data.data.isAcceptingBooking;
};

export const setAcceptingBooking = async (
	eventId: string,
	isAcceptingBooking: boolean,
): Promise<any> => {
	const response = await httpClient.put(
		`/event/${eventId}/set-accepting-bookings`,
		{ isAcceptingBooking },
	);
	return response.data;
};