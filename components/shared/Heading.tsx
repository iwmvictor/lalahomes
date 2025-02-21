interface Props {
	children: string;
	className?: string;
}

export function H1({ children, className }: Props) {
	return (
		<h1 className={`text-3xl font-bold text-blue-950 ${className}`}>
			{children}
		</h1>
	);
}

export function H2({ children, className }: Props) {
	return (
		<h1 className={`text-2xl font-bold text-blue-900 ${className}`}>
			{children}
		</h1>
	);
}

export function H3({ children, className }: Props) {
	return (
		<h1 className={`text-xl font-bold text-blue-900 ${className}`}>
			{children}
		</h1>
	);
}
