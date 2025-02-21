
import { QuestionType, UserType } from "./../../../types/types";
import Question from "@/database-models/question.model";
import { FilterQuery } from "mongoose";
import Tag, { ITag } from "@/database-models/tags.model";
import User from "@/database-models/user.model";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/database-connection";

export async function POST(req: Request) {
  const params = await req.json();
  await dbConnect();
  const filterQuery: FilterQuery<QuestionType | UserType | ITag> = {};
  if (params.filter == "Question") {
    filterQuery.$or = [
      {
        title: new RegExp(params.search, "i"),
      },
      {
        description: new RegExp(params.search, "i"),
      },
    ];
  } else if (params.filter == "Tag") {
    filterQuery.$or = [
      {
        title: new RegExp(params.search, "i"),
      },
    ];
  } else {
    filterQuery.$or = [
      {
        name: new RegExp(params.search, "i"),
      },
      {
        description: new RegExp(params.search, "i"),
      },
    ];
  }
  const model =
    params.filter == "Question"
      ? Question
      : params.filter == "Tag"
        ? Tag
        : User;

  const res = await model.find(filterQuery).limit(5);
  return NextResponse.json({ success: true, data: res });
}
