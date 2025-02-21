// /home/happi/Project/Event-management-nextJs/components/CompanyForm.tsx

"use client";
import PageContent from "@/components/shared/PageContent";
import Section from "@/components/shared/Section";
import TextBox from "@/components/ui/TextBox";
import { Button } from "@/components/ui/button";
import {
	Form,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import {
	CreateCompanySchema,
	UpdateCompanySchema,
} from "@/constants/company.schema";
import type { ICompanyFullInfo } from "@/constants/types";
import { createCompany, updateCompany } from "@/services/companies";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import type React from "react";
import { type FC, useRef } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import type { z } from "zod";

interface CompanyFormProps {
	isUpdate?: boolean;
	defaults?: ICompanyFullInfo;
	isLoading?: boolean;
}

const CompanyForm: FC<CompanyFormProps> = (props) => {
	const formRef = useRef(null);
	const { toast } = useToast();
	const client = useQueryClient();

	const defaultValues = props.isUpdate
		? {
				company: {
					name: props.defaults?.company.name || "",
					address: props.defaults?.company.address || "",
					email: props.defaults?.company.email || "",
					phoneNumber: props.defaults?.company.phoneNumber || "",
				},
				contactPerson: {
					firstName: props.defaults?.contactPerson.firstName || "",
					lastName: props.defaults?.contactPerson.lastName || "",
					email: props.defaults?.contactPerson.email || "",
					phoneNumber: props.defaults?.contactPerson.phoneNumber || "",
				},
			}
		: {
				company: {
					name: "",
					address: "",
					email: "",
					phoneNumber: "",
				},
				contactPerson: {
					firstName: "",
					lastName: "",
					email: "",
					phoneNumber: "",
				},
			};

	const formSchema = props.isUpdate ? UpdateCompanySchema : CreateCompanySchema;
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	const mutation = useMutation({
		mutationFn: createCompany,
		onSuccess: () => {
			toast({
				title: "Company created",
				variant: "primary",
			});
			client.invalidateQueries({
				queryKey: ["COMPANIES"],
			});
		},
		onError: () => {
			toast({
				title: "Failed to create company",
				variant: "destructive",
			});
		}
	});
	const updateCompanyMutation = useMutation({
		mutationFn: (formData: { company: any; contactPerson: any }) =>
			updateCompany(formData, props.defaults?.company.id as string),
		onSuccess: () => {
			toast({
				title: "Company Updated!",
				variant: "primary",
			});
			client.invalidateQueries({
				queryKey: ["COMPANIES"],
			});
		},
		onError: () => {
			toast({
				title: "Failed to update company",
				variant: "destructive",
			});
		}
	});
	const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
		const formData = {
			company: {
				name: data.company.name,
				address: data.company.address ?? "",
				email: data.company.email,
				phoneNumber: data.company.phoneNumber ?? "",
			},
			contactPerson: {
				firstName: data.contactPerson.firstName,
				lastName: data.contactPerson.lastName,
				email: data.contactPerson.email,
				phoneNumber: data.contactPerson.phoneNumber ?? "",
			}
		};

		if (props.isUpdate && props.defaults) {
			updateCompanyMutation.mutate(formData);
		} else {
			mutation.mutate(formData);
		}
	};

	return (
		<PageContent>
			<div className="space-y-4">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-xl font-semibold">
						{props.isUpdate ? "Update company Info" : "Add new company"}
					</h1>
					<Link href="/companies">
						<Button variant="ghost">
							<ArrowLeftIcon className="w-5 h-5 text-gray-700" />
						</Button>
					</Link>
				</div>
				{((props.isUpdate && props.defaults) || !props.isUpdate) && (
					<Form {...form}>
						<form
							ref={formRef}
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-4"
						>
							<Section title="Company Info">
								<div className="grid md:grid-cols-2 gap-4">
									<TextBox
										label="Company Name"
										type="text"
										name="company.name"
										placeholder="Company Inc"
										control={form.control}
									/>
									<TextBox
										label="Address"
										type="text"
										name="company.address"
										placeholder="Kicukiro, Kigali"
										control={form.control}
									/>
									<TextBox
										label="Email"
										type="email"
										name="company.email"
										placeholder="companyinc@gmail.com"
										control={form.control}
									/>
									<TextBox
										label="Phone"
										type="text"
										name="company.phoneNumber"
										placeholder="+250728858833"
										control={form.control}
									/>
								</div>
							</Section>
							<Section title="Contact Person">
								<div className="grid md:grid-cols-2 gap-4">
									<TextBox
										label="First name"
										type="text"
										name="contactPerson.firstName"
										placeholder="John"
										control={form.control}
									/>
									<TextBox
										label="Last Name"
										type="text"
										name="contactPerson.lastName"
										placeholder="Doe"
										control={form.control}
									/>
									<TextBox
										label="Email"
										type="email"
										name="contactPerson.email"
										placeholder="johndoe@domain.com"
										control={form.control}
									/>
									<TextBox
										label="Phone"
										type="text"
										name="contactPerson.phoneNumber"
										placeholder="+250728858833"
										control={form.control}
									/>
								</div>
							</Section>
							<div>
								<Button
									disabled={
										mutation.isPending || updateCompanyMutation.isPending
									}
									type="submit"
								>
									{mutation.isPending ? "Saving ..." : "Save company"}
								</Button>
							</div>
						</form>
					</Form>
				)}
			</div>
		</PageContent>
	);
};

export default CompanyForm;
