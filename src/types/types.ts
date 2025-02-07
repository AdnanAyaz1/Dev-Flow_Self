// types.ts
export interface Tag {
  _id: string;
  name: string;
}

export interface Author {
  _id: string;
  name: string;
  image: string;
}

export interface Question {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  author: Author;
  upvotes: number;
  answers: number;
  views: number;
  createdAt: Date;
}
