"use client";
import { Loader, Medal, Recycle, TriangleAlert } from "lucide-react";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Error from "./error";

export default function SummaryCard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["summary"],
    queryFn: async () => {
      const response = await axios.get("/api/analytics/summary");
      return response.data;
    },
  });

  if (isError) {
    return (
      <div className="max-w-md my-4">
        <Error error="Failed to fetch summary" />
      </div>
    );
  }

  return (
    <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center gap-4">
      {/* card 1 */}
      <div className="w-full p-4 border rounded-lg bg-sidebar">
        <div className="flex flex-col justify-center items-start gap-y-3">
          <Button className="pointer-events-none" variant="secondary" size="sm">
            <TriangleAlert />
          </Button>
          <h3 className="text-xl font-medium text-neutral-800">
            Total Reports Submitted
          </h3>
        </div>
        <p className="text-3xl font-semibold text-neutral-700 mt-2">
          {isLoading ? (
            <Loader className="text-green-500 animate-spin" size={24} />
          ) : (
            <span>{data.reports}</span>
          )}
        </p>
      </div>
      {/* card 2 */}
      <div className="w-full p-4 border rounded-lg bg-sidebar">
        <div className="flex flex-col justify-center items-start gap-y-3">
          <Button className="pointer-events-none" variant="secondary" size="sm">
            <Recycle />
          </Button>
          <h3 className="text-xl font-medium text-neutral-800">
            Total Waste Collected
          </h3>
        </div>
        <p className="text-3xl font-semibold text-neutral-700 mt-2">
          {isLoading ? (
            <Loader className="text-green-500 animate-spin" size={24} />
          ) : (
            <span>{data.collections}</span>
          )}
        </p>
      </div>
      {/* card 3 */}
      <div className="w-full p-4 border rounded-lg bg-sidebar">
        <div className="flex flex-col justify-center items-start gap-y-3">
          <Button className="pointer-events-none" variant="secondary" size="sm">
            <Medal />
          </Button>
          <h3 className="text-xl font-medium text-neutral-800">
            Leaderboard Rank
          </h3>
        </div>
        <p className="text-3xl font-semibold text-neutral-700 mt-2">
          {isLoading ? (
            <Loader className="text-green-500 animate-spin" size={24} />
          ) : (
            <span>{data.rank}</span>
          )}
        </p>
      </div>
    </div>
  );
}
