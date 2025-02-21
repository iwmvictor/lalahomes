import React from "react";
import Typography from "../typography/Typography";
import {
	FaFacebookF,
	FaInstagram,
	FaLinkedinIn,
	FaTwitter,
	FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="bg-blue-900 py-10 px-5">
			<div className="container mx-auto text-white flex flex-col items-center space-y-6 md:space-y-0 md:flex-row md:justify-between">
				{/* Company Information */}
				<div className="text-center md:text-left">
					<Typography variant="h5" className="font-bold mb-2">
						Happi ltd
					</Typography>
					<p className="text-sm max-w-xs">
						Providing innovative solutions to meet your needs in Kigali and beyond. Dedicated to excellence and client satisfaction.
					</p>
				</div>

				{/* Contact Information */}
				<div className="text-center">
					<Typography variant="h6" className="font-semibold mb-2">
						Contact Us
					</Typography>
					<p>Kigali - Rwanda</p>
					<p>Phone: +250 784600762</p>
					<p>
						Email:{" "}
						<a
							href="mailto:gdushimimana6@gmail.com"
							className="text-yellow-500 underline hover:text-yellow-400"
						>
							gdushimimana6@gmail.com
						</a>
					</p>
				</div>

				{/* Social Media Links */}
				<div className="flex flex-col space-y-4">
							<h4 className="text-xl font-medium mb-4">Follow Us</h4>
							<div className="flex space-x-4">
								<a
									href="#"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-yellow"
								>
									<FaTwitter size={24} />
								</a>
								<a
									href="#"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-yellow"
								>
									<FaFacebookF size={24} />
								</a>
								<a
									href="#"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-yellow"
								>
									<FaLinkedinIn size={24} />
								</a>
								<a
									href="#"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-yellow"
								>
									<FaInstagram size={24} />
								</a>
								<a
									href="#"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-yellow"
								>
									<FaWhatsapp size={24} />
								</a>
							</div>
						</div>
			</div>

			{/* Footer Bottom */}
			<div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
				<p>&copy; {new Date().getFullYear()} Happi ltd. All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
