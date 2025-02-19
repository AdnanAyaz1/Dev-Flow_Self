import { ITag } from "@/database-models/tags.model";
import React from "react";
import Tag from "../Reusable/Tag";

const TagCard = ({ tag }: { tag: ITag }) => {
  return (
    <div className="px-[30px] py-[40px] flex flex-col rounded-lg  bg-dark-300 w-[260px] h-[243px]">
      <Tag tag={tag.title} icon={true} />
      {/* desc */}
      <div className="flex justify-between flex-col flex-1">
        <div className="my-[18px] line-clamp-4">{tag.description}</div>
        <p className="small-medium text-light-500">
          <span className="body-semibold primary-text-gradient">
            {tag.questions}+
          </span>
          <span className="ml-2">Questions</span>
        </p>
      </div>
    </div>
  );
};

export default TagCard;
