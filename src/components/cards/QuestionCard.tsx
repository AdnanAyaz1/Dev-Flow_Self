"use client";
import React from "react";
import Tag from "../Reusable/Tag";
import Image from "next/image";
import QuestionCardStats from "../Reusable/QuestionCardStats";
import { formatDistanceToNow } from "date-fns";

import { useRouter } from "next/navigation";
import { routes } from "@/constants/routes";
import { QuestionType } from "@/types/types";
import Bookmark from "../Bookmark";
import Link from "next/link";
import { Edit2Icon } from "lucide-react";

const QuestionCard = ({
  question,
  bookmark = false,
  userId,
  bookmarks,
}: {
  question: QuestionType;
  bookmark?: boolean;
  userId?: string;
  bookmarks?: string[];
}) => {
  const router = useRouter();
  const stats = [
    { icon: "/icons/like.svg", number: question.upVotes, text: "Votes" },
    {
      icon: "/icons/answers.svg",
      number: question.answers.length,
      text: "Answers",
    },
    { icon: "/icons/view.svg", number: question.views, text: "Views" },
  ];

  return (
    <div className="relative z-10">
      <div
        className="rounded-lg bg-light-900 border-[1px] border-[#C8CBD954] shadow-question-card-shadow-light px-[45px] py-[36px] dark:dark-gradient dark:border-none dark:shadow-question-card-dark dark:backdrop-blur-83 cursor-pointer "
        onClick={() => {
          if (bookmark) return;
          router.push(routes.question_details(question._id));
        }}
      >
        <div className="flex-between">
          <h1 className="h3-semibold text-dark-200 dark:text-light-900">
            {question.title}
          </h1>
          {bookmark && (
            <Bookmark
              questionId={JSON.parse(JSON.stringify(question._id))}
              userId={JSON.parse(JSON.stringify(userId)) as string}
              bookmarks={bookmarks as string[]}
            />
          )}
        </div>
        <div className="mt-[14px] flex gap-4">
          {question.tags.map((tag: string, i) => (
            <Tag tag={tag} key={i} icon={true} />
          ))}
        </div>
        <div className="flex-between mt-[24px]">
          <div className="flex items-center gap-2">
            <Image
              src={question.author?.image || "/images/person-placeholder.jpeg"}
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
      {userId == question?.author._id && (
        <Link
          className={`absolute ${bookmark ? "right-20" : "right-12"}  z-20 top-10`}
          href={routes.edit_question(JSON.parse(JSON.stringify(question._id)))}
        >
          <Edit2Icon className="w-6 h-4 text-blue-700" />
        </Link>
      )}
    </div>
  );
};

export default QuestionCard;
