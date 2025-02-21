import { create } from "zustand";

export interface IIsLoggedIn {
	isLoggedIn: boolean;
	toggleIsLoggedIn: () => void;
}

export const useIsLoggedinStore = create<IIsLoggedIn>((set) => ({
	isLoggedIn: false,
	toggleIsLoggedIn: () => set((state) => ({ isLoggedIn: !state.isLoggedIn })),
}));
