export const roles = {
	ADMIN: "ADMIN",
	HOST: "HOST",
	RENTER:"RENTER"
};

export type IRole = keyof typeof roles;
