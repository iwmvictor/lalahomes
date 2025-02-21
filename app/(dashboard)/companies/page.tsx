"use client";
import { Button } from "@/components/ui/button";
import { customStyles } from "@/components/ui/helper.css";
import { getAllCompanies } from "@/services/companies";
import type { ICompany } from "@/types";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import { useMemo } from "react";
import DataTable from "react-data-table-component";

const CompanyPages = () => {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const { data, isLoading } = useQuery({
		queryKey: ["COMPANIES"],
		queryFn: getAllCompanies,
	});

	// Filtered company based on the search query
	const filteredStudents = data?.filter((company: ICompany) => {
		const searchString = searchQuery.toLowerCase();

		// Convert all relevant fields to strings and check if the searchQuery is included
		return (
			`${company.name}`.toLowerCase().includes(searchString) ||
			company.address.toLowerCase().includes(searchString) ||
			company.email.toLowerCase().includes(searchString) ||
			company.phoneNumber?.toLowerCase().includes(searchString)
		);
	});

	const columns = useMemo(
		() => [
			{
				name: "Company Name",
				selector: (row: ICompany) => row.name,
				sortable: true,
			},
			{
				name: "Location",
				selector: (row: ICompany) => row.address,
				sortable: true,
			},
			{ name: "Email", selector: (row: ICompany) => row.email, sortable: true },
			{
				name: "Phone Number",
				selector: (row: ICompany) => row.phoneNumber,
				sortable: true,
			},
			{
				name: "Action",
				cell: (row: ICompany) => (
					<Link href={`/companies/${row.id}`}>
						<PencilIcon className="text-red-500 w-4 h-4 hover:text-red-700" />
					</Link>
				),
			},
		],
		[],
	);

	return (
		<div className="w-full space-y-4 p-4 bg-white rounded-lg shadow-md">
			<Button asChild className="mb-4">
				<Link href="/companies/create">Add New Company</Link>
			</Button>
			<div className="w-full shadow-sm">
				{/* Search Input */}
				<div className="mt-4">
					<input
						type="text"
						placeholder="Search company..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="border border-gray-300 rounded-md p-2 w-full"
					/>
				</div>
				<DataTable
					progressPending={isLoading}
					columns={columns}
					data={filteredStudents ?? []}
					striped
					highlightOnHover
					pagination
					responsive
					customStyles={customStyles}
				/>
			</div>
		</div>
	);
};

export default CompanyPages;
