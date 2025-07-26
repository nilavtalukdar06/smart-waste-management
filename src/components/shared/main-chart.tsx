"use client";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader, Monitor, Smartphone } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import Error from "./error";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
    icon: Monitor,
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
    icon: Smartphone,
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

export default function MainChart() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["chart"],
    queryFn: async () => {
      const response = await axios.get("/api/analytics/chart");
      console.log(response.data);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="my-6 w-full flex justify-start items-center gap-x-4">
        <Loader className="animate-spin text-green-500" size={24} />
        <p className="text-lg font-medium">Fetching Analytics...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="my-6 max-w-md mr-auto">
        <Error error="Failed to fetch analytics" />
      </div>
    );
  }

  if (data) {
    return (
      <div className="my-6 w-full">
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
    );
  }
}
