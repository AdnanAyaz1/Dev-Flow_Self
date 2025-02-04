import { getDeviconClass } from "@/lib/utils";
import React from "react";
import { twMerge } from "tailwind-merge";

const Tag = ({
  icon,
  tag,
  classNameText,
  classNameTag,
}: {
  icon: boolean;
  tag: string;
  classNameText?: string;
  classNameTag?: string;
}) => {
  return (
    <div
      className={twMerge(
        " rounded-lg px-[16px] py-[8px] bg-light-800 dark:bg-dark-400/60  uppercase flex gap-2 h-[29px] items-center",
        classNameTag
      )}
    >
      {icon && <i className={`${getDeviconClass(tag)} text-[14px] `} />}
      <span className={twMerge("text-light-400 subtle-medium", classNameText)}>
        {tag}
      </span>
    </div>
  );
};

export default Tag;
