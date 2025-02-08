import { IAnswer } from "@/database-models/question.model";
import { IUser } from "@/database-models/user.model";

export interface QuestionType {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  author: IUser;
  upVotes: number;
  answers: IAnswer[];
  views: number;
  createdAt: Date;
}

export interface ProcessedSearchParams {
  searchQuery: string;
  filter: string[];
  sort: string[];
  pageNumber: string;
  pageLimit: number;
}

export interface MySearchParams {
  search?: string;
  filter?: string;
  page?: number;
}
