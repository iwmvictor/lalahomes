import type React from "react";

interface ModalHeaderProps {
	children: React.ReactNode;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ children }) => {
	return <div className="text-lg font-semibold">{children}</div>;
};

export default ModalHeader;
