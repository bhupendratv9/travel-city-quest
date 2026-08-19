import React from 'react'
import { Skeleton } from "@/components/ui/skeleton";

export default function ResultSkeleton() {
  return (<>
    <div className="w-4/5 mx-auto space-y-2">
      <Skeleton className="h-8 w-full rounded-full"/>
      <Skeleton className="h-3 w-5/6 mx-auto rounded-full"/>
    </div>
    <Skeleton className="h-64 w-full rounded-lg"/>
    <Skeleton className="h-40 w-full rounded-lg"/>
    <div className="space-y-2">
      <Skeleton className="h-4 w-full rounded-full"/>
      <Skeleton className="h-4 w-11/12 rounded-full"/>
    </div>
  </>)
}
