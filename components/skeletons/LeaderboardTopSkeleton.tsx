import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LeaderboardTopSkeleton() {
  return (
    <div className="flex items-center justify-center gap-6 lg:gap-7.5 py-12">
      <Skeleton className="rounded-full size-16.5" />
      <Skeleton className="size-32 rounded-full" />
      <Skeleton className="rounded-full size-16.5" />
    </div>
  );
}
