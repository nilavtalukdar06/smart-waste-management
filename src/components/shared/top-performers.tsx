"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "lucide-react";
import Error from "./error";
import mongoose from "mongoose";
//@ts-ignore
import Highlight from "react-highlighter";

type leaderboard = {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  rewards: number;
};

export default function TopPerformers({ searchTerm }: { searchTerm: string }) {
  const leaderboard = useQuery({
    queryKey: ["leaderboard", searchTerm],
    queryFn: async () => {
      const response = await axios.get(`/api/leaderboard?query=${searchTerm}`);
      return response.data;
    },
  });

  return (
    <div className="my-6">
      <h2 className="text-lg">Top Performers</h2>
      <div className="my-4">
        {leaderboard.isLoading ? (
          <div className="flex justify-start items-center gap-x-4 mb-2">
            <Loader className="animate-spin text-green-500" size={24} />
            <p className="text-lg font-medium text-neutral-600">Loading...</p>
          </div>
        ) : leaderboard.isError ? (
          <div className="max-w-lg">
            <Error error="Failed to fetch leaderboard" />
          </div>
        ) : leaderboard.data && leaderboard.data.length === 0 ? (
          <p className="text-red-500 font-light">No users are present as of now 🥲</p>
        ) : (
          <Table>
            <TableCaption>Top 10 Performers of Eco Swachh</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Rank</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.data.map((item: leaderboard, index: number) => (
                <TableRow key={item._id.toString()}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <Highlight search={searchTerm}>{item.name}</Highlight>
                  </TableCell>
                  <TableCell>
                    <Highlight search={searchTerm}>{item.email}</Highlight>
                  </TableCell>
                  <TableCell className="text-right">{item.rewards}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
