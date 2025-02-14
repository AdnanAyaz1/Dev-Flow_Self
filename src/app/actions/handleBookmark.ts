"use server";
import dbConnect from "@/lib/database-connection";
import User from "@/database-models/user.model";

export async function handleQuestionBookmark(
  userId: string,
  questionId: string
) {
  await dbConnect();

  try {
    const user = await User.findById(userId);

    if (!user) {
      return { error: "User not found" };
    }

    if (user.bookmarks.includes(questionId)) {
      const newBookmarks = user.bookmarks.filter(
        (bookmark: string) => bookmark !== questionId
      );
      user.bookmarks = newBookmarks;
      await user.save();

      return {
        success: true,
        message: "Question removed from bookmarks",
        bookmarks: user.bookmarks,
      };
    } else {
      user.bookmarks.push(questionId);

      await user.save();
      return {
        success: true,
        message: "Question added to bookmarks",
        bookmarks: user.bookmarks,
      };
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
