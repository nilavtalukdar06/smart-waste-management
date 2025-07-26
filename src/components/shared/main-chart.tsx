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
import { AlertCircle, Loader, Recycle } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import Error from "./error";

const chartConfig = {
  desktop: {
    label: "Reported Waste",
    color: "var(--chart-1)",
    icon: AlertCircle,
  },
  mobile: {
    label: "Collected Waste",
    color: "var(--chart-2)",
    icon: Recycle,
  },
} satisfies ChartConfig;

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
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[400px] w-full"
        >
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="_id"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(5, 10)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="reports" fill="var(--color-chart-1)" radius={4} />
            <Bar dataKey="collections" fill="var(--color-chart-2)" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
    );
  }
}
