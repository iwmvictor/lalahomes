// import Header from "@/components/Header/Header";
import type { ReactNode } from "react";

export default function AuthLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return <div className="w-full">{children}</div>;
}
