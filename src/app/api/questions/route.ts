import dbConnect from "@/lib/database-connection";
import { NextResponse } from "next/server";
import Question from "@/database-models/question.model";
import Tag from "@/database-models/tags.model";

export async function POST(request: Request) {
  const data = await request.json();
  try {
    await dbConnect();
    // Create the question
    const question = await Question.create(data);

    if (question) {
      // Update or create tags

      data.tags.map(async (tagTitle: string) => {
        const tagExists = await Tag.findOne({ title: tagTitle });

        if (tagExists) {
          // If tag exists, increment questions count
          await Tag.updateOne({ title: tagTitle }, { $inc: { questions: 1 } });
        } else {
          // If tag doesn't exist, create a new tag with questions set to 1
          await Tag.create({ title: tagTitle, questions: 1 });
        }
      });
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

export async function PATCH(request: Request) {
  const data = await request.json();
  try {
    await dbConnect();
    // Create the question
    const updatedQuestion = await Question.findByIdAndUpdate(data._id, {
      title: data.title,
      content: data.content,
      tags: data.tags,
    });

    // reduce the question number of the old removed tags by one
    const removedTags = data.oldTags.filter(
      (tag: string) => !data.tags.includes(tag)
    );

    removedTags.map(async (tagTitle: string) => {
      const tagExists = await Tag.findOne({ title: tagTitle });
      if (tagExists.questions === 1) {
        await Tag.findByIdAndDelete(tagExists._id);
      } else {
        const upadtedQuestions = tagExists.questions - 1;
        await Tag.findByIdAndUpdate(tagExists._id, {
          questions: upadtedQuestions,
        });
      }
    });

    // now increase the number of questions for the added new tags or create a new tag
    const newTgas = data.tags.filter(
      (tag: string) => !data.oldTags.includes(tag)
    );

    newTgas.map(async (tagTitle: string) => {
      const tagExists = await Tag.findOne({ title: tagTitle });
      if (!tagExists) {
        await Tag.create({ title: tagTitle, questions: 1 });
      } else {
        await Tag.updateOne({ title: tagTitle }, { $inc: { questions: 1 } });
      }
    });

    return NextResponse.json(
      { success: true, message: "Question Updated", id: updatedQuestion._id },
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
