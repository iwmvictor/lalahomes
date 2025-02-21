import axios from "axios";
import type { Session } from "next-auth";
import { getSession } from "next-auth/react";

interface AppSession extends Session {
	user: {
		token: string;
		name: string;
		email: string;
		firstName: string;
		lastName: string;
	};
}

const ApiClient = () => {
	const instance = axios.create({
		baseURL: process.env.NEXT_PUBLIC_API_URL,
	});
	instance.interceptors.request.use(async (request) => {
		const session = (await getSession()) as AppSession;
		if (session) {
			request.headers.Authorization = session.user.token;
		}
		return request;
	});

	instance.interceptors.response.use(
		(response) => response,
		(error) => {
			return Promise.reject(error);
		},
	);
	return instance;
};

export default ApiClient();
