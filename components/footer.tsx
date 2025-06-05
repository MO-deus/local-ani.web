"use client"

export default function Footer() {
    return(
        <footer className="bg-gray-800 py-6">
				<div className="container mx-auto text-center">
					<p className="text-sm">
						© {new Date().getFullYear()} LocalANi. All rights reserved.
					</p>
					<div className="flex justify-center space-x-4 mt-4">
						<a href="#" className="hover:underline">
							Privacy Policy
						</a>
						<a href="#" className="hover:underline">
							Terms of Service
						</a>
						<a href="#" className="hover:underline">
							Contact Us
						</a>
					</div>
				</div>
			</footer>
    )
}