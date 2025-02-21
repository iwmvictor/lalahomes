import {
	getFinishedCountCompany,
	getCompanyEventCount,
	getBookingsCountCompany,
} from "@/services/stats";
import { useEffect, useState } from "react";

export const useCompanyStats = (year: string) => {
	const [eventsCount, setEventCountsByCompany] = useState<number[]>(
		[],
	);
	const [finishedCount, setFinishedCountsByCompany] =
		useState<number[]>([]);
	const [bookingsCount, setBookingsCountsByCompany] = useState<
		number[]
	>([]);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const fetchedEventCountsByCompany = await getCompanyEventCount(year);
				const fetchedFinishedCountsByCompany =
					await getFinishedCountCompany(year);
				const fetchedBookingsByCompany =
					await getBookingsCountCompany(year);

					setEventCountsByCompany(fetchedEventCountsByCompany);
					setFinishedCountsByCompany(
						fetchedFinishedCountsByCompany,
				);
				setBookingsCountsByCompany(fetchedBookingsByCompany);
			} catch (error) {
				console.error("Error fetching company stats", error);
			}
		};

		fetchStats();
	}, [year]);

	return {
		eventsCount,
		finishedCount,
		bookingsCount,
	};
};
