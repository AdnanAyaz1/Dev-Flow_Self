"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function LocalSearch({ searchQuery }: { searchQuery: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (debouncedQuery) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("search", debouncedQuery);
        router.push(`?${params.toString()}`, { scroll: false });
      } else {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("search");
        router.push(`?${params.toString()}`, { scroll: false });
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [debouncedQuery, router, searchParams]);

  // Handle input changes and update the debounced query
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebouncedQuery(e.target.value); // Update debouncedQuery on input change
  };

  return (
    <div className="md:flex gap-4 p-[16px] border-[1px] rounded-lg border-light-700 bg-light-800 flex-1 dark:dark-gradient dark:border-none hidden self-center my-[30px] h-[56px]">
      <Search className="w-[24px] h-[24px] text-light-400" />
      <input
        type="text"
        value={debouncedQuery}
        onChange={handleSearch} // Directly handle the search input
        className="outline-none bg-transparent placeholder:text-light-400 text-light-100 w-full"
        placeholder="Search a Question...."
      />
    </div>
  );
}
