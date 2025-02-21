import QuestionForm from "@/components/forms/QuestionForm";
import Question from "@/models/question";
import dbConnect from "@/lib/database-connection";
import React from "react";

const EditQuestion = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  await dbConnect();
  const question = await Question.findById(`${id}`);
  return (
    <div>
      <h1 className="h1-bold mb-[36px]">Edit Question</h1>
      <QuestionForm question={question} />
    </div>
  );
};

export default EditQuestion;
