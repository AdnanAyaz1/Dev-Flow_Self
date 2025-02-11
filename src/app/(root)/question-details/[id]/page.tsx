import { auth } from "@/auth";
import AnswersFetch from "@/components/AnswersFetch";
import Preview from "@/components/editor/Preview";
import AnswerForm from "@/components/forms/AnswerForm";
import QuestionCardStats from "@/components/Reusable/QuestionCardStats";
import Tag from "@/components/Reusable/Tag";
import AnswersSort from "@/components/sort/AnswersSort";
import { api } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import React from "react";

const QuestionDetails = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { sort: string };
}) => {
  const { id } = await params;
  const { sort } = await searchParams;
  const session = await auth();
  const { question, incrementView } = await api.questions.get_question_byID({
    questionId: id,
    userId: session?.user.id as string,
  });
  if (incrementView) {
    question.views += 1;
  }

  const formattedContent = question?.content
    .replace(/\\/g, "")
    .replace(/&#x20;/g, "");
  const stats = [
    {
      icon: "/icons/answers.svg",
      number: question?.answers.length,
      text: "Answers",
    },
    { icon: "/icons/view.svg", number: question?.views, text: "Views" },
  ];

  return (
    <>
      {question && (
        <div>
          {/* question-details Header */}
          <div className="flex-between">
            <div className="flex-center gap-2">
              <Image
                src={
                  question?.author.image || "/images/person-placeholder.jpeg"
                }
                alt="user-image"
                height={25}
                width={25}
                className="object-cover rounded-full"
              />
              <p className="paragraph-semibold text-light-700">
                {question?.author.name}
              </p>
            </div>
            <div className="flex gap-[10px]">
              <div className="flex-center gap-[6px]">
                <Image
                  src={"/icons/upvote.svg"}
                  alt="upvote-icon"
                  height={15}
                  width={15}
                />
                <p className="subtle-medium text-light-900 flex-center rounded-sm bg-dark-400 size-[16px]">
                  {question?.upVotes}
                </p>
              </div>
              <div className="flex-center gap-[6px]">
                <Image
                  src={"/icons/downvote.svg"}
                  alt="upvote-icon"
                  height={15}
                  width={15}
                />
                <p className="subtle-medium text-light-900 flex-center rounded-sm bg-dark-400 size-[16px]">
                  {question?.upVotes}
                </p>
              </div>
              <Image
                src={"/icons/bookmark.svg"}
                alt="bookmark-icon"
                height={15}
                width={15}
              />
            </div>
          </div>
          {/* title */}
          <h1 className="mt-[14px] h2-semibold text-light-900">
            {question?.title}
          </h1>
          {/* stats */}
          <div className="flex mt-[19px] gap-[15px]">
            <div className="flex-center gap-2">
              <Image
                src={"/icons/time.svg"}
                alt="clock"
                height={15}
                width={15}
              />
              <p className="small-regular text-dark-400 dark:text-light-700">
                asked{" "}
                {formatDistanceToNow(new Date(question?.createdAt as Date))} ago
              </p>
            </div>

            {stats.map((stat, i) => (
              <QuestionCardStats
                key={i}
                number={stat.number as number}
                icon={stat.icon}
                text={stat.text}
              />
            ))}
          </div>
          {/* preview */}
          <Preview formattedContent={formattedContent as string} />
          {/* tags */}
          <div className="mt-[14px] flex gap-4">
            {question?.tags.map((tag: string, i) => (
              <Tag tag={tag} key={i} icon={true} />
            ))}
          </div>
          {/* Answers */}

          {question.answers.length > 0 && (
            <section className="mt-[50px]">
              {/* Answer Controls */}
              <div className="flex-between">
                <h1 className="paragraph-medium">
                  <span className="primary-text-gradient">
                    {question.answers.length} Answers
                  </span>
                </h1>
                <AnswersSort />
              </div>

              <AnswersFetch
                sort={sort}
                questionId={JSON.parse(JSON.stringify(question._id))}
              />
            </section>
          )}

          {/*Submit Answer */}
          <section className="my-[50px]">
            <AnswerForm
              authorId={session?.user.id as string}
              questionId={JSON.parse(JSON.stringify(question._id))}
            />
          </section>
        </div>
      )}
    </>
  );
};

export default QuestionDetails;
