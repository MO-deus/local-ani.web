"use client";

import { useState } from "react";
import { Search, LogIn, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";

const genres = [
  "Action",
  "Adventure",
  "Cars",
  "Comedy",
  "Dementia",
  "Demons",
  "Drama",
  "Ecchi",
  "Fantasy",
  "Game",
  "Harem",
  "Historical",
  "Horror",
  "Isekai",
  "Josei",
  "Kids",
  "Magic",
  "Martial Arts",
  "Mecha",
  "Military",
  "Music",
  "Mystery",
  "Parody",
  "Police",
  "Psychological",
  "Romance",
  "Samurai",
  "School",
  "Sci-Fi",
  "Seinen",
  "Shoujo",
  "Shoujo Ai",
  "Shounen",
  "Shounen Ai",
  "Slice of Life",
  "Space",
  "Sports",
  "Super Power",
  "Supernatural",
  "Thriller",
  "Unknown",
  "Vampire",
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
  const [activeDropdownNavbar, setActiveDropdownNavbar] = useState<
    string | null
  >(null);
  const [activeDropdownSidebar, setActiveDropdownSidebar] = useState<
    string | null
  >(null);
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search for:", search);
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleDropdownSidebar = (label: string) =>
    setActiveDropdownSidebar((prev) => (prev === label ? null : label));

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 text-white shadow-lg sticky top-0 z-50 font-mono">
        <div className="container mx-auto px-4 flex items-center justify-between py-4">
          {/* Logo */}
          <div className="text-3xl font-bold tracking-wider drop-shadow-glow text-pink-100">
            <a href="/" className="hover:text-pink-300 transition">
              LocalAni
            </a>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex space-x-6 items-center text-sm font-semibold">
            {navigation.map(({ label, dropdown }) => (
              <li
                key={label}
                className="relative"
                onMouseEnter={() => dropdown && setActiveDropdownNavbar(label)}
                onMouseLeave={() => dropdown && setActiveDropdownNavbar(null)}
              >
                <a
                  href={dropdown ? "#" : `/${label.toLowerCase()}`}
                  className="hover:text-pink-200 transition"
                >
                  {label}
                </a>
                {dropdown && activeDropdownNavbar === label && (
                  <div className="absolute top-full left-0  bg-gray-900 bg-opacity-90 backdrop-blur-lg rounded-xl shadow-lg p-4 z-30 text-white border border-pink-500">
                    <div
                      className={`${
                        label === "Genres"
                          ? "grid grid-cols-3 gap-4 w-[28rem] max-h-[32rem] overflow-y-auto"
                          : "grid grid-cols-2 gap-3 w-60"
                      }`}
                    >
                      {dropdown.map((item) => (
                        <a
                          key={item}
                          href={`/${label.toLowerCase()}/${item
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="hover:text-pink-300 text-sm"
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

          {/* Search */}
          <div className="hidden lg:flex items-center">
            <form
              onSubmit={handleSearch}
              className="flex items-center border border-pink-400 rounded-lg overflow-hidden bg-black/20"
            >
              <Input
                type="text"
                placeholder="Search anime..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-white border-none focus:outline-none w-48"
              />
              <button
                type="submit"
                className="p-2 bg-pink-600 hover:bg-pink-700 text-white"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Sign In */}
          <div className="hidden lg:flex">
            <button className="flex items-center space-x-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-md text-white text-sm shadow-md transition">
              <LogIn className="w-5 h-5" />
              <span>Sign In</span>
            </button>
          </div>

          {/* Mobile Menu */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 bg-pink-600 hover:bg-pink-700 rounded-md"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-pink-800 via-purple-700 to-indigo-800 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform z-50 shadow-lg border-r border-pink-400 backdrop-blur-xl`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-pink-300">
          <div className="text-xl font-bold tracking-wide">LocalAni</div>
          <button
            onClick={toggleSidebar}
            className="p-2 bg-pink-700 hover:bg-pink-600 rounded-md"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <ul className="space-y-4 p-4 text-sm">
          {navigation.map(({ label, dropdown }) => (
            <li key={label}>
              <button
                onClick={() => toggleDropdownSidebar(label)}
                className="flex items-center justify-between w-full px-3 py-2 hover:bg-pink-600 rounded-md"
              >
                <span>{label}</span>
                {dropdown && (
                  <>
                    {activeDropdownSidebar === label ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </>
                )}
              </button>
              {dropdown && activeDropdownSidebar === label && (
                <ul className="ml-3 mt-2 space-y-1 text-pink-200">
                  {dropdown.map((item) => (
                    <li key={item}>
                      <a
                        href={`/${label.toLowerCase()}/${item
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="block hover:text-white"
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

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
          tabIndex={0}
          onKeyUp={(e) => e.key === "Enter" && toggleSidebar()}
        />
      )}
    </>
  );
}
