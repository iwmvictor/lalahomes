"use client";
import { LoginForm } from "@/components/Login/loginForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
const SignInPage = () => {
	const { status } = useSession();

	if (status === "authenticated") {
		redirect("/welcome");
	}
	return (
		<div className="bg-blue-100 flex items-center justify-center h-screen">
			<div className="flex flex-col lg:flex-row w-full">
				<div className="h-screen lg:w-1/2 bg-blue-900 p-8 text-white flex flex-col justify-center items-center">
					<div className="text-center">
						<h2 className="text-3xl font-semibold mb-4">
							Welcome to Event Management
						</h2>
						<p className="text-lg mb-8">
							Manage your events with ease
						</p>
						<p className="text-lg">
							Already have an account? Login below
						</p>
					</div>
				</div>
				<LoginForm />
			</div>
		</div>
	);
};

export default SignInPage;
