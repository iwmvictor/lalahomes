"use client";
import type { IRole } from "@/constants/roles";
import type { TokenPayload } from "@/constants/types";
import { useSession } from "next-auth/react";
import React, { type PropsWithChildren, type FC } from "react";

interface CmpGuardProps extends PropsWithChildren {
	roles: IRole[];
}
const CmpGuard: FC<CmpGuardProps> = ({ children, roles }) => {
	const { status, data } = useSession();
	const payloadData = data as TokenPayload;
	const hasRequiredRoles = (): boolean => {
		return roles.some((element) => payloadData.user.roles.includes(element));
	};
	return <>{status === "authenticated" && hasRequiredRoles() && children}</>;
};

export default CmpGuard;
