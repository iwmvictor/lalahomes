import React, { type PropsWithChildren, type FC } from "react";

interface SectionProps extends PropsWithChildren {
	title: string;
}
const Section: FC<SectionProps> = ({ children, title }) => {
	return (
		<div className="w-full p-5 border rounded-xl">
			<span className="text-base font-semibold">{title}</span>
			<div className="w-full mt-3">{children}</div>
		</div>
	);
};

export default Section;
