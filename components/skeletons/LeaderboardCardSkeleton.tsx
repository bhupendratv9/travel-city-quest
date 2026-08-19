import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LeaderboardCardSkeleton() {
  return (
    <div className="space-y-2 py-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="h-16 rounded-lg w-full" />
      ))}
    </div>
  );
}
