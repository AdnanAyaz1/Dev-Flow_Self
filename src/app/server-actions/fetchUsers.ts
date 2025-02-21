"use server";

import User from "@/database-models/user.model";
import { UserType } from "@/types/types";
import { FilterQuery, SortOrder } from "mongoose";

interface FetchUsersParams {
  search?: string;
  sort?: string;
  pageSize: number;
  pageNumber: string;
}

export async function fetchUsers({
  search,
  sort,
  pageSize,
  pageNumber,
}: FetchUsersParams) {
  try {
    const skip = (Number(pageNumber) - 1) * pageSize;
    const limit = Number(pageSize);
    const filterQuery: FilterQuery<UserType> = {};

    if (search) {
      filterQuery.$or = [
        { name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ];
    }

    type SortCriteria = Record<string, SortOrder>;
    const sortCriteria: SortCriteria = {};

    if (sort === "Highest Reputation") {
      sortCriteria.reputation = -1;
    } else if (sort === "Most Popular") {
      sortCriteria.posts = -1;
    } else if (sort === "Newest") {
      sortCriteria.createdAt = -1;
    } else if (sort === "Oldest") {
      sortCriteria.createdAt = 1;
    }

    const totalUsers = await User.countDocuments(filterQuery);
    const noOfPages = Math.ceil(totalUsers / pageSize);

    const users = await User.find(filterQuery)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    return { users, noOfPages };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { users: [], error: "Failed to fetch users. Please try again." };
  }
}
