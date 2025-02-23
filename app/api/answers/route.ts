import Answer from "@/models/answer";
import Question from "@/models/question";
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
