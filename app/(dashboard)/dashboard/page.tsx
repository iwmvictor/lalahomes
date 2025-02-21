"use client";
import { useAdminStats } from "@/services/useAdminStats"; // Adjust the path accordingly
import type React from "react";
import { useState } from "react";
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const monthNames = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

const AdminDashboard = () => {
	const currentYear = new Date().getFullYear(); // Get the current year as a number
	const [selectedYear, setSelectedYear] = useState(currentYear.toString()); // Manage selected year state as a string

	// Fetch stats based on the selected year
	const { userCounts, companyCounts, eventCounts } =
		useAdminStats(selectedYear);

	// Prepare data for the chart
	const data = userCounts.map((userCount, index) => ({
		month: monthNames[index], // Use month names
		users: userCount || 0, // Default to 0 if no data
		companies: companyCounts[index] || 0, // Default to 0 if no data
		event: eventCounts[index] || 0, // Default to 0 if no data
	}));

	// Year selection handler
	const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedYear(e.target.value);
	};

	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
				<div className="flex-1 flex justify-between items-center">
					<div className="group flex flex-col items-center bg-white py-12 px-12 lg:px-24 rounded-md hover:shadow-md transition-all duration-75 w-full flex-1 hover:bg-blue-900">
						<h1 className="font-bold text-2xl text-blue-900 group-hover:text-white">
							{userCounts.reduce(
								(a, b) => (Number(a) || 0) + (Number(b) || 0),
								0,
							) || 0}
						</h1>
						<p className="text-sm text-gray-800 group-hover:text-white">
							users
						</p>
					</div>
					<div className="group flex flex-col items-center bg-white py-12 px-12 lg:px-24 rounded-md hover:shadow-md transition-all duration-75 w-full flex-1 hover:bg-blue-900">
						<h1 className="font-bold text-2xl text-blue-900 group-hover:text-white">
							{companyCounts.reduce(
								(a, b) => (Number(a) || 0) + (Number(b) || 0),
								0,
							) || 0}
						</h1>
						<p className="text-sm text-gray-800 group-hover:text-white">
							companies
						</p>
					</div>
					<div className="group flex flex-col items-center bg-white py-12 px-12 lg:px-24 rounded-md hover:shadow-md transition-all duration-75 w-full flex-1 hover:bg-blue-900">
						<h1 className="font-bold text-2xl text-blue-900 group-hover:text-white">
							{eventCounts.reduce(
								(a, b) => (Number(a) || 0) + (Number(b) || 0),
								0,
							) || 0}
						</h1>
						<p className="text-sm text-gray-800 group-hover:text-white">
							event
						</p>
					</div>
				</div>
			</div>
			<div className="bg-white rounded-md p-4 shadow-md">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold">Monthly Statistics</h2>
					<select
						value={selectedYear}
						onChange={handleYearChange}
						className="p-2 border rounded-md ml-4"
					>
						{/* Generate options for the last 5 years */}
						{[...Array(5)].map((_, index) => {
							const year = currentYear - index;
							return (
								<option key={year} value={year.toString()}>
									{year}
								</option>
							);
						})}
					</select>
				</div>
				<ResponsiveContainer width="100%" height={300}>
					<LineChart data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="month" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line type="monotone" dataKey="users" stroke="#8884d8" />
						<Line type="monotone" dataKey="companies" stroke="#82ca9d" />
						<Line type="monotone" dataKey="event" stroke="#ffc658" />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default AdminDashboard;
