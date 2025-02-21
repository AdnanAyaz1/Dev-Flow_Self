export const runtime = "nodejs"; // Force Node.js runtime
import Answer from "@/database-models/answer.model";
import Question from "@/database-models/question.model";
import dbConnect from "@/lib/database-connection";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { questionId, authorId, content } = await request.json();
  try {
    await dbConnect();

    const answer = await Answer.create({
      content,
      author: authorId,
      questionId,
    });
    if (!answer) {
      return NextResponse.json({
        success: false,
        message: "Error creating answer",
      });
    }

    await Question.findByIdAndUpdate(questionId, {
      $push: { answers: answer },
    });

    return NextResponse.json(
      { success: true, message: "Answer Submitted" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}
