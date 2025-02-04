import React from "react";
import Tag from "../Reusable/Tag";
import Image from "next/image";
import QuestionCardStats from "../Reusable/QuestionCardStats";
import { formatDistanceToNow } from "date-fns";
import { Question } from "@/types/types";

const QuestionCard = async ({ question }: { question: Question }) => {
  const stats = [
    { icon: "/icons/like.svg", number: question.upvotes, text: "Votes" },
    { icon: "/icons/answers.svg", number: question.answers, text: "Answers" },
    { icon: "/icons/view.svg", number: question.views, text: "Views" },
  ];
  return (
    <div className="rounded-lg bg-light-900 border-[1px] border-[#C8CBD954] shadow-question-card-shadow-light px-[45px] py-[36px] dark:dark-gradient dark:border-none dark:shadow-question-card-dark dark:backdrop-blur-83 ">
      <h1 className="h3-semibold text-dark-200 dark:text-light-900">
        {question.title}
      </h1>
      <div className="mt-[14px] flex gap-4">
        {question.tags.map((filter, i) => (
          <Tag tag={filter.name} key={i} icon={false} />
        ))}
      </div>
      <div className="flex-between mt-[24px]">
        <div className="flex items-center gap-2">
          <Image
            src={question.author.image || ""}
            alt="user"
            height={20}
            width={20}
            className="object-cover size-[20px] rounded-full"
          />
          <div className="flex items-center gap-[5px]">
            <h1 className="body-medium text-dark-400 dark:text-light-700">
              {question.author.name}
            </h1>
            <div className="h-[4px] w-[4px] rounded-full bg-black dark:bg-white"></div>
            <p className="small-regular text-dark-400 dark:text-light-700">
              asked {formatDistanceToNow(new Date(question.createdAt))} ago
            </p>
          </div>
        </div>
        <div className="flex gap-[9px]">
          {stats.map((stat, i) => (
            <QuestionCardStats
              key={i}
              number={stat.number}
              icon={stat.icon}
              text={stat.text}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
