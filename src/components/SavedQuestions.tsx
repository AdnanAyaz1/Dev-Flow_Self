import Question from "@/database-models/question.model";
import React from "react";
import QuestionCard from "./cards/QuestionCard";

const SavedQuestions = async ({
  questionId,
  userId,
  bookmarks,
}: {
  questionId: string;
  userId: string;
  bookmarks: string[];
}) => {
  const question = await Question.findById(questionId).populate("author");
  return (
    <QuestionCard
      question={JSON.parse(JSON.stringify(question))}
      bookmark={true}
      userId={userId}
      bookmarks={bookmarks}
    />
  );
};

export default SavedQuestions;
