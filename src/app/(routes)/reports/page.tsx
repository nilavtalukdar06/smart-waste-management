"use client";
import Error from "@/components/shared/error";
import ReportCard from "@/components/shared/report-card";
import Success from "@/components/shared/success";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader, Search } from "lucide-react";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDebounce } from "react-use";
import { IWaste } from "../../../../types/schema";

export default function Reports() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedValue, setDebouncedValue] = useState<string>("");

  useDebounce(
    () => {
      setDebouncedValue(searchTerm);
    },
    500,
    [searchTerm]
  );

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });
    const channel = pusher.subscribe("waste-channel");
    channel.bind("waste-reported", (data: any) => {
      queryClient.refetchQueries({
        queryKey: ["reports"],
      });
      if (data?.message) {
        toast(data.message, { icon: "😁" });
      } else {
        toast("New waste reported", { icon: "😁" });
      }
    });

    channel.bind("waste-updated", (data: any) => {
      queryClient.refetchQueries({
        queryKey: ["reports"],
      });
      if (data?.message) {
        toast(data.message, { icon: "😎" });
      } else {
        toast("Someone has started collecting waste", { icon: "😎" });
      }
    });

    channel.bind("collected", (data: any) => {
      queryClient.refetchQueries({
        queryKey: ["reports"],
      });
      if (data?.message) {
        toast(data.message, { icon: "👏" });
      } else {
        toast("Someone has collected waste just now", { icon: "👏" });
      }
    });

    return function () {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [queryClient]);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["reports", debouncedValue, page],
    queryFn: async () => {
      const response = await axios.get(
        `/api/waste/report/get-reports?query=${debouncedValue}&page=${page}`
      );
      return response.data;
    },
  });
  const totalDocuments = data?.totalDocuments || 0;
  const totalPages = Math.ceil(totalDocuments / 6);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  return (
    <section className="p-4">
      <h2 className="text-3xl font-medium text-neutral-600">
        Recent Reports 😊
      </h2>
      <div className="max-w-md mr-auto my-4">
        <div className="flex justify-center items-center px-4 rounded-lg border shadow-xs">
          <Search size={16} className="text-neutral-600" />
          <Input
            placeholder="Search Reports"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-0 focus:border-0 focus:outline-none focus-visible:ring-0"
          />
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-start items-center gap-x-4">
          <Loader className="text-green-500 animate-spin" size={32} />
          <p className="text-lg font-medium text-neutral-600">
            Fetching Reports...
          </p>
        </div>
      ) : isError ? (
        <div className="max-w-md">
          <Error error="Failed to fetch the reports, please try again later" />
        </div>
      ) : (
        <div className="max-w-md">
          <Success message="Here are all of the recent reports in the descending order" />
        </div>
      )}
      {data && data.result.length === 0 ? (
        <p className="text-red-500 font-light">
          No reports are present at this moment
        </p>
      ) : (
        <div className="my-6 grid grid-cols-1 lg:grid-cols-2 place-items-center w-full gap-6">
          {data &&
            data.result.map((item: IWaste, index: number) => (
              <ReportCard
                key={index}
                location={item.location}
                type={item.type}
                items={item.items}
                weight={item.weight}
                imageUrl={item.imageUrl}
                createdAt={item.createdAt || ""}
                status={item.status}
                reporter={item.reporter.toString() || ""}
                reportId={item?._id?.toString() || ""}
                collector={item.collector?.toString() || ""}
                searchTerm={debouncedValue}
              />
            ))}
        </div>
      )}

      <div
        className={`my-4 w-full ${isLoading || totalPages === 0 || data.result.length === 0 ? "hidden" : "flex"} justify-center items-center gap-x-4`}
      >
        <Button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <p className="text-lg font-medium text-neutral-600">
          {page} of {totalPages}
        </p>
        <Button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </section>
  );
}
