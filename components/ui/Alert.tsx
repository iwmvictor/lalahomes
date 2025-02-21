import React, { type PropsWithChildren } from "react";

const Alert = ({ children }: PropsWithChildren) => {
	return <p className="text-red-400 p-2 bg-red-50">{children}</p>;
};

export default Alert;
