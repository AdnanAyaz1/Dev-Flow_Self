import { auth } from "@/auth";
import QuestionCard from "@/components/cards/QuestionCard";
import LocalSearch from "@/components/search/LocalSearch";
import Sort from "@/components/sort/Sort";
import { tagDetailsSort } from "@/constants/SortOptions";
import Question from "@/models/question";
import Tag from "@/models/tags";
import User from "@/models/user";
import { QuestionType } from "@/types/types";
import { FilterQuery, SortOrder } from "mongoose";
import React from "react";

const page = async ({
  params,
  searchParams,
}: {
  searchParams: {
    search: string;
    sort: string;
  };
  params: { id: string };
}) => {
  const { id } = params;
  const session = await auth();
  const user = await User.findById(session?.user.id);
  const { search, sort } = searchParams;
  const tag = await Tag.findById(id);
  const filterQuery: FilterQuery<QuestionType> = {};
  if (search) {
    filterQuery.$or = [
      { title: new RegExp(search, "i") },
      { description: new RegExp(search, "i") },
    ];
  }
  type SortCriteria = Record<string, SortOrder>;
  const sortCriteria: SortCriteria = {};
  if (sort == "Newest") {
    sortCriteria.createdAt = -1;
  } else if (sort == "Oldest") {
    sortCriteria.createdAt = 1;
  } else if (sort == "Most Popular") {
    sortCriteria.upVotes = -1;
  } else if (sort == "Un Answered") {
    filterQuery.answers = [];
    sortCriteria.createdAt = 1;
  }
  const questions = await Question.find({
    ...filterQuery,
    tags: { $in: tag?.title },
  })
    .populate("author")
    .sort(sortCriteria)
    .lean();
  const parsedQuestions = JSON.parse(JSON.stringify(questions));
  return (
    <div>
      <h1 className="h1-bold">
        {tag.title.toLowerCase() === "js" ? "JavaScript" : tag.title}
      </h1>
      <h3 className="body-medium dark:text-light-700 my-6">
        {tag.description}
      </h3>
      <div className="flex max-sm:flex-col  sm:flex-between max-w-[800px] my-6 gap-3">
        <LocalSearch placeholder="Question title,description" />
        <Sort data={tagDetailsSort} />
      </div>
      <div className="space-y-3">
        {parsedQuestions &&
          parsedQuestions.map((ques: QuestionType, i: number) => (
            <QuestionCard
              question={ques}
              key={i}
              bookmark={true}
              userId={user._id}
              bookmarks={user.bookmarks}
            />
          ))}
      </div>
    </div>
  );
};

export default page;
