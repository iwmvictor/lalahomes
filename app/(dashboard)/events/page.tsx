"use client";
import ConfirmationModal from "@/components/ui/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { customStyles } from "@/components/ui/helper.css";
import { useToast } from "@/components/ui/use-toast";
import { deleteEvent, getAllMyEvent } from "@/services/event";
import type { IEvent } from "@/types/index";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";

export default function EventPages() {
	const { data, isLoading } = useQuery({
		queryKey: ["EVENT"],
		queryFn: getAllMyEvent,
	});
	const queryClient = useQueryClient();
	const [isDeleting, setIsDeleting] = useState<string | null>(null);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const { toast } = useToast();

	const deleteMutation = useMutation({
		mutationFn: (id: string) => deleteEvent(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["EVENT"] });
			toast({ title: "event post deleted", variant: "primary" });
		},
		onError: () => {
			setIsDeleting(null);
			toast({
				title: "Failed to delete event post",
				variant: "destructive",
			});
		},
	});

	function handleDeleteClick(id: string) {
		setDeleteId(id);
		setShowModal(true);
	}

	function handleConfirmDelete() {
		if (deleteId) {
			setIsDeleting(deleteId);
			deleteMutation.mutate(deleteId, {
				onSettled: () => setIsDeleting(null),
			});
			setShowModal(false);
		}
	}

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	}

	const columns = useMemo(
		() => [
			{
				name: "Title",
				selector: (row: IEvent) => row.title,
				sortable: true,
			},
			{
				name: "Booking Deadline",
				selector: (row: IEvent) => formatDate(row.bookingDeadline),
				sortable: true,
			},
			{
				name: "CreatedAt",
				selector: (row: IEvent) => formatDate(row.createdAt),
				sortable: true,
			},
			{
				name: "Total Seats",
				selector: (row: IEvent) => row.availableSeats,
				sortable: true,
			},
			{
				name: "Booked Seats",
				selector: (row: IEvent) => row.numberOfBookings,
				sortable: true,
			},
			{
				name: "Remaining Seats",
				selector: (row: IEvent) => row.remainingSeats,
				sortable: true,
			},
			{
				name: "Action",
				cell: (row: IEvent) => (
					<div className="flex space-x-2">
						<Link href={`/events/${row.id}`}>
							<PencilIcon className="text-blue-900 w-4 h-4 hover:text-blue-900" />
						</Link>
						<Link href={`/events/details/${row.id}`}>
							<AiOutlineEye className="text-blue-900 w-4 h-4  hover:text-blue-900" />
						</Link>
						<button
							type="button"
							onClick={() => handleDeleteClick(row.id.toString())}
							disabled={isDeleting === row.id.toString()}
						>
							<AiOutlineDelete
								className={`text-red-500 w-4 h-4  hover:text-red-700 ${
									isDeleting === row.id.toString() ? "animate-spin" : ""
								}`}
							/>
						</button>
					</div>
				),
			},
		],
		[isDeleting],
	);

	return (
		<div className="w-full space-y-4 p-4 bg-white rounded-lg shadow-md">
			<Button asChild className="mb-4">
				<Link href="/events/create">Create Event Post</Link>
			</Button>

			<div className="w-full shadow-sm">
				<DataTable
					progressPending={isLoading}
					columns={columns}
					data={data || []} 
					striped
					highlightOnHover
					pagination
					responsive
					customStyles={customStyles}
				/>
			</div>

			<ConfirmationModal
				show={showModal}
				onClose={() => setShowModal(false)}
				onConfirm={handleConfirmDelete}
				message="Are you sure you want to delete this event post?"
			/>
		</div>
	);
}
