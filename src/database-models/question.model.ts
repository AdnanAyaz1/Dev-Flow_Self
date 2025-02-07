import { Schema, model, models, Document, Types } from "mongoose";
import { IUser } from "./user.model";
// Assuming an Answer model exists

interface IAnswer extends Document {
  content: string;
}

export interface IQuestion extends Document {
  title: string;
  content: string;
  tags: string[];
  user: Types.ObjectId | IUser;
  upVotes: number;
  answers: Types.ObjectId[] | IAnswer[];
  views: number;
  oldTags: string[]; // just incase of editing the question it is needed
}

const QuestionSchema = new Schema<IQuestion>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String, required: true }],
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    upVotes: { type: Number, default: 0 },
    answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Question =
  models?.Question || model<IQuestion>("Question", QuestionSchema);

export default Question;
