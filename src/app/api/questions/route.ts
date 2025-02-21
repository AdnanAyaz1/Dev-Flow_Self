export const runtime = "nodejs"; // Force Node.js runtime
import dbConnect from "@/lib/database-connection";
import { NextResponse } from "next/server";
import Question from "@/database-models/question.model";
import Tag from "@/database-models/tags.model";
import Forefront from "forefront";

const client = new Forefront(process.env.AIAPIKEY!);

export async function POST(request: Request) {
  const data = await request.json();

  try {
    await dbConnect();
    // Create the question
    const question = await Question.create(data);

    if (question) {
      // Process tags sequentially to avoid race conditions
      for (const tagTitle of data.tags) {
        const tagExists = await Tag.findOne({
          title: { $regex: new RegExp(tagTitle, "i") },
        });

        if (tagExists) {
          // If tag exists, increment questions count
          await Tag.updateOne({ title: tagTitle }, { $inc: { questions: 1 } });
        } else {
          // Generate a description using Forefront AI
          const response = await client.chat.completions.create({
            model: "mistralai/Mistral-7B-v0.1",
            messages: [
              {
                role: "user",
                content: `Generate a concise description for the tag: "${tagTitle}"`,
              },
            ],
            max_tokens: 50,
          });

          const description =
            response?.choices?.[0]?.message?.trim() ||
            "No description available.";

          // If API fails, delete the created question and return an error
          if (!description) {
            await question.delete();
            return NextResponse.json({
              success: false,
              message: "Failed to generate description",
            });
          }

          // Create new tag with AI-generated description
          await Tag.create({ title: tagTitle, questions: 1, description });
        }
      }
    }

    return NextResponse.json(
      { success: true, message: "Question Created", id: question._id },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
