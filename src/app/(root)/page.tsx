import QuestionCard from "@/components/cards/QuestionCard";
import HomeTagFilter from "@/components/filter/HomeTagFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { routes } from "@/constants/routes";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: { search?: string; filter?: string };
}) {
  const searchQuery = searchParams?.search?.toLowerCase() || "";
  const tags = searchParams?.filter?.toLowerCase().split(",") || [];

  const questions = [
    {
      _id: "1",
      title: "How to learn React?",
      description: "I want to learn React, can anyone help me?",
      tags: [
        { _id: "1", name: "Next Js" },
        { _id: "2", name: "Express Js" },
      ],
      author: {
        _id: "1",
        name: "John Doe",
        image:
          "https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
      },
      upvotes: 10,
      answers: 5,
      views: 100,
      createdAt: new Date(),
    },
    {
      _id: "2",
      title: "How to learn JavaScript?",
      description: "I want to learn JavaScript, can anyone help me?",
      tags: [
        { _id: "1", name: "Javascript" },
        { _id: "2", name: "React" },
      ],
      author: {
        _id: "1",
        name: "John Doe",
        image:
          "https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
      },
      upvotes: 100,
      answers: 15,
      views: 1020,
      createdAt: new Date(),
    },
  ];

  // Filter questions based on search query
  const filteredQuestions = questions.filter((question) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const questionTags = question.tags.map((tag) => tag.name.toLowerCase());

    const matchesFilter = tags.length
      ? tags.some((tag) => questionTags.includes(tag))
      : true;

    return matchesQuery && matchesFilter;
  });

  return (
    <main>
      <div className="flex-between">
        <h1 className="h1-bold">All Questions</h1>
        <Link
          href={routes.ask_question}
          className="rounded-lg w-[173px] h-[45px] primary-gradient flex-center"
        >
          <span className="paragraph-semibold text-white ">Ask a Question</span>
        </Link>
      </div>
      <LocalSearch />
      <HomeTagFilter />
      <div className="mt-[40px] space-y-[24px]">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((ques) => (
            <QuestionCard key={ques._id} question={ques} />
          ))
        ) : (
          <p>No questions found</p>
        )}
      </div>
    </main>
  );
}
