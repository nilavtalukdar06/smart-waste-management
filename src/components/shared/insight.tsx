"use client";
import fetchInsight from "@/utils/api/insight";
import { useQuery } from "@tanstack/react-query";
import Error from "./error";
import { Skeleton } from "../ui/skeleton";

export default function Insight() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["insight"],
    queryFn: fetchInsight,
  });

  if (isError) {
    return (
      <div className="max-w-md mr-auto">
        <Error error="Error fetching AI insight" />
      </div>
    );
  }

  return (
    <article className="p-4 md:p-6 border rounded-lg">
      <h1 className="text-2xl md:text-3xl font-medium text-neutral-600">
        ✨ AI Insights
      </h1>
      <div className="my-4 text-sm font-light md:text-base text-neutral-500">
        {isLoading ? (
          <div className="min-h-[150px] w-full grid grid-cols-1 place-items-center gap-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <Skeleton className="h-full w-full rounded" key={item} />
            ))}
          </div>
        ) : (
          <p>{data}</p>
        )}
      </div>
    </article>
  );
}
