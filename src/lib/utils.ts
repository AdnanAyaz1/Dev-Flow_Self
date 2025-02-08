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

export const formatNumber = (num: number): string => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
};
