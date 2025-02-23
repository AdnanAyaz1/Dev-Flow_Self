import { SearchParams } from "@/app/(root)/page";
import { fetchTags } from "@/app/server-actions/fetchTags";
import TagCard from "@/components/cards/TagCard";
import { PaginationComponent } from "@/components/pagination";
import LocalSearch from "@/components/search/LocalSearch";
import Sort from "@/components/sort/Sort";
import { routes } from "@/constants/routes";
import { tagSort } from "@/constants/SortOptions";
import Link from "next/link";
import React from "react";

const page = async ({ searchParams }: SearchParams) => {
  const { search, sort, page } = await searchParams;
  const pageSize = 9;

  const { tags, error, noOfPages } = await fetchTags({
    search,
    sort,
    pageSize,
    pageNumber: page,
  });

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <h1 className="h1-bold">Tags</h1>
        <div className="flex max-sm:flex-col max-sm:gap-2 max-sm:items-start max-sm:justify-start sm:flex-between my-[20px] gap-6 max-w-[800px]">
          <LocalSearch placeholder="tag" />
          <Sort data={tagSort} />
        </div>

        {error ? (
          <div className="text-red-500">{error}</div>
        ) : tags.length > 0 ? (
          <div className="mt-[49px] flex flex-wrap gap-[10px]">
            {tags.map((tag) => (
              <Link key={tag._id} href={routes.tags_info(tag._id)}>
                <TagCard tag={tag} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-gray-500">No tags found.</div>
        )}
      </div>
      {noOfPages && noOfPages > 1 && (
        <PaginationComponent noOfPages={noOfPages} />
      )}
    </div>
  );
};

export default page;
