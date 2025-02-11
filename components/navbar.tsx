"use client";

import { useState } from "react";
import { Search, LogIn, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";

const genres = [
  "Action", "Adventure", "Cars", "Comedy", "Dementia", "Demons", "Drama",
  "Ecchi", "Fantasy", "Game", "Harem", "Historical", "Horror", "Isekai",
  "Josei", "Kids", "Magic", "Martial Arts", "Mecha", "Military", "Music",
  "Mystery", "Parody", "Police", "Psychological", "Romance", "Samurai",
  "School", "Sci-Fi", "Seinen", "Shoujo", "Shoujo Ai", "Shounen",
  "Shounen Ai", "Slice of Life", "Space", "Sports", "Super Power",
  "Supernatural", "Thriller", "Unknown", "Vampire",
];

const types = ["MOVIE", "MUSIC", "ONA", "OVA", "SPECIAL", "TV"];

const navigation = [
  { label: "Genres", dropdown: genres },
  { label: "Types", dropdown: types },
  { label: "Updated" },
  { label: "Popular" },
  { label: "Upcoming" },
  { label: "Ongoing" },
  { label: "Completed" },
  { label: "Schedule" },
  { label: "Random" },
];

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDropdownNavbar, setActiveDropdownNavbar] = useState<string | null>(null);
  const [activeDropdownSidebar, setActiveDropdownSidebar] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search for:", search);
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const toggleDropdownSidebar = (label: string) => {
    setActiveDropdownSidebar((prev) => (prev === label ? null : label));
  };

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
          <ul className="hidden lg:flex space-x-6 items-center">
            {navigation.map(({ label, dropdown }) => (
              <li
                key={label}
                className="relative"
                onMouseEnter={() => dropdown && setActiveDropdownNavbar(label)}
                onMouseLeave={() => dropdown && setActiveDropdownNavbar(null)}
              >
                <a
                  href={dropdown ? "#" : `/${label.toLowerCase()}`}
                  className="hover:text-gray-400 transition"
                >
                  {label}
                </a>
                {dropdown && activeDropdownNavbar === label && (
                  <div className="absolute top-[calc(100%)] left-0 bg-gray-800 rounded-md shadow-lg p-4 w-max z-20">
                    <div
                      className={`${
                        label === "Genres"
                          ? "grid grid-cols-3 gap-4"
                          : "space-y-2"
                      }`}
                    >
                      {dropdown.map((item) => (
                        <a
                          key={item}
                          href={`/${label.toLowerCase()}/${item
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="block text-sm hover:text-gray-300"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
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
          {navigation.map(({ label, dropdown }) => (
            <li key={label}>
              <button
              type="button"
                onClick={() => toggleDropdownSidebar(label)}
                className="flex items-center justify-between w-full py-2 px-4 rounded-md hover:bg-gray-800"
              >
                <span>{label}</span>
                {dropdown && activeDropdownSidebar === label ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  dropdown && <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {dropdown && activeDropdownSidebar === label && (
                <ul className="ml-4 mt-2 space-y-2">
                  {dropdown.map((item) => (
                    <li key={item}>
                      <a
                        href={`/${label.toLowerCase()}/${item
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="block text-sm hover:text-gray-300"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Overlay for Sidebar */}
      {isSidebarOpen && (
        <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={toggleSidebar}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            toggleSidebar();
          }
        }}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
        tabIndex={0}
      />
      )}
    </>
  );
}