"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const TagSort = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedSort, setSelectedSort] = useState("Most Popular"); // Default value

  useEffect(() => {
    // Get sort value from URL params
    const sortValue = searchParams.get("sort");
    if (sortValue) {
      setSelectedSort(sortValue);
    }
  }, [searchParams]); // Runs when URL params change

  const handleAnswerSort = (val: string) => {
    setSelectedSort(val); // Update state
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", val);
    router.push(`?${params.toString()}`, { scroll: false });
  };
  return (
    <Select onValueChange={handleAnswerSort} value={selectedSort}>
      <SelectTrigger className="w-fit h-[45px] no-focus bg-dark-300 text-light-700 flex-center gap-2">
        <Image src={"/icons/filter.svg"} alt="filter" height={16} width={16} />
        <SelectValue placeholder="Most Popular" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Most Popular">Most Popular</SelectItem>
        <SelectItem value="Least Popular">Least Popular</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TagSort;
