"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import TopPerformers from "@/components/shared/top-performers";
import { useDebounce } from "react-use";
import { useQueryClient } from "@tanstack/react-query";
import Pusher from "pusher-js";
import { toast } from "sonner";

export default function Leaderboard() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    500,
    [searchTerm]
  );

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });
    const channel = pusher.subscribe("user-channel");
    channel.bind("user-registered", (data: any) => {
      queryClient.refetchQueries({
        queryKey: ["leaderboard"],
      });
      if (data?.message) {
        toast(data.message, { icon: "😊" });
      } else {
        toast("Someone has just registered to Eco Swachh", { icon: "😊" });
      }
    });

    channel.bind("user-reported-waste", (data: any) => {
      queryClient.refetchQueries({
        queryKey: ["leaderboard"],
      });
      if (data?.message) {
        toast(data.message, { icon: "🪙" });
      } else {
        toast("Someone has just got 10 points for reporting waste", {
          icon: "🪙",
        });
      }
    });

    channel.bind("user-collected-waste", (data: any) => {
      queryClient.refetchQueries({
        queryKey: ["leaderboard"],
      });
      if (data?.message) {
        toast(data.message, { icon: "🪙" });
      } else {
        toast("Someone has just got 50 points for collecting waste", {
          icon: "🪙",
        });
      }
    });
    return function () {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [queryClient]);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-medium text-neutral-600">Leaderboard 👑</h2>
      <div className="max-w-md mr-auto my-4">
        <div className="flex justify-center items-center px-4 rounded-lg border shadow-xs">
          <Search size={16} className="text-neutral-600" />
          <Input
            placeholder="Search top performers by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-0 focus:border-0 focus:outline-none focus-visible:ring-0"
          />
        </div>
      </div>
      <TopPerformers searchTerm={debouncedSearchTerm} />
    </div>
  );
}
