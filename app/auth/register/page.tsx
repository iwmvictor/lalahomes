import Typography from "@/components/typography/Typography";
import Link from "next/link";
import React from "react";

const RegisterPage = () => {
	return (
		<div>
			<Typography centered variant="h4">
				RegisterPage
			</Typography>

			<Link href={"/auth/signin"}>Sign In</Link>
		</div>
	);
};

export default RegisterPage;
