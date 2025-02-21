export const roles = {
	ADMIN: "ADMIN",
	COMPANY_ADMIN: "COMPANY_ADMIN",
	COMPANY_USER: "COMPANY_USER",
	USER: "USER",
};

export type IRole = keyof typeof roles;
