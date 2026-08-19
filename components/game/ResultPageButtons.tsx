"use client"

import React from "react";
import { Button } from "@/components/ui/button";
// import TrophyIconSvg from "@/components/svgs/TrophyIconSVG";
import LeaderboardFilledIconSvg from "@/components/svgs/LeaderboardFilledIconSVG";
import HomeIconSvg from "@/components/svgs/HomeIconSVG";
import {useRouter} from "next/navigation";
import {useGetPageDataQuery} from "@/hooks/queries/get-page-data-query";
import { FinalResultResponse} from "@/types/page-data-types";
import PrimaryButtonSkeleton from "@/components/skeletons/PrimaryButtonSkeleton";

export default function ResultPageButtons() {
  const router = useRouter();
  const {data, isLoading}=useGetPageDataQuery<FinalResultResponse>("final_result_page")

  if(isLoading){
    return <div className="space-y-2">
      <PrimaryButtonSkeleton/>
      <PrimaryButtonSkeleton/>
    </div>
  }

  const buttonsContent = data?.data?.final_result?.button;
  return (
    <>
      <Button
        onClick={() => {router.push(`/leaderboard?from=${encodeURIComponent("/leaderboard")}`)}}
        size="primary"
        className="border-2 rounded-full flex gap-2 items-center text-quest-yellow border-dark-yellow bg-linear-to-r from-primary-yellow/20 to-dark-yellow/20 cursor-pointer"
      >
        <LeaderboardFilledIconSvg /> <span>{buttonsContent?.button_2}</span>
      </Button>
      <Button
        onClick={() => {router.push("/dashboard")}}
        className="flex gap-2 items-center"
        variant="primary-grey"
        size="primary"
      >
        <HomeIconSvg /> <span>{buttonsContent?.button_3}</span>
      </Button>
    </>
  );
}
