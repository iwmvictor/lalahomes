import z from "zod";

export const loginSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	password: z.string({
		message: "Wrong Password. Please enter a valid password.",
	}),
});

export const resetPasswordSchema = z.object({
	otp: z.string().min(1, "OTP is required"),
	email: z.string().email("Invalid email address"),
	newPassword: z.string().min(6, "Password must be at least 6 characters"),
});
