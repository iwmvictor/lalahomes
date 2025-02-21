import { z } from "zod";

export const CreateEventSchema = z.object({
	title: z.string({ required_error: "Title required" }).min(3),
	location: z.string({ required_error: "Location required" }).min(2),
	description: z.string({ required_error: "Description required" }).min(1),
	bookingDeadline: z
		.string()
		.optional()
		.transform((val) => val || ""),
	availableSeats: z.any(),
});

export const UpdateEventSchema = z.object({
	title: z.string({ required_error: "Title required" }).min(3),
	location: z.string({ required_error: "Location required" }).min(2),
	description: z.string({ required_error: "Description required" }).min(1),
	bookingDeadline: z
		.string()
		.optional()
		.transform((val) => val || ""),
	availableSeats: z.any(),
});
