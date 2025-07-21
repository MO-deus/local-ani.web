"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  SearchBarProps,
  SearchBarAnimeEntryItems,
} from "@/app/types/searchBarInput";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ISODateFormatToReadableFormat } from "@/lib/formateDate";

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  delay = 2000,
  placeholder = "Search Anime By Title",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(inputValue);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchBarAnimeEntryItems[]>([]);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => clearTimeout(handler);
  }, [inputValue, delay]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedValue.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      const data = await onSearch(debouncedValue);
      setResults(data?.data || []);
      setIsLoading(false);
    };

    fetchResults();
  }, [debouncedValue, onSearch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        // Clear input or hide dropdown
        setInputValue("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAnimeSelect = (id: number) => {
    setInputValue("");
    setResults([]);
    router.push(`anime/${id}`);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative hidden lg:flex flex-col items-center max-w-sm"
    >
      {/* Input field */}
      <div className="flex items-center w-full border border-pink-400 rounded-lg overflow-hidden bg-black/20">
        <Input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-transparent text-white border-none focus:outline-none w-full px-3"
        />
        <div className="p-2 bg-pink-600 hover:bg-pink-700 text-white cursor-pointer">
          <Search className="w-5 h-5" />
        </div>
      </div>

      {/* Results dropdown */}
      {inputValue.trim() && (
        <div className="absolute top-full mt-2 w-[200%] max-h-80 overflow-y-auto bg-gray-900 border border-pink-400 rounded-lg shadow-lg z-20">
          {isLoading ? (
            <div className="p-4 text-gray-400">Searching...</div>
          ) : results.length === 0 ? (
            <div className="p-4 text-gray-400">No results found</div>
          ) : (
            results.map((anime) => (
              <div
                key={anime.mal_id}
                className="flex gap-4 items-start p-3 hover:bg-gray-800 cursor-pointer"
                onClick={() => handleAnimeSelect(anime.mal_id)}
              >
                <Image
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  width={50}
                  height={70}
                  className="object-cover rounded-md flex-shrink-0"
                />
                <div className="flex flex-col justify-between">
                  <p className="text-white text-sm font-medium break-words">
                    {anime.title}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Aired:{" "}
                    {ISODateFormatToReadableFormat(anime.aired.from)
                      ? new Date(anime.aired.from).toLocaleDateString()
                      : "Unknown"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
