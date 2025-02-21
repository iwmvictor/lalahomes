// /home/happi/Project/Event-management-nextJs/services/companies.ts

import type { ICompanyFullInfo } from "@/constants/types";
import type { ICompany, IUser } from "./../types/index";
import httpClient from "./httpClient";

// Create a new company
export const createCompany = async (data: { company: any; contactPerson: any }): Promise<ICompany> => {
    return (await httpClient.post("/company", data)).data;
};

// Get all companies
export const getAllUsers = async (): Promise<IUser[]> => {
	return (await httpClient.get("/auth/users")).data.data;
};

// Get a specific company by ID
export const getCompany = async (id: string): Promise<ICompanyFullInfo> => {
	return (await httpClient.get(`/company/${id}`)).data.data;
};

// Update an existing company
export const updateCompany = async (
	data: { company: any; contactPerson: any },
	id: string,
): Promise<ICompanyFullInfo> => {
	return (await httpClient.put(`/company/${id}`, data)).data;
};
