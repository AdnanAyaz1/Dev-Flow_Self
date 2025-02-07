export const routes = {
  home: "/",
  ask_question: "/ask-question",
  signIn: "/sign-in",
  signUp: "/sign-up",
  question_details: (id: string) => `/question-details/${id}`,
  edit_question: (id: string) => `/edit-question/${id}`,
};
