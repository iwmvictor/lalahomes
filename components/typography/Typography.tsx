import type { FC, JSX, ReactNode } from "react";

interface TypographyProps {
	variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	children: ReactNode;
	className?: string;
	centered?: boolean;
}

const Typography: FC<TypographyProps> = ({
	variant = "h2",
	children,
	className,
	centered = false,
}) => {
	const Tag = variant as keyof JSX.IntrinsicElements;
	const sizeClasses = {
		h1: "text-5xl",
		h2: "text-4xl",
		h3: "text-3xl",
		h4: "text-2xl",
		h5: "text-xl",
		h6: "text-lg",
	};

	return (
		<Tag
			className={`scroll-m-20 font-semibold tracking-tight first:mt-0 ${
				sizeClasses[variant] || ""
			} ${className || ""} ${centered ? " w-full text-center" : ""}`}
		>
			{children}
		</Tag>
	);
};

export default Typography;
