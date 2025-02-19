import Question from "@/database-models/question.model";
import dbConnect from "@/lib/database-connection";
import { QuestionType } from "@/types/types";
import { FilterQuery } from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const Query = await request.json();
  const { pageNumber, pageSize = 3, searchQuery = "", sort = [] } = Query;
  const skip = (Number(pageNumber) - 1) * pageSize;
  const limit = Number(pageSize);
  await dbConnect();

  const filterQuery: FilterQuery<QuestionType> = {};
  if (searchQuery) {
    filterQuery.$or = [
      { title: { $regex: new RegExp(searchQuery, "i") } },
      { content: { $regex: new RegExp(searchQuery, "i") } },
    ];
  }

  let sortCriteria = {};

  if (sort.includes("newest")) {
    sortCriteria = { createdAt: -1 };
  } else if (sort.includes("un answered")) {
    filterQuery.answers = [];
    sortCriteria = { createdAt: -1 };
  } else if (sort.includes("recommended questions")) {
    sortCriteria = { upVotes: -1 };
  } else sortCriteria = { createdAt: 1 };

  const totalQuestions = await Question.countDocuments();
  const noOfPages = Math.ceil(totalQuestions / pageSize);
  const questions = await Question.find(filterQuery)
    .skip(skip)
    .limit(limit)
    .sort(sortCriteria)
    .populate("author");

  return NextResponse.json({
    success: true,
    questions,
    noOfPages,
  });
}
