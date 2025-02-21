"use client";
import PageContent from "@/components/shared/PageContent";
import type React from "react";
import { useState } from "react";
import PasswordChangeForm from "@/components/settings/PasswordChangeForm";

const SettingsPage: React.FC = () => {
	const [activeTab, setActiveTab] = useState<"account" | "password">("account");

	return (
		<PageContent>
			<div className="flex space-x-4 border-b-2 pb-2">
				<button
				type="button"
					onClick={() => setActiveTab("account")}
					className={`text-lg font-medium ${activeTab === "account" ? "border-b-2 border-blue-500" : ""}`}
				>
					Account Settings
				</button>
				<button
				type="button"
					onClick={() => setActiveTab("password")}
					className={`text-lg font-medium ${activeTab === "password" ? "border-b-2 border-blue-500" : ""}`}
				>
					Password Change
				</button>
			</div>
			<div className="pt-4">
				{activeTab === "password" ? (
					<PasswordChangeForm />
				) : (
					<div>Your account settings content here...</div>
				)}
			</div>
		</PageContent>
	);
};

export default SettingsPage;
