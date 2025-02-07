import { IQuestion } from "./../database-models/question.model";
import { IUser } from "@/database-models/user.model";
import { fetchHandler } from "./handlers/fetchHandler";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export const api = {
  users: {
    registor: (userData: Partial<IUser>) =>
      fetchHandler(`${API_BASE_URL}/users/sign-up`, {
        method: "POST",
        body: JSON.stringify(userData),
      }),
    log_in: (userData: Partial<IUser>) =>
      fetchHandler(`${API_BASE_URL}/users/sign-in`, {
        method: "POST",
        body: JSON.stringify(userData),
      }),
  },
  questions: {
    ask_question: (data: Partial<IQuestion>) =>
      fetchHandler(`${API_BASE_URL}/questions`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    edit_question: (data: Partial<IQuestion>) =>
      fetchHandler(`${API_BASE_URL}/questions`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
  },
};
