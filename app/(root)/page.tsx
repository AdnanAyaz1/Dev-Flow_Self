import QuestionCards from "@/components/cards/QuestionCards";
import HomeTagFilter from "@/components/filter/HomeTagFilter";
import { PaginationComponent } from "@/components/pagination";
import LocalSearch from "@/components/search/LocalSearch";
import { routes } from "@/constants/routes";
import { api } from "@/lib/api";

import Link from "next/link";

export interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

export default async function Home({ searchParams }: SearchParams) {
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
        <LocalSearch placeholder="Question" />
        <HomeTagFilter />
        <QuestionCards questions={questions} />
      </div>
      {noOfPages > 1 && <PaginationComponent noOfPages={noOfPages} />}
    </main>
  );
}
