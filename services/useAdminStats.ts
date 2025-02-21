import {
	getCompanieCount,
	getUsersCount,
	getEventCount,
} from "@/services/stats";
import { useEffect, useState } from "react";

export const useAdminStats = (year: string) => {
	const [userCounts, setUsersCounts] = useState<number[]>([]);
	const [companyCounts, setCompanyCounts] = useState<number[]>([]);
	const [eventCounts, setEventCounts] = useState<number[]>([]);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const fetchedUserCounts = await getUsersCount(year);
				const fetchedCompanyCounts = await getCompanieCount(year);
				const fetchedEventCounts = await getEventCount(year);

				setUsersCounts(fetchedUserCounts);
				setCompanyCounts(fetchedCompanyCounts);
				setEventCounts(fetchedEventCounts);
			} catch (error) {
				console.error("Error fetching admin stats", error);
			}
		};

		fetchStats();
	}, [year]);

	return {
		userCounts,
		companyCounts,
		eventCounts,
	};
};
