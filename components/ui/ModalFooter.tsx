import type React from "react";

interface ModalFooterProps {
	children: React.ReactNode;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ children }) => {
	return <div className="mt-4 flex justify-end">{children}</div>;
};

export default ModalFooter;
