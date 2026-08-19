import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeProfileSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="rounded-full size-12.5" />
      <Skeleton className="h-8 w-32 rounded-full" />
    </div>
  );
}
