import QuestionCard from "@/components/cards/QuestionCard";
import HomeTagFilter from "@/components/filter/HomeTagFilter";
import { PaginationComponent } from "@/components/pagination";
import LocalSearch from "@/components/search/LocalSearch";
import { routes } from "@/constants/routes";
import { api } from "@/lib/api";
import { QuestionType } from "@/types/types";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    search?: string;
    filter?: string;
    page?: string;
    sort?: string;
  };
}) {
  const awaitedSearchParams = await searchParams;
  const searchQuery = awaitedSearchParams?.search?.toLowerCase() || "";
  const filter = awaitedSearchParams?.filter?.toLowerCase().split(",") || [];
  const sort = awaitedSearchParams?.sort?.toLowerCase().split(",") || [];
  const pageNumber = awaitedSearchParams?.page || "1";
  const pageLimit = 5;

  const { questions, noOfPages } = await api.questions.get_question({
    searchQuery,
    filter,
    pageNumber,
    pageLimit,
    sort,
  });

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex-between">
          <h1 className="h1-bold">All Questions</h1>
          <Link
            href={routes.ask_question}
            className="rounded-lg w-[173px] h-[45px] primary-gradient flex-center"
          >
            <span className="paragraph-semibold text-white ">
              Ask a Question
            </span>
          </Link>
        </div>
        <LocalSearch />
        <HomeTagFilter />
        <div className="mt-[40px] space-y-[24px]">
          {questions && questions.length > 0 ? (
            questions.map((ques: QuestionType) => (
              <QuestionCard key={ques._id} question={ques} />
            ))
          ) : (
            <p>No questions found</p>
          )}
        </div>
      </div>
      {noOfPages > 1 && <PaginationComponent noOfPages={noOfPages} />}
    </main>
  );
}
