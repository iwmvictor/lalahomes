import type React from "react";

interface ConfirmationModalProps {
	show: boolean;
	onClose: () => void;
	onConfirm: () => void;
	message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	show,
	onClose,
	onConfirm,
	message,
}) => {
	if (!show) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-4 rounded shadow-lg max-w-sm w-full">
				<h2 className="text-xl font-semibold mb-4">Confirm</h2>
				<p>{message}</p>
				<div className="flex justify-end space-x-4 mt-4">
					<button
						type="button"
						className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
						onClick={onClose}
					>
						Cancel
					</button>
					<button
						type="button"
						className="px-4 py-2 bg-blue-900 text-white rounded"
						onClick={onConfirm}
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;
