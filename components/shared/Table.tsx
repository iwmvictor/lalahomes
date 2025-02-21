"use client";

import type React from "react";
import DataTable, {
	type TableColumn,
	type TableRow,
} from "react-data-table-component";

interface Props {
	columns: {
		name: string;
		title: string;
	}[];
	data: object[];
	options?: React.JSX.Element;
	title?: string;
}

export default function Table({ columns, data, options, title }: Props) {
	const updatedData = data.map((row) => {
		return {
			...row,
			options,
		};
	});

	const changedColumns = options
		? [...columns, { name: "options", title: "Options" }]
		: columns;

	const tableColumns: TableColumn<{
		options: React.JSX.Element | undefined;
	}>[] = (options ? changedColumns : columns).map((column) => {
		return {
			name: column?.title,
			selector: (row: TableRow) => {
				return row[column.name] as string;
			},
		};
	});

	return (
		<div className="flex flex-col w-full bg-white ">
			{/* <h1 className="p-4 font-bold text-xl capitalize">{title}</h1> */}
			<DataTable
				columns={tableColumns}
				data={updatedData}
				selectableRows
				className="w-full"
				title={title}
			/>
		</div>
	);
}
