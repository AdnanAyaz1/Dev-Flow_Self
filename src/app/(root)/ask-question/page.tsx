import { auth } from "@/auth";
import QuestionForm from "@/components/forms/QuestionForm";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <div>
      <h1 className="h1-bold mb-[36px]">Ask a Question</h1>
      <QuestionForm id={session.user.id} />
    </div>
  );
};

export default Page;
