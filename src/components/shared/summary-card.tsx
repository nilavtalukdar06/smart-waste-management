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
      console.log(response.data);
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

  if (isLoading) {
    return (
      <div className="flex justify-start items-center gap-x-4 my-4">
        <Loader className="animate-spin text-green-500" size={24} />
        <p className="text-lg font-medium text-neutral-500">
          Fetching Summary...
        </p>
      </div>
    );
  }

  if (data) {
    return (
      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center gap-4">
        {/* card 1 */}
        <div className="w-full p-4 border rounded-lg bg-sidebar">
          <div className="flex flex-col justify-center items-start gap-y-3">
            <Button
              className="pointer-events-none"
              variant="secondary"
              size="sm"
            >
              <TriangleAlert />
            </Button>
            <h3 className="text-xl font-medium text-neutral-800">
              Total Reports Submitted
            </h3>
          </div>
          <p className="text-3xl font-semibold text-neutral-700 mt-2">
            {data.reports}
          </p>
        </div>
        {/* card 2 */}
        <div className="w-full p-4 border rounded-lg bg-sidebar">
          <div className="flex flex-col justify-center items-start gap-y-3">
            <Button
              className="pointer-events-none"
              variant="secondary"
              size="sm"
            >
              <Recycle />
            </Button>
            <h3 className="text-xl font-medium text-neutral-800">
              Total Waste Collected
            </h3>
          </div>
          <p className="text-3xl font-semibold text-neutral-700 mt-2">
            {data.collections}
          </p>
        </div>
        {/* card 3 */}
        <div className="w-full p-4 border rounded-lg bg-sidebar">
          <div className="flex flex-col justify-center items-start gap-y-3">
            <Button
              className="pointer-events-none"
              variant="secondary"
              size="sm"
            >
              <Medal />
            </Button>
            <h3 className="text-xl font-medium text-neutral-800">
              Leaderboard Rank
            </h3>
          </div>
          <p className="text-3xl font-semibold text-neutral-700 mt-2">
            {data.rank}
          </p>
        </div>
      </div>
    );
  }
}
