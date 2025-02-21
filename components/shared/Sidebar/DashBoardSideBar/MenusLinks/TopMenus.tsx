"use client";
import type { IRole } from "@/constants/roles";
import type { TokenPayload } from "@/constants/types";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";
import { mainMenu, subMenus } from "../menus";

const TopMenus = () => {
	const currentRoute = usePathname();
	const [showWebsiteSubMenus, setshowWebsiteSubMenus] = useState(false);
	const { data } = useSession();
	const userInfo = data as TokenPayload;

	const hasRequiredRoles = (requiredRoles: IRole[]): boolean => {
		return requiredRoles.some((element) =>
			userInfo.user.roles?.includes(element),
		);
	};
	return (
		<div>
			{mainMenu.map((menu) => (
				<Fragment key={menu.name}>
					{((menu.roles && hasRequiredRoles(menu.roles)) || !menu.roles) && (
						<div>
							{!menu.isCollapsible ? (
								<Link
									href={menu.href}
									className={classNames(
										currentRoute?.includes(menu.href)
											? "bg-primary-foreground"
											: "",
										"group rounded-md py-2 px-2 flex items-center text-sm",
									)}
								>
									<menu.icon
										className={classNames(
											currentRoute?.includes(menu.href)
												? "text-primary"
												: "text-primary-foreground",
											"mr-3 flex-shrink-0 h-6 w-6",
										)}
										aria-hidden="true"
									/>
									<div
										className={classNames(
											currentRoute?.includes(menu.href)
												? "text-primary"
												: "text-primary-white",
										)}
									>
										{menu.name}
									</div>
								</Link>
							) : (
								<div
									onClick={() => {
										setshowWebsiteSubMenus(!showWebsiteSubMenus);
									}}
									className={classNames(
										currentRoute?.includes(menu.href)
											? "bg-primary-foreground"
											: "",
										"group rounded-md py-2 px-2 flex items-center text-sm text-white hover:cursor-pointer",
									)}
								>
									<menu.icon
										className={classNames(
											currentRoute?.includes(menu.href) ? "text-primary" : "",
											"mr-3 flex-shrink-0 h-6 w-6",
										)}
										aria-hidden="true"
									/>
									{menu.name}
									{showWebsiteSubMenus ? (
										<ChevronUpIcon className="w-5 h-5 ml-8" />
									) : (
										<ChevronDownIcon className="w-5 h-5 ml-8" />
									)}
								</div>
							)}
							<div
								className={
									showWebsiteSubMenus
										? "visible transition ease-linear duration-1000"
										: "invisible"
								}
							>
								{subMenus
									.filter(
										(submenu) => submenu.parent === menu.name.toLowerCase(),
									)
									.map((submenu) => (
										<Link
											key={submenu.name}
											href={submenu.href}
											className={classNames(
												currentRoute?.includes(submenu.href)
													? "bg-blue-accent"
													: "",
												"group rounded-md ml-4 py-2 px-2 flex items-center text-sm text-white",
											)}
										>
											<submenu.icon
												className={classNames(
													currentRoute?.includes(submenu.href)
														? "text-primary"
														: "group-hover:text-white",
													"mr-5 flex-shrink-0 flex-wrap h-6 w-6",
												)}
												aria-hidden="true"
											/>
											<div
												className={classNames(
													currentRoute?.includes(submenu.href)
														? "text-primary-"
														: "text-white",
												)}
											>
												{submenu.name}
											</div>
										</Link>
									))}
							</div>
						</div>
					)}
				</Fragment>
			))}
		</div>
	);
};

export default TopMenus;
