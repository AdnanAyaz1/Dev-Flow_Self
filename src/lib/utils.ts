import { tagMap } from "@/constants/tagMap";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDeviconClass = (tag: string) => {
  const normalizedTechName = tag.replace(/[ .]/g, "").toLowerCase();

  return tagMap[normalizedTechName]
    ? `${tagMap[normalizedTechName]} colored`
    : "devicon-devicon-plain"; // Example: devicon-javascript-plain
};
