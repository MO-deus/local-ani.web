"use client";

import { useState } from "react";
import { Search, LogIn, Menu, X } from "lucide-react"; // Icons from lucide-react
import { Input } from "@/components/ui/input"; // ShadCN Input component

export default function Navbar() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [search, setSearch] = useState("");

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Search for:", search);
	};

	const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

	return (
		<>
			{/* Navbar */}
			<nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
				<div className="container mx-auto px-4 flex items-center justify-between py-4">
					{/* Logo */}
					<div className="text-2xl font-bold">
						<a href="/" className="hover:text-gray-400 transition-colors">
							LocalAni
						</a>
					</div>

					{/* Desktop Navigation */}
					<ul className="hidden lg:flex space-x-6">
						{[
							"Genres",
							"Types",
							"Updated",
							"Popular",
							"Upcoming",
							"Ongoing",
							"Completed",
							"Schedule",
							"Random",
						].map((item) => (
							<li key={item}>
								<a
									href={`/${item.toLowerCase()}`}
									className="hover:text-gray-400 transition-colors"
								>
									{item}
								</a>
							</li>
						))}
					</ul>

					{/* Search Bar */}
					<div className="hidden lg:flex items-center space-x-2">
						<form
							onSubmit={handleSearch}
							className="flex items-center border border-gray-700 rounded-md overflow-hidden"
						>
							<Input
								type="text"
								placeholder="Search anime..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="w-48 bg-gray-800 text-white border-none focus:ring-0 focus:outline-none"
							/>
							<button
								type="submit"
								className="p-2 bg-gray-700 hover:bg-gray-600 text-gray-300"
							>
								<Search className="h-5 w-5" />
							</button>
						</form>
					</div>

					{/* Sign-In Button */}
					<div className="hidden lg:flex">
						<button
							type="button"
							className="flex items-center space-x-2 p-2 bg-green-600 hover:bg-green-700 rounded-md text-sm transition-colors"
						>
							<LogIn className="h-5 w-5" />
							<span>Sign In</span>
						</button>
					</div>

					{/* Hamburger Menu for Mobile */}
					<button
						type="button"
						onClick={toggleSidebar}
						className="lg:hidden p-2 bg-gray-800 rounded-md hover:bg-gray-700"
					>
						<Menu className="h-6 w-6" />
					</button>
				</div>
			</nav>

			{/* Sidebar */}
			<aside
				className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				} transition-transform z-50`}
			>
				<div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
					<div className="text-xl font-bold">AnimeStream</div>
					<button
						type="button"
						onClick={toggleSidebar}
						className="p-2 bg-gray-800 rounded-md hover:bg-gray-700"
					>
						<X className="h-6 w-6" />
					</button>
				</div>
				<ul className="space-y-4 p-4">
					{[
						"Genres",
						"Types",
						"Updated",
						"Popular",
						"Upcoming",
						"Ongoing",
						"Completed",
						"Schedule",
						"Random",
					].map((item) => (
						<li key={item}>
							<a
								href={`/${item.toLowerCase()}`}
								className="block py-2 px-4 rounded-md hover:bg-gray-800 transition"
							>
								{item}
							</a>
						</li>
					))}
				</ul>
				<div className="p-4">
					<form
						onSubmit={handleSearch}
						className="flex items-center space-x-2 mb-4"
					>
						<Input
							type="text"
							placeholder="Search anime..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="w-full bg-gray-800 text-white border-none focus:ring-0 focus:outline-none"
						/>
						<button
							type="submit"
							className="p-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md"
						>
							<Search className="h-5 w-5" />
						</button>
					</form>
					<button
						type="button"
						className="flex items-center space-x-2 w-full p-2 bg-green-600 hover:bg-green-700 rounded-md text-sm transition-colors"
					>
						<LogIn className="h-5 w-5" />
						<span>Sign In</span>
					</button>
				</div>
			</aside>

			{/* Overlay for Sidebar */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-40"
					onClick={toggleSidebar}
					onKeyDown={(event) => {
						if (event.key === "Enter" || event.key === " ") {
							toggleSidebar();
						}
					}}
				/>
			)}
		</>
	);
}
