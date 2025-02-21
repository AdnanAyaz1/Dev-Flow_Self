"use client";
import React, { useEffect, useRef, useState } from "react";
import GlobalSearchInput from "../GlobalSearchInput";
import GlobalSearchFilter from "../filter/GlobalSearchFilter";
import { api } from "@/lib/api";
import { QuestionType, UserType } from "@/types/types";
import { ITag } from "@/models/tags";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/constants/routes";

const isUser = (result: QuestionType | ITag | UserType): result is UserType => {
  return (result as UserType).name !== undefined;
};

const GlobalSearch = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Question");
  const [results, setResults] = useState<QuestionType[] | ITag[] | UserType[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.global.global_search({ search, filter });
        setResults(res.data);
        setIsOpen(true);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (search !== "") {
      fetchData();
    }
  }, [search, filter]);

  return (
    <div
      className="flex-1 max-w-[600px] relative"
      ref={dropdownRef}
      onClick={() => setIsOpen(true)}
    >
      <GlobalSearchInput value={search} onChange={setSearch} />
      {isOpen && (
        <div className="mt-3 bg-light-800 shadow-md dark:bg-dark-400 p-[25px] absolute w-full rounded-xl">
          <GlobalSearchFilter value={filter} onChange={setFilter} />
          <div className="w-full h-[1px] bg-light-500"></div>
          <div className="p-[25px]">
            <h3 className="base-bold mb-[25px]">Top Match</h3>
            <div className="space-y-[26px]">
              {loading ? (
                <p className="text-sm text-light-500">Loading...</p>
              ) : results.length > 0 ? (
                results.map((result, i) => {
                  const isUserResult = isUser(result);

                  return (
                    <Link
                      href={
                        isUserResult
                          ? routes.user_info(result._id)
                          : filter === "Question"
                            ? routes.question_details(result._id as string)
                            : routes.tags_info(result._id as string)
                      }
                      key={i}
                      className="flex gap-3"
                      onClick={() => setIsOpen(false)}
                    >
                      <Image
                        src={"/icons/tag.svg"}
                        alt="icon"
                        height={18}
                        width={18}
                        className="invert dark:invert-0"
                      />
                      <div className="space-y-1">
                        <p className="paragraph-semibold">
                          {isUserResult ? result.name : result.title}
                        </p>
                        <p className="text-light-500 text-sm">{filter}</p>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <p className="body-medium text-sm text-light-500">
                  Nothing Found
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
