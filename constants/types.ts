//constants/types.ts

import type { z } from "zod";
import type { CreateBookingSchema } from "./booking.schema";
import type { CreateCompanySchema } from "./company.schema";
import type { CreateEventSchema } from "./event.schema";

export type ICompanyInputs = z.infer<typeof CreateCompanySchema>;
export type IJobPostInputs = z.infer<typeof CreateEventSchema>;
export type IApplicationInputs = z.infer<typeof CreateBookingSchema>;


interface User {
	token: string;
	firstName: string;
	lastName: string;
	email: string;
	id: number;
	roles: string[];
	name: string;
}
export interface TokenPayload {
	user: User;
	expires: string;
	name: string;
	email: string;
	sub: string;
	iat: number;
	exp: number;
	jti: string;
}

export type IEvent = IEventFullInfo;
export type IBookings = IBoookingInfo;

export type IEventFullInfo = {
	id: string;
	createdAt: string;
	updatedAt: string;
};

export type IBoookingInfo = {
	id: string;
	createdAt: string;
	updatedAt: string;
};
type Modify<T, R> = Omit<T, keyof R> & R;
export type ICompanyFullInfo = Modify<
	ICompanyInputs,
	{
		company: Modify<
			ICompanyInputs["company"],
			{
				id: string;
			}
		>;
		contactPerson: Modify<
			ICompanyInputs["contactPerson"],
			{
				id: string;
			}
		>;
	}
>;