"use client";
import PageContent from "@/components/shared/PageContent";
import React from "react";

const HomePage = () => {
	return (
		<PageContent>
			<div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-50">
				{/* Heading Section */}
				<h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
					Welcome to <span className="text-yellow-600">EVENT</span> MANAGEMENT
				</h1>

				{/* Subtitle Section */}
				<p className="text-lg sm:text-xl md:text-2xl text-center text-gray-700 mb-8 max-w-3xl">
					Manage your events with ease
				</p>
			</div>
		</PageContent>
	);
};

export default HomePage;
