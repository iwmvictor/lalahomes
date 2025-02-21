"use client";
import PageContent from "@/components/shared/PageContent";
import Section from "@/components/shared/Section";
import TextBox from "@/components/ui/TextBox";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { CreateEventSchema } from "@/constants/event.schema";
import { createEvent, updateEvent } from "@/services/event";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, useMutation } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import type z from "zod";
import "react-quill/dist/quill.snow.css";
import type { IEvent } from "@/types/index";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


type EventFormProps = {
	isLoading: boolean;
	isUpdate?: boolean;
	defaults?: Partial<IEvent>;
};

export default function CreateEventForm({
	isLoading,
	isUpdate,
	defaults,
}: EventFormProps) {
	const { toast } = useToast();
	const queryClient = new QueryClient();
	const [formLoading, setFormLoading] = useState(false);

	const form = useForm<z.infer<typeof CreateEventSchema>>({
		resolver: zodResolver(CreateEventSchema),
		defaultValues: {
			title: defaults?.title || "",
			location: defaults?.location || "",
			description: defaults?.description || "",
			bookingDeadline: defaults?.bookingDeadline || "",
			availableSeats: defaults?.availableSeats || "",
		},
	});


	const mutation = useMutation({
		mutationFn: (data: {
			title: string;
			location: string;
			description: string;
			bookingDeadline: string;
			availableSeats: number;
		}) =>
			isUpdate && defaults?.id
				? updateEvent(defaults.id, data)
				: createEvent(data),
		onSuccess: () => {
			toast({
				title: `Event ${isUpdate ? "updated" : "created"}`,
				variant: "primary",
			});
			queryClient.invalidateQueries({ queryKey: ["EVENT"] });
			setFormLoading(false);
		},
		onError: () => {
			toast({
				title: `Failed to ${isUpdate ? "update" : "create"} Event`,
				variant: "destructive",
			});
			setFormLoading(false);
		},
	});

	const onSubmit: SubmitHandler<z.infer<typeof CreateEventSchema>> = async (
		data,
	) => {
		setFormLoading(true);
		mutation.mutate({
			title: data.title,
			location: data.location,
			description: data.description,
			bookingDeadline: data.bookingDeadline || "",
			availableSeats: data.availableSeats,
		});
	};

	return (
		<PageContent>
			<div className="space-y-6">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-semibold">
						{isUpdate ? "Update Event" : "Create Event"}
					</h1>
					<Link href="/events">
						<Button variant="ghost">
							<ArrowLeftIcon className="w-5 h-5 text-gray-700" />
						</Button>
					</Link>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<Section title="Event Info">
							<div className="grid md:grid-cols-2 gap-6">
								<TextBox
									control={form.control}
									name="title"
									type="text"
									placeholder="Title"
									label="Title"
								/>
								<TextBox
									control={form.control}
									name="location"
									type="text"
									placeholder="Location"
									label="Location"
								/>
								<TextBox
									control={form.control}
									name="bookingDeadline"
									type="datetime-local"
									placeholder="Application Deadline"
									label="Booking Deadline"
								/>
								<TextBox
									control={form.control}
									name="availableSeats"
									type="text"
									placeholder="200"
									label="Available Seats"
								/>

							</div>
						</Section>

						<Section title="Description">
							<FormField
								control={form.control}
								name="description"
								render={() => (
									<div>
										<FormControl>
											<Controller
												name="description"
												control={form.control}
												render={({ field }) => (
													<div className="border rounded-lg overflow-hidden">
														<ReactQuill {...field} className="h-48" />
													</div>
												)}
											/>
										</FormControl>
										<FormMessage />
									</div>
								)}
							/>
						</Section>

						<div className="text-right">
							<Button type="submit" disabled={isLoading || formLoading}>
								{isLoading || formLoading
									? isUpdate
										? "Updating..."
										: "Creating..."
									: isUpdate
										? "Update"
										: "Create"}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</PageContent>
	);
}
