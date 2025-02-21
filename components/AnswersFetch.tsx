import React from "react";
import Answers from "./Answers";
import Answer from "@/models/answer";

const AnswersFetch = async ({
  sort,
  questionId,
}: {
  sort: string;
  questionId: string;
}) => {
  let sortCriteria = {};
  if (sort == "Newest") {
    sortCriteria = { createdAt: -1 };
  } else if (sort == "Oldest") {
    sortCriteria = { createdAt: 1 };
  } else if (sort == "Most Popular") {
    sortCriteria = { upVotes: -1, downVotes: 1 };
  } else if (sort == "Least Popular") {
    sortCriteria = { downVotes: -1, upVotes: 1 };
  }
  const answers = await Answer.find({ questionId }).sort(sortCriteria);
  return (
    <div className="max-h-[700px] overflow-y-auto custom-scrollbar">
      {answers.map((id: string, i: number) => (
        <Answers key={i} id={id} />
      ))}
    </div>
  );
};

export default AnswersFetch;
