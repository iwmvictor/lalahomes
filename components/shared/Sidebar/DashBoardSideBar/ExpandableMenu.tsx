"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC, useState } from "react";
import type { ExpandableMenu } from "./menus";

interface props {
	menuItem: ExpandableMenu;
}
const ExpandableMenuCmp: FC<props> = ({ menuItem }) => {
	const currentRoute = usePathname();
	const [open, setOpen] = useState<boolean>(false);
	return (
		<span
			key={menuItem.name}
			onClick={() => setOpen(!open)}
			className={classNames(
				currentRoute.includes(menuItem.href)
					? "bg-gray-100 text-primary"
					: "text-gray-600 hover:bg-gray-50 hover:text-primary",
				"group rounded-md py-2 px-2 flex items-center text-sm font-medium cursor-pointer justify-between flex-wrap",
			)}
		>
			<div className="flex">
				<menuItem.icon
					className={classNames(
						currentRoute.includes(menuItem.href)
							? "text-primary"
							: "text-gray-400 group-hover:text-primary",
						"mr-3 flex-shrink-0 h-6 w-6",
					)}
					aria-hidden="true"
				/>
				{menuItem.name}
			</div>
			<ChevronDownIcon className={classNames("h-5 w-5")} />
			<div className={classNames("w-full p-0 m-0", open ? "block" : "hidden")}>
				{menuItem.items.map((submenu) => (
					<Link
						key={submenu.name}
						href={submenu.href}
						className={classNames(
							currentRoute === submenu.href
								? "bg-gray-100 text-primary"
								: "text-gray-600 hover:bg-gray-50 hover:text-primary",
							"group rounded-md py-2 px-2 flex items-center text-sm font-medium",
						)}
					>
						<div className="w-6 mr-1" />
						{submenu.name}
					</Link>
				))}
			</div>
		</span>
	);
};

export default ExpandableMenuCmp;
