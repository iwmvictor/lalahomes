import type {
	ICompanyInputs,
} from "@/constants/types";
export interface ICompany {
	id: number;
	name: string;
	address: string;
	email: string;
	phoneNumber: string;
	createdAt: string;
	updatedAt: string;
}

export interface ICreateCompanyValidationError {
	field: keyof ICompanyInputs;
	error: string;
}
export interface IEvent {
	id: string;
	title: string;
	location: string;
	description: string;
	bookingDeadline: string;
	availableSeats: number;
	createdAt: string;
	updatedAt: string;
	numberOfBookings: number;
	remainingSeats: number;
	bookings: IBookings[];
	company: {
		id: number;
		name: string;
		address: string;
		email: string;
	};
}

export interface IUser {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
}

export interface IBookings {
	id: string;
	userId?: number | null;
	eventId: string;
	numberOfseats: number;
	emailForBooking: string;
	phoneForBooking: string;
	createdAt: string;
	updatedAt: string;
	bookingStatus: string;
	user: IUser;
}
