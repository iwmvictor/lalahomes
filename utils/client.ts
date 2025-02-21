import axios, { type AxiosResponse } from "axios";

const axiosCLient = axios.create({
	baseURL: "",
});

const token = localStorage.getItem("token");

export const request = async ({ ...options }) => {
	axiosCLient.defaults.headers.common.Authorization = `Bearer ${token}`;
	const onSuccess = (response: AxiosResponse) => response;
	const onError = (error: AxiosResponse) => {
		if (error.status === 401) {
			localStorage.removeItem("token");
			window.location.href = "/login";
		}
	};

	return axiosCLient(options).then(onSuccess).catch(onError);
};
