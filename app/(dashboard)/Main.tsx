"use client";
import DashBoardSideBar from "@/components/shared/Sidebar/DashBoardSideBar";
import React, { type PropsWithChildren, type FC } from "react";
import Content from "./content";

const Main: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div
			className={
				"flex flex-row overflow-auto h-screen border-blue-700 bg-almost-white"
			}
		>
			<div className="sticky top-0">
				<DashBoardSideBar />
			</div>
			<div className="w-full h-fit min-h-screen bg-white">
				<Content>{children}</Content>
			</div>
		</div>
	);
};
export default Main;
