"use client";
import DashBoardSideBar from "@/components/shared/Sidebar/DashBoardSideBar";
import { useSession } from "next-auth/react";
import { Poppins } from "next/font/google";
import type React from "react";
import Content from "./content";

const poppins = Poppins({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-poppins",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	const { status } = useSession();
	return (
		<>
			{status === "authenticated" && (
				<div
					className={`flex flex-row overflow-auto h-full ${poppins.className}`}
				>
					<div className="sticky top-0 hidden lg:flex">
						<DashBoardSideBar />
					</div>
					<div className="w-full h-full bg-gray-200 overflow-auto">
						<Content>{children}</Content>
					</div>
				</div>
			)}
		</>
	);
};

export default DashboardLayout;
