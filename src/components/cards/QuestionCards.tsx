import QuestionCard from "./QuestionCard";
import { QuestionType } from "@/types/types";

const QuestionCards = ({ questions }: { questions: QuestionType[] }) => {
  return (
    <div className="mt-[40px] space-y-[24px]">
      {questions && questions.length > 0 ? (
        questions.map((ques: QuestionType) => (
          <QuestionCard key={ques._id} question={ques} />
        ))
      ) : (
        <p>No questions found</p>
      )}
    </div>
  );
};

export default QuestionCards;
