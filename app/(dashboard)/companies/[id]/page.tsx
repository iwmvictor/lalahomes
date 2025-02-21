"use client";

import CompanyForm from "@/components/companies/CompanyForm";
import { getCompany } from "@/services/companies";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const EditCompanyPage = () => {
	const { id } = useParams();
	const { data, isLoading } = useQuery({
		queryKey: ["COMPANY", id],
		queryFn: () => getCompany(id as string),
	});
	return (
		<div>
			{data && (
				<CompanyForm isLoading={isLoading} isUpdate={true} defaults={data} />
			)}
		</div>
	);
};
export default EditCompanyPage;
