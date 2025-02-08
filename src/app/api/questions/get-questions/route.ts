import Question from "@/database-models/question.model";
import dbConnect from "@/lib/database-connection";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const Query = await request.json();
  const {
    pageNumber,
    pageSize = 3,
    searchQuery = "",
    filter = [],
    sort = [],
  } = Query;
  const skip = (Number(pageNumber) - 1) * pageSize;
  const limit = Number(pageSize);
  console.log("skip", skip, pageNumber);
  await dbConnect();

  //   const filterQuery: FilterQuery<QuestionType> = {};
  //   if (searchQuery) {
  //     filterQuery.$or = [
  //       { title: { $regex: new RegExp(searchQuery, "i") } },
  //       { content: { $regex: new RegExp(searchQuery, "i") } },
  //     ];
  //   }

  //   let sortCriteria = {};

  //   if (filter.includes("newest")) {
  //     console.log("The case is true");
  //     sortCriteria = { createdAt: -1 };
  //   } else if (filter.includes("un answered")) {
  //     filterQuery.answers = 0;
  //     sortCriteria = { createdAt: -1 };
  //   } else if (filter.includes("recommended questions")) {
  //     sortCriteria = { upvotes: -1 };
  //   } else {
  //     sortCriteria = { createdAt: 1 };
  //   }
  //   const questions = await Question.find(filterQuery)
  //     .sort(sortCriteria)
  //     .populate("author")
  //     .skip(skip)
  //     .limit(limit);
  const totalQuestions = await Question.countDocuments();
  const noOfPages = Math.ceil(totalQuestions / pageSize);
  let questions = await Question.find()
    .skip(skip)
    .limit(limit)
    .populate("author");

  if (searchQuery) {
    questions = questions.filter(
      (ques) =>
        ques?.title
          .toLowerCase()
          .trim()
          .includes(searchQuery.toLowerCase().trim()) ||
        ques?.content
          .toLowerCase()
          .trim()
          .includes(searchQuery.toLowerCase().trim())
    );
  }

  if (filter) {
  }

  if (sort) {
    if (sort.includes("newest")) {
      questions = questions.sort((a, b) => b?.createdAt - a?.createdAt);
    } else if (sort.includes("recommended questions")) {
      questions = questions.sort((a, b) => b?.upVotes - a?.upVotes);
    } else if (sort.includes("un answered")) {
      questions = questions.filter((ques) => ques?.answers.length == 0);
    }
  }

  return NextResponse.json({
    success: true,
    questions,
    noOfPages,
  });
}
