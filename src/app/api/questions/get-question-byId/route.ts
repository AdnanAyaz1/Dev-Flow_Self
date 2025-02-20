import { NextResponse } from "next/server";
import Question from "@/database-models/question.model";
import dbConnect from "@/lib/database-connection";

export async function POST(req: Request) {
  await dbConnect();
  let incrementView = false;
  try {
    const { userId, questionId } = await req.json();
    const question = await Question.findById(questionId).populate(
      "author",
      "name image"
    );

    if (!question) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }
    if (userId) {
      if (userId !== question?.author?.toString()) {
        const hasViewed = question?.viewedBy?.includes(userId);
        if (!hasViewed) {
          await Question.findByIdAndUpdate(questionId, {
            $inc: { views: 1 },
            $push: { viewedBy: userId },
          });
          incrementView = true;
        }
      }
    }

    return NextResponse.json({ success: true, question, incrementView });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error : "Something went wrong",
      },
      { status: 500 }
    );
  }
}
