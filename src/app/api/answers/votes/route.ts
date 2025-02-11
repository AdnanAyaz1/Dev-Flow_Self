import Answer, { IAnswer } from "@/database-models/answer.model";
import dbConnect from "@/lib/database-connection";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const { id, type, user } = await req.json();
  await dbConnect();

  try {
    // waht will i get -> id of answer , the type of vote , and user id
    const answer: IAnswer | null = await Answer.findById(id);
    if (!answer) {
      return NextResponse.json({ success: false });
    }
    // now check if the user has already voted
    const userVote = answer.voteCastedBy.find((vote) => vote.id == user);

    //-> Condition 1 the user is doing it for the first time
    if (!userVote) {
      if (type == "upVote") {
        answer.upVotes += 1;
        answer.voteCastedBy.push({
          id: user,
          type,
        });
      } else {
        answer.downVotes += 1;
        answer.voteCastedBy.push({
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

      const newVoteCasters = answer.voteCastedBy.map((voteCaster) => {
        if (voteCaster.id == user) {
          voteCaster.type = type;
        }
        return voteCaster;
      });
      if (type == "upVote") {
        answer.upVotes += 1;
        answer.downVotes -= 1;
        answer.voteCastedBy = newVoteCasters;
      } else {
        answer.downVotes += 1;
        answer.upVotes -= 1;
        answer.voteCastedBy = newVoteCasters;
      }
    }
    await answer.save();
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
