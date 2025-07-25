"use client";
import fetchInsight from "@/utils/api/insight";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Error from "./error";

export default function Insight() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["insight"],
    queryFn: fetchInsight,
  });

  if (isLoading) {
    return (
      <div className="flex justify-start items-center gap-x-4">
        <Loader className="text-green-500 animate-spin" size={24} />
        <p className="text-lg font-medium text-neutral-600">
          Fetching AI Insight...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-md mr-auto">
        <Error error="Error fetching AI insight" />
      </div>
    );
  }

  if (data) {
    return (
      <article className="p-4 md:p-6 border rounded-lg">
        <h1 className="text-2xl md:text-3xl font-medium text-neutral-600">
          ✨ AI Insights
        </h1>
        <p className="my-4 text-sm font-light md:text-base text-neutral-500">
          {data}
        </p>
      </article>
    );
  }
}
