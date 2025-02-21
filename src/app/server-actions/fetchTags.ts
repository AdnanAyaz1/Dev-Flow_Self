"use server";

import Tag, { ITag } from "@/models/tags";
import { FilterQuery } from "mongoose";

interface FetchTagsParams {
  search?: string;
  sort?: string;
  pageSize: number;
  pageNumber: string;
}

export async function fetchTags({
  search,
  sort,
  pageSize,
  pageNumber,
}: FetchTagsParams) {
  try {
    const skip = (Number(pageNumber) - 1) * pageSize;
    const limit = Number(pageSize);
    const filterQuery: FilterQuery<ITag> = {};

    if (search) {
      filterQuery.$or = [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
      ];
    }

    let sortCriteria = {};
    if (sort) {
      if (sort === "Most Popular") sortCriteria = { questions: -1 };
      if (sort === "Newest") sortCriteria = { createdAt: -1 };
      if (sort === "Least Popular") sortCriteria = { questions: 1 };
      if (sort === "Oldest") sortCriteria = { createdAt: 1 };
    }
    const totalTags = await Tag.countDocuments();
    const noOfPages = Math.ceil(totalTags / pageSize);
    const tags = await Tag.find(filterQuery)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);
    return { tags, noOfPages };
  } catch (error) {
    console.error("Error fetching tags:", error);
    return { tags: [], error: "Failed to fetch tags. Please try again." };
  }
}
