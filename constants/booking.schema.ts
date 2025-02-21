import { z } from "zod";

export const CreateBookingSchema = z.object({
	userId: z
	.number()
	.optional(),
	eventId: z.string({ required_error: "event post required" }).min(1),
	numberOfseats: z.number({ required_error: "Number of seats required" }),
	emailForBooking: z.string({ required_error: "Email required" }).email(),
	phoneForBooking: z.string({ required_error: "Phone number required" }),
});
