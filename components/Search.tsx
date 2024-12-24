"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter hook
import { Input } from "@/components/ui/input";

export function Search() {
  const [searchTerm, setSearchTerm] = useState(""); // Manage search input
  const router = useRouter(); // Get router instance

  // Handle key press for the input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`); // Navigate to /search with query
    }
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Search Anime"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
        onKeyDown={handleKeyDown} // Add key down event handler
        className="w-full"
      />
    </div>
  );
}
