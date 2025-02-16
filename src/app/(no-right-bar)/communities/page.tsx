import LocalSearch from "@/components/search/LocalSearch";
import UserSort from "@/components/sort/UserSort";
import { routes } from "@/constants/routes";
import User from "@/database-models/user.model";
import { UserType } from "@/types/types";
import { FilterQuery, SortOrder } from "mongoose";
import Image from "next/image";
import Link from "next/link";

import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: { sort: string; search: string };
}) => {
  const { sort = "", search = "" } = searchParams;
  const filterQuery: FilterQuery<UserType> = {};
  if (search) {
    filterQuery.$or = [
      { name: new RegExp(search, "i") },
      { email: new RegExp(search, "i") },
    ];
  }
  console.log("sort", sort);
  type SortCriteria = Record<string, SortOrder>;
  const sortCriteria: SortCriteria = {};
  if (sort == "Highest Reputation") {
    sortCriteria.reputation = -1;
  } else if (sort == "Most Popular") {
    sortCriteria.posts = -1;
  }
  const users = await User.find(filterQuery).sort(sortCriteria);
  return (
    <div>
      <h1 className="h1-bold">All Users</h1>
      <div className="flex-between my-[50px] gap-6 max-w-[800px]">
        <LocalSearch placeholder="Username" />
        <UserSort />
      </div>
      <div className="flex flex-wrap gap-3">
        {users.map((user: UserType, key) => {
          return (
            <Link
              href={routes.user_info(user._id)}
              key={key}
              className="w-[260px] py-[30px] rounded-[10px] bg-dark-300 border-[1px] border-dark-400 flex-center flex-col gap-2"
            >
              <Image
                src={user.image || "/images/person-placeholder.jpeg"}
                alt="user image"
                height={100}
                width={100}
                className="object-cover rounded-full aspect-square"
              />
              <h3 className="h3-bold">{user.name}</h3>
              <p className="body-regular text-light-500">{user.email}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default page;
