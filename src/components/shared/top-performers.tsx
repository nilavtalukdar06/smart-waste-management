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

export default function TopPerformers({ searchTerm }: { searchTerm: string }) {
  return (
    <div className="my-6">
      <h2 className="text-lg">Top Performers</h2>
      <div className="my-4">
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
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell>Nilav Talukdar</TableCell>
              <TableCell>nilavtalukdar9@gmail.com</TableCell>
              <TableCell className="text-right">145</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
