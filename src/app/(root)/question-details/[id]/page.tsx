
import React from "react";

const QuestionDetails = async({ params }: { params: { id: string } }) => {

  return <div>Question Page: {params.id}</div>;
};

export default QuestionDetails;
