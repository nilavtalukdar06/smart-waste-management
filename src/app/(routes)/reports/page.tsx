"use client";
import Error from "@/components/shared/error";
import ReportCard, { IWaste } from "@/components/shared/report-card";
import Success from "@/components/shared/success";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader, Search } from "lucide-react";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });
    const channel = pusher.subscribe("waste-channel");
    channel.bind("waste-reported", (data: any) => {
      toast(data.message, { icon: "😁" }) || "New waste reported";
    });

    return function () {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const response = await axios.get("/api/waste/report/get-reports");
      return response.data;
    },
  });

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

      <div className="my-6 grid grid-cols-1 lg:grid-cols-2 place-items-center w-full gap-6">
        {data &&
          data.map((item: IWaste, index: number) => (
            <ReportCard
              key={index}
              location={item.location}
              type={item.type}
              items={item.items}
              weight={item.weight}
              imageUrl={item.imageUrl}
              createdAt={item.createdAt}
              status={item.status}
            />
          ))}
      </div>
    </section>
  );
}
