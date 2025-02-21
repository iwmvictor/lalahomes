"use client";
import MobileSidebar from "@/components/shared/Sidebar/DashBoardSideBar/MobileSideNav/MobileSidebar";
import React from "react";

const MobileSideNav = ({
	sidebarOpen,
}: {
	sidebarOpen: any;
}) => {
	return (
		<div className="flex flex-col h-screen">
			<MobileSidebar sidebarOpen={sidebarOpen} />
		</div>
	);
};

export default MobileSideNav;
