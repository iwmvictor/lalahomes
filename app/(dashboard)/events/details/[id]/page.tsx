"use client";
import PageContent from "@/components/shared/PageContent";
import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";
import {
	isAcceptingbooking,
	setAcceptingBooking,
} from "@/services/event";
import { getEvent } from "@/services/event";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Link from "next/link";
import { useParams } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";

const EventDetailsPage: React.FC = () => {
	const { id } = useParams();
	const [acceptingBookings, setAcceptingBookings] = useState(true);

	const { data: event, isLoading } = useQuery({
		queryKey: ["EVENT", id],
		queryFn: () => getEvent(id as string),
	});

	useEffect(() => {
		const checkAcceptingBooking = async () => {
			const accepting = await isAcceptingbooking(id as string);
			setAcceptingBookings(accepting);
		};
		checkAcceptingBooking();
	}, [id, event]);

	const handleAcceptBooking = async () => {
		try {
			const newStatus = !acceptingBookings;
			await setAcceptingBooking(id as string, newStatus);
			setAcceptingBookings(newStatus);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	if (isLoading || !event) return <Loader />;

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return format(date, "dd MMMM yyyy");
	};

	return (
		<PageContent>
			<Link href="/events">
				<Button variant="ghost">
					<ArrowLeftIcon className="w-5 h-5 text-gray-700" />
				</Button>
			</Link>
			<div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="text-black">
					<section className="mb-8">
						<h2 className="text-xl font-medium mb-3">Event Description</h2>
						<p className="text-gray-700 text-sm">
							{event.description.replace(/<\/?[^>]+(>|$)/g, "")}
						</p>
					</section>
					<section className="mb-8 h-10">
						<p className="text-sm font-medium">
							<strong>Booking Deadline:</strong>{" "}
							{formatDate(event.bookingDeadline)}
						</p>
					</section>
					<section className="mb-2 h-10">
						<Button
							className={`py-2 px-4 rounded-lg inline-block ${
								acceptingBookings
									? "bg-blue-900 text-white hover:bg-blue-800"
									: "bg-blue-900 text-white hover:bg-blue-800"
							}`}
							onClick={handleAcceptBooking}
						>
							{acceptingBookings
								? "Stop Booking"
								: "Activate Booking"}
						</Button>
					</section>
				</div>
				<div className="bg-blue-900 text-white rounded-lg p-8 flex-1">
					<div className="mb-4 h-10">
						<h2 className="text-xl font-medium">{event.title}</h2>
					</div>
					<div className="mb-4 h-30">
						<p className="text-sm font-medium">
							<strong>Company:</strong> {event.company.name}
						</p>
					</div>
					<div className="mb-4 h-30">
						<p className="text-sm font-medium">
							<strong>Location:</strong> {event.location}
						</p>
					</div>
					<div className="mb-4 h-30">
						<p className="text-sm font-medium">
							<strong>Available Seats</strong> {event.availableSeats}
						</p>
					</div>

					<div className="mb-4 h-30">
						<p className="text-sm font-medium">
							<strong>Date Posted:</strong> {formatDate(event.createdAt)}
						</p>
					</div>
				</div>
			</div>
		</PageContent>
	);
};

export default EventDetailsPage;
