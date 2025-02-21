// /home/happi/Project/Event-management-nextJs/constants/company.schema.ts

import { z } from "zod";

// Base schema for company information
const companyBaseSchema = {
	name: z.string({ required_error: "Name required" }).min(1),
	address: z.string().optional(),
	email: z.string({ required_error: "Email required" }).email(),
	phoneNumber: z.string().optional(),
};

// Base schema for contact person information
const contactPersonSchema = {
	firstName: z.string({ required_error: "First name required" }).min(1),
	lastName: z.string({ required_error: "Last name required" }).min(1),
	email: z.string({ required_error: "Email required" }).email(),
	phoneNumber: z.string().optional(),
};

// Schema for creating a company
export const CreateCompanySchema = z.object({
	company: z.object({
		...companyBaseSchema,
	}),
	contactPerson: z.object({
		...contactPersonSchema,
	}),
});

// Schema for updating a company
export const UpdateCompanySchema = z.object({
	company: z.object({
		...companyBaseSchema,
	}),
	contactPerson: z.object({
		...contactPersonSchema,
	}),
});
