import { questions, tags } from "@/constants/rightSidebar";
import Image from "next/image";
import React from "react";
import Tag from "../Reusable/Tag";

const RightSidebar = () => {
  return (
    <div className="sticky top-0 right-0 bg-light-900 dark:bg-dark-200 z-[0] pt-[48px] min-w-[330px] w-[330px] h-[calc(100vh-100px)] border-l-[1px] px-[26px] shadow-right-sidebar-shadow dark:shadow-none overflow-y-auto custom-scrollbar pb-[33px]">
      <h3 className="h3-bold">Hot Network</h3>
      <div className="mt-[36px] flex flex-col gap-[30px]">
        {questions.map((ques, i) => (
          <div key={i} className="flex gap-[10px] items-start">
            <Image
              src={`${i % 2 == 0 ? "/icons/question-orange.svg" : "/icons/question-blue.svg"}`}
              alt="question"
              height={20}
              width={20}
            />
            <p className="body-medium text-dark-500 dark:text-light-700">
              {ques}
            </p>
          </div>
        ))}
      </div>
      <h3 className="h3-bold mt-[60px]">Popular Tags</h3>
      <div className="flex flex-col gap-4 mt-[26px]">
        {tags.map((tag, i) => (
          <div key={i} className="flex-between">
            <Tag tag={tag} icon={true} />
            <p className="small-medium text-dark-500 dark:text-light-850">
              1000+
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;
