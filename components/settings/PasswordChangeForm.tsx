import Alert from "@/components/ui/Alert";
import TextBox from "@/components/ui/TextBox";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { resetPasswordSchema } from "@/constants/login";
import type { TResetPasswordSchema } from "@/services/auth";
import { forgot_password, reset_password } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const PasswordChangeForm: React.FC = () => {
	const { toast } = useToast();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | undefined>(undefined);
	const [otpRequested, setOtpRequested] = useState(false);
	const userEmail = "user@example.com";

	const resetForm = useForm<TResetPasswordSchema>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			otp: "",
			email: userEmail,
			newPassword: "",
		},
	});

	// Handle email change request and send OTP
	const handleEmailChangeRequest = async () => {
		setLoading(true);
		setError(undefined);
		try {
			await forgot_password({ email: resetForm.getValues("email") });
			setOtpRequested(true);
			toast({
				title: "OTP Sent",
				description: "OTP sent to your email for verification.",
				variant: "primary",
			});
		} catch (err) {
			setError("Failed to send OTP. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleResetPassword = async (data: TResetPasswordSchema) => {
		setLoading(true);
		setError(undefined);
		try {
			await reset_password(data);
			resetForm.reset();
			toast({
				title: "Success",
				description: "Password changed successfully!",
				variant: "primary",
			});
		} catch (err) {
			setError("Failed to reset password.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h2 className="text-2xl font-semibold mb-4">Change Password</h2>
			{error && <Alert>{error}</Alert>}
			<Form {...resetForm}>
				{!otpRequested ? (
					// OTP Request Form
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleEmailChangeRequest();
						}}
						className="space-y-4"
					>
						<TextBox
							label="Email"
							type="text"
							name="email"
							placeholder="Enter your email"
							control={resetForm.control}
						/>
						<Button
							type="button"
							onClick={handleEmailChangeRequest}
							disabled={loading}
						>
							{!loading ? "Request OTP for Email Change" : "Sending..."}
						</Button>
					</form>
				) : (
					// Password Reset Form
					<form
						onSubmit={resetForm.handleSubmit(handleResetPassword)}
						className="space-y-4"
					>
						<TextBox
							label="Email"
							type="text"
							name="email"
							placeholder="Enter your email"
							control={resetForm.control}
						/>
						<TextBox
							label="OTP"
							type="text"
							name="otp"
							placeholder="Enter OTP"
							control={resetForm.control}
						/>
						<TextBox
							label="New Password"
							type="password"
							name="newPassword"
							placeholder="Enter new password"
							control={resetForm.control}
						/>
						<Button
							disabled={
								!!(
									resetForm.formState.errors.otp ||
									resetForm.formState.errors.email ||
									resetForm.formState.errors.newPassword
								) || loading
							}
							type="submit"
						>
							{!loading ? "Change Password" : "Loading..."}
						</Button>
					</form>
				)}
			</Form>
		</div>
	);
};

export default PasswordChangeForm;
