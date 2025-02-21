import type React from "react";
import PageContent from "../shared/PageContent";

const Loader: React.FC = () => {
	return (
		<PageContent>
			<div className="flex justify-center items-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
			</div>
		</PageContent>
	);
};

export default Loader;
