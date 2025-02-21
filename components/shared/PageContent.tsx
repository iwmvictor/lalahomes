"use client";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import type React from "react";

const PageContent = ({
	children,
	isLoading,
}: { children: React.ReactNode; isLoading?: boolean }) => {
	return (
		<>
			{isLoading ? (
				<div>
					<div className="flex items-center justify-center h-full">
						<ArrowPathIcon className="animate-spin w-10 h-10 text-primary" />
					</div>
					<div className="flex items-center justify-center h-full text-primary">
						<p>Loading...</p>
					</div>
				</div>
			) : (
				<div className="bg-white w-full h-full rounded-xl border p-6 overflow-auto">
					{children}
				</div>
			)}
		</>
	);
};

export default PageContent;
