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

const AnswersSort = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedSort, setSelectedSort] = useState("Oldest"); // Default value

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
      <SelectTrigger className="w-[180px] no-focus dark:bg-dark-300 bg-light-800 dark:text-light-700 flex-center gap-2">
        <Image src={"/icons/filter.svg"} alt="filter" height={16} width={16} />
        <SelectValue placeholder="Oldest" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Newest">Newest</SelectItem>
        <SelectItem value="Oldest">Oldest</SelectItem>
        <SelectItem value="Most Popular">Most Popular</SelectItem>
        <SelectItem value="Least Popular">Least Popular</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default AnswersSort;
