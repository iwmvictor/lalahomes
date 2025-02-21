"use client";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

const HomePage = () => {
	useEffect(() => {
		signOut({ callbackUrl: "/" });
	}, []);

	return null;
};

export default HomePage;
