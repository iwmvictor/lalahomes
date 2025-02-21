"use client";
import DashboardNavBar from "@/components/shared/NavBar/DashboardNavBar";
import MobileSideNav from "@/components/shared/Sidebar/DashBoardSideBar/MobileSideNav";
import type React from "react";
import { useState } from "react";

const Content = ({ children }: { children: React.ReactNode }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	return (
		<>
			{sidebarOpen && (
				<div className="max:w-1/5 block bg-primary fixed right-0 z-50">
					<MobileSideNav sidebarOpen={sidebarOpen} />
				</div>
			)}
			<div className={`sticky top-0 bg-gray-50 ${!sidebarOpen && "z-50"}`}>
				<DashboardNavBar
					sidebarOpen={sidebarOpen}
					setSidebarOpen={setSidebarOpen}
				/>
			</div>
			<div
				className="flex  lg:mx-5 h-auto"
				onClick={() => setSidebarOpen(false)}
			>
				<div className="w-full  flex flex-row justify-between h-dashboard-screen lg:py-4">
					<div
						className={`flex flex-col ${
							sidebarOpen ? "w-5/5 opacity-25" : "w-full"
						}`}
					>
						<main className="flex-1 rounded-lg box-border">
							<div className="h-full p-4 mb-8 box-border">{children}</div>
						</main>
					</div>
				</div>
			</div>
		</>
	);
};

export default Content;
