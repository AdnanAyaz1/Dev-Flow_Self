import Answer from "@/database-models/answer.model";
import Question, { VoteCaster } from "@/database-models/question.model";
import dbConnect from "@/lib/database-connection";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const { id, type, user, responseType } = await req.json();
  await dbConnect();

  try {
    // waht will i get -> id of answer , the type of vote , and user id
    const res =
      responseType == "question"
        ? await Question.findById(id)
        : await Answer.findById(id);
    if (!res) {
      return NextResponse.json({ success: false, message: "Invalid Id" });
    }
    // now check if the user has already voted
    const userVote = res.voteCastedBy.find(
      (vote: VoteCaster) => vote.id == user
    );

    //-> Condition 1 the user is doing it for the first time
    if (!userVote) {
      if (type == "upVote") {
        res.upVotes += 1;
        res.voteCastedBy.push({
          id: user,
          type,
        });
      } else {
        res.downVotes += 1;
        res.voteCastedBy.push({
          id: user,
          type,
        });
      }
    }
    if (userVote) {
      // check if the user type and the passed type are same
      if (userVote.type == type) {
        return NextResponse.json({
          success: false,
          message: `Already ${type}`,
        });
      }

      const newVoteCasters = res.voteCastedBy.map((voteCaster: VoteCaster) => {
        if (voteCaster.id == user) {
          voteCaster.type = type;
        }
        return voteCaster;
      });
      if (type == "upVote") {
        res.upVotes += 1;
        res.downVotes -= 1;
        res.voteCastedBy = newVoteCasters;
      } else {
        res.downVotes += 1;
        res.upVotes -= 1;
        res.voteCastedBy = newVoteCasters;
      }
    }
    await res.save();
    return NextResponse.json(
      { success: true, message: "Vote Submitted" },
      { status: 200 }
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
