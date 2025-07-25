"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import TopPerformers from "@/components/shared/top-performers";
import { useDebounce } from "react-use";

export default function Leaderboard() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    500,
    [searchTerm]
  );

  return (
    <div className="p-4">
      <h2 className="text-3xl font-medium text-neutral-600">Leaderboard 👑</h2>
      <div className="max-w-md mr-auto my-4">
        <div className="flex justify-center items-center px-4 rounded-lg border shadow-xs">
          <Search size={16} className="text-neutral-600" />
          <Input
            placeholder="Search top performers by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-0 focus:border-0 focus:outline-none focus-visible:ring-0"
          />
        </div>
      </div>
      <TopPerformers searchTerm={debouncedSearchTerm} />
    </div>
  );
}
