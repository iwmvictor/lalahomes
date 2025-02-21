import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/utils/Providers/Provider";
import type React from "react";

export const metadata: Metadata = {
	title: "EVENT MANAGEMENT",
	description:
		"Event management system is a web application that allows users to create, update, delete and view events. Users can also book events and view their bookings.",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
