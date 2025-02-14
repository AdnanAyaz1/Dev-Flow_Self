import { auth } from "@/auth";
import LoadMore from "@/components/Reusable/LoadMore";

import SavedQuestions from "@/components/SavedQuestions";
import User from "@/database-models/user.model";
import React from "react";
import { SearchParams } from "../page";

const page = async ({ searchParams }: SearchParams) => {
  const awaitedParams = await searchParams;
  const index = awaitedParams.index;
  const session = await auth();
  console.log(session);
  const user = await User.findById(session?.user.id);
  const userId = user ? JSON.parse(JSON.stringify(user?._id)) : "";
  const bookmarks = user?.bookmarks;

  return (
    <div>
      <h1 className="h1-bold">Saved Questions</h1>
      <div className="mt-[50px] ">
        {session?.user && user.bookmarks.length > 0 ? (
          <div className="space-y-[30px]">
            {user.bookmarks.slice(0, Number(index) || 3).map((id: string) => (
              <SavedQuestions
                questionId={id}
                key={id}
                userId={userId}
                bookmarks={bookmarks}
              />
            ))}
          </div>
        ) : (
          <h1>No Saved Questions</h1>
        )}
      </div>
      {session?.user && <LoadMore datalength={user?.bookmarks?.length} />}
    </div>
  );
};

export default page;
