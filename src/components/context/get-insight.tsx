import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/get-query-client";
import fetchInsight from "@/utils/api/insight";

export default async function GetInsight({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["insight"],
    queryFn: fetchInsight,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
