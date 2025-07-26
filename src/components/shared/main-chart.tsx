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
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import Error from "./error";
import { format, parseISO } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";

const chartConfig = {
  reports: {
    label: "Reported",
    color: "var(--chart-1)",
    icon: AlertCircle,
  },
  collections: {
    label: "Collected",
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
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>User Analytics</CardTitle>
            <CardDescription className="font-light">
              Showing total waste reported and collected by you in the last 7
              days
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-0">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[400px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={data}
                className="ml-[-20px] md:ml-[-10px]"
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="_id"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => format(parseISO(value), "MMM d")}
                />
                <YAxis
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  className="ml-0"
                  allowDecimals={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="reports" fill="var(--color-chart-1)" radius={4} />
                <Bar
                  dataKey="collections"
                  fill="var(--color-chart-2)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
              Your weekly waste activity summary{" "}
              <Recycle className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-muted-foreground leading-snug font-light">
              This data is updated on a daily basis
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }
}
