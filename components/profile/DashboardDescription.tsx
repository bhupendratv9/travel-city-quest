"use client";
import { useGetPageDataQuery } from "@/hooks/queries/get-page-data-query";
import { DashboardData } from "@/types/page-data-types";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardDescription() {
  const { data, isLoading } =
    useGetPageDataQuery<DashboardData>("dashboard_page");

  if (isLoading) {
    return (
      <div className="w-full space-y-1">
        <Skeleton className="h-4 w-full rounded-full"/>
        <Skeleton className="h-4 w-full rounded-full"/>
        <Skeleton className="h-4 w-4/5 mx-auto rounded-full"/>
      </div>
    );
  }
  return (
    <p className="text-sm text-white text-center">
      {data?.data?.dashboard?.description?.title}
    </p>
  );
}
