import { Dialog, Transition } from "@headlessui/react";
import type React from "react";
import { Fragment } from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	className?: string;
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	children,
	className,
}) => {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as="div"
				open={isOpen}
				onClose={onClose}
				className="fixed inset-0 z-50 overflow-y-auto"
			>
				<div className="flex items-center justify-center min-h-screen p-4 text-center">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Dialog.Panel
							className={`bg-white p-20 rounded-lg shadow-lg w-full max-w-2xl border border-black ${className}`}
						>
							{children}
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
};

export default Modal;
