"use client";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TopMenus from "./MenusLinks/TopMenus";
import { bottomMenu } from "./menus";

const Sidebar = () => {
	const currentRoute = usePathname();

	return (
		<div>
			<div className="z-20 hidden h-screen bg-primary md:flex md:w-72 md:flex-col">
				<div className="top-0 flex flex-col flex-grow h-screen overflow-hidden no-scrollbar">
					<div className="flex flex-col h-screen py-9">
						<Image
							src="/ngirologo1.png"
							alt=""
							width={200}
							height={200}
							className="ml-7 pb-8"
						/>
						<nav className="flex flex-col flex-1 h-full px-4">
							<TopMenus />

							<div className="mt-10 mb-40">
								<div className="mb-5 border-t border-primary-foreground" />
								{bottomMenu.map((menu) => (
									<Link
										key={menu.name}
										href={menu.href}
										className={classNames(
											currentRoute?.includes(menu.href)
												? "bg-primary-foreground text-primary"
												: "text-white",
											"group rounded-md py-2 px-2 flex items-center text-sm ",
										)}
									>
										<menu.icon
											className={classNames(
												currentRoute?.includes(menu.href) ? "text-prim	" : "",
												"mr-3 flex-shrink-0 h-6 w-6",
											)}
											aria-hidden="true"
										/>
										{menu.name}
									</Link>
								))}
							</div>
						</nav>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
