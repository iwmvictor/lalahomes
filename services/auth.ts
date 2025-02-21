import type { roles } from "@/constants/roles";
import type { loginSchema } from "@/constants/login";
import type { z } from "zod";
import axios from "./httpClient";
import httpClient from "./httpClient";

export interface ISignInResponse {
	token: string;
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	roles: keyof typeof roles;
}
export type TResetPasswordSchema = {
	otp: string;
	email: string;
	newPassword: string;
};

export type TLoginSchema = z.infer<typeof loginSchema>;

export const signIn = async (data: any): Promise<ISignInResponse | null> => {
	const user = (await axios.post("/auth/signin", data)).data.data;
	return {
		...user,
		name: user.firstName,
		lastName: user.lastName,
		email: user.email,
		studentPhone: user.studentPhone,
		school: user.school,
		sector: user.sector,
		trade: user.trade,
		level: user.level,
		trainerLastName: user.trainerLastName,
		trainerFirstName: user.trainerFirstName,
		trainerPhone: user.trainerPhone,
	};
};

export const forgot_password = async (data: {
	email: string;
}): Promise<any> => {
	const response = await httpClient.post("/auth/request-password-reset", data);
	return response.data;
};

export const reset_password = async (data: {
	otp: string;
	email: string;
	newPassword: string;
}): Promise<any> => {
	const response = await httpClient.post("/auth/reset-password", data);
	return response.data;
};
