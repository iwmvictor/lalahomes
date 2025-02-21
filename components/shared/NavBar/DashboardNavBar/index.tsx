import { Menu, Transition } from "@headlessui/react";
import { BellIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import React, { Fragment} from "react";
import { MenuIcon } from "../../CustomIcons";

const DashboardNavBar = ({
	sidebarOpen,
	setSidebarOpen,
}: {
	sidebarOpen: boolean;
	// eslint-disable-next-line no-unused-vars
	setSidebarOpen: (_x: boolean) => void;
}) => {
	const { data } = useSession();

	const handleLogout = () => {
		signOut({ callbackUrl: "/" });
	};


	return (
		<div className="z-10 flex flex-shrink-0 h-16 bg-white border-b">
			<div className="flex justify-end flex-1 px-4 md:px-8">
				<div className="flex items-center ml-4 md:ml-6">
					{/* Notification Icon */}
					<div className="relative ml-4">
						<button
							type="submit"
							className="relative flex items-center text-gray-500"
						>
							<BellIcon type="submit" className="w-6 h-6" aria-hidden="true" />
						</button>
					</div>
					<Menu as="div" className="relative">
						<div>
							<Menu.Button className="flex items-center max-w-xs text-sm bg-primary p-3 text-white rounded-full ml-3">
								<div className="flex items-center px-2">
									<h4 className="mr-3">{data?.user?.name}</h4>
									<ChevronDownIcon className="w-5 h-5" aria-hidden="true" />
								</div>
							</Menu.Button>
						</div>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
								<Menu.Item>
									{({ active }) => (
										<button
											type="button"
											onClick={handleLogout}
											className={`${
												active ? "bg-gray-100" : ""
											} block py-2 px-4 text-sm text-gray-700 w-full text-left`}
										>
											Logout
										</button>
									)}
								</Menu.Item>
							</Menu.Items>
						</Transition>
					</Menu>
				</div>
			</div>
			<button
				title="sidebar"
				type="button"
				className="px-4 text-gray-500 border-r outline-none border-gray-200 focus:outline-none lg:hidden"
				onClick={() => setSidebarOpen(!sidebarOpen)}
			>
				<MenuIcon />
			</button>
		</div>
	);
};

export default DashboardNavBar;
