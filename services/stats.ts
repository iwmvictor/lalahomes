// /home/happi/Project/ims-fe/services/stats.ts
import httpClient from "./httpClient";

export const getUsersCount = async (year: string): Promise<any[]> => {
	return (await httpClient.get(`/auth/user/count-by-month/${year}`)).data
		.data;
};

export const getCompanieCount = async (year: string): Promise<any[]> => {
	return (await httpClient.get(`/company/school/count-by-month/${year}`)).data
		.data;
};

export const getEventCount = async (year: string): Promise<any[]> => {
	return (await httpClient.get(`/event/all/all/${year}`)).data
		.data;
};



export const getCompanyEventCount = async (year: string): Promise<any[]> => {
	return (await httpClient.get(`/event/event/company/${year}`)).data
		.data;
};

export const getFinishedCountCompany = async (year: string): Promise<any[]> => {
	return (await httpClient.get(`/event/finished/company/${year}`)).data
		.data;
};

export const getBookingsCountCompany = async (year: string): Promise<any[]> => {
	return (await httpClient.get(`/bookings/booking/company/${year}`)).data
		.data;
};
