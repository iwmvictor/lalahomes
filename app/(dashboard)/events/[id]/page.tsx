"use client";
import EventForm from "@/components/events/CreateEventForm";
import Loader from "@/components/ui/Loader";
import { getEvent } from "@/services/event";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const EditEventsPage = () => {
	const params = useParams();
	const id = params.id as string;
	const { data, isLoading } = useQuery({
		queryKey: ["EVENT", id],
		queryFn: () => getEvent(id),
	});

	return (
		<div>
			{isLoading ? (
				<Loader />
			) : (
				<EventForm isLoading={isLoading} isUpdate defaults={data} />
			)}
		</div>
	);
};

export default EditEventsPage;
