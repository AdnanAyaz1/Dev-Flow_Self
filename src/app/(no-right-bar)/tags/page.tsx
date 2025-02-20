import TagCard from "@/components/cards/TagCard";
import LocalSearch from "@/components/search/LocalSearch";
import TagSort from "@/components/sort/TagSort";
import { routes } from "@/constants/routes";
import Tag, { ITag } from "@/database-models/tags.model";
import { FilterQuery } from "mongoose";
import Link from "next/link";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: { search: string; sort: string };
}) => {
  const { search, sort } = searchParams;
  const filterQuery: FilterQuery<ITag> = {};
  if (search) {
    filterQuery.$or = [
      { title: new RegExp(search, "i") },
      { description: new RegExp(search, "i") },
    ];
  }
  let sortCriteria = {};
  if (sort) {
    if (sort == "Most Popular") {
      sortCriteria = { questions: -1 };
    } else sortCriteria = { questions: 1 };
  }
  const tags = await Tag.find(filterQuery).sort(sortCriteria);
  return (
    <div>
      <h1 className="h1-bold">Tags</h1>
      <div className="flex max-sm:flex-col max-sm:gap-2 max-sm:items-start max-sm:justify-start  sm:flex-between my-[20px] gap-6 max-w-[800px]">
        <LocalSearch placeholder={"tag"} />
        <TagSort />
      </div>
      <div className="mt-[49px] flex flex-wrap gap-[10px]">
        {tags.map((tag, i) => (
          <Link key={i} href={routes.tags_info(tag._id)}>
            <TagCard tag={tag} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
