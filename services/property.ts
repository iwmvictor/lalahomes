import type { IProperty } from "@/types/index";
import httpClient from "./httpClient";

export const createEvent = async (data: {
	title: string;
	location: string;
	description: string;
	bookingDeadline: string;
	availableSeats: number;
}): Promise<IProperty> => {
	return (await httpClient.post("/event", data)).data.data;
};

export const getAllProperties = async (): Promise<IProperty[]> => {
	const response = await httpClient.get("/property");
	return response.data.data;
};

export const getAllMyEvent = async (): Promise<IProperty[]> => {
	const response = await httpClient.get("/event/my");
	return response.data.data;
};

export const getProperty = async (id: string): Promise<IProperty> => {
	const response = await httpClient.get(`/property/${id}`);
	return response.data.data;
};

export const updateEvent = async (
	id: string,
	data: Partial<IProperty>,
): Promise<IProperty> => {
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