import { IAnswer } from "@/database-models/answer.model";

export interface QuestionType {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  author: UserType;
  upVotes: number;
  answers: IAnswer[];
  views: number;
  createdAt: Date;
}

export interface UserType {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  image?: string;
  location?: string;
  portfolio?: string;
  reputation?: number;
  provider: string; // Store the provider (e.g., 'github', 'google', 'credentials')
  providerAccountId: string; // Store the unique provider account ID
  password?: string; // For credentials-based login, if password is needed
  bookmarks?: string[];
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
