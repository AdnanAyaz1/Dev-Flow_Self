"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Tag from "../Reusable/Tag";

const tags = ["Javascript", "Next Js", "React", "Express Js"];

const HomeTagFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Initialize selected tags based on URL params
  useEffect(() => {
    const tagsFromUrl = searchParams.get("filter");
    if (tagsFromUrl) {
      setSelectedTags(tagsFromUrl.split(","));
    }
  }, [searchParams]);

  // Toggle tag selection and update URL
  const toggleTagSelection = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((item) => item !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newSelectedTags);

    // Update the URL with selected tags
    const params = new URLSearchParams(searchParams.toString());
    if (newSelectedTags.length > 0) {
      params.set("filter", newSelectedTags.join(","));
    } else {
      params.delete("filter");
    }

    // Update the URL without reloading the page
    router.push(`?${params.toString()}`, { scroll: false });
  };

  console.log("Hello from the home tag filter");

  return (
    <div className="flex gap-4">
      {tags.map((tag, i) => (
        <div key={i} onClick={() => toggleTagSelection(tag)}>
          <Tag
            tag={tag}
            icon={false}
            classNameTag={`cursor-pointer ${
              selectedTags.includes(tag) ? "dark:bg-dark-400" : " "
            } h-[42px]`}
            classNameText={`body-medium text-[16px] ${
              selectedTags.includes(tag)
                ? "primary-text-gradient"
                : "text-light-400"
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default HomeTagFilter;
