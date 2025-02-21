

import Question from "@/database-models/question.model";
import dbConnect from "@/lib/database-connection";
import { NextResponse } from "next/server";
import Forefront from "forefront";
import Answer from "@/database-models/answer.model";

const client = new Forefront(process.env.AIAPIKEY!);

export async function POST(req: Request) {
  const { questionId, authorId } = await req.json();
  await dbConnect();
  try {
    const question = await Question.findById(questionId);
    let formattedQuestion;
    if (question) {
      formattedQuestion = question.content
        .replace(/\\/g, "")
        .replace(/#x20/g, "");
    }
    const response = await client.chat.completions.create({
      model: "mistralai/Mistral-7B-v0.1",
      messages: [
        {
          role: "user",
          content: `Generate an Answer for the  "${formattedQuestion}" but keep n view that the answer is generated for an mdx editor and your reponse is leading to me an error Unexpected end of file in name, expected a name character such as letters, digits, $, or _; whitespace before attributes; or the end of the tag
          `,
        },
      ],
      max_tokens: 50,
    });
    const response_message =
      response?.choices?.[0]?.message?.content
        ?.trim()
        .toString()
        .replace(/``/g, "") || "No description available.";
    // If API fails, delete the created question and return an error
    if (!response_message) {
      return NextResponse.json({
        success: false,
        message: "Failed to generate answer",
      });
    }
    const answer = await Answer.create({
      author: authorId,
      questionId,
      content: response_message,
    });
    if (answer) {
      question?.answers.push(answer._id);
      await question?.save();
    }
    return NextResponse.json(
      { success: true, message: "Answer Generated" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
  }
}
