"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import accuracy from "@/public/assets/profile/accuracy.png";
import wrong from "@/public/assets/profile/wrong-picks.png";

import leafRight from "@/public/assets/profile/crown-leaf-right.png";
import leafLeft from "@/public/assets/profile/crown-leaf-left.png";
import { useGameResultQuery } from "@/hooks/queries/get-game-result-query";
import ResultSkeleton from "@/components/skeletons/ResultSkeleton";
import { useGetGameStatusQuery } from "@/hooks/queries/get-game-status-query";
import { useRouter } from "next/navigation";
import { useGetPageDataQuery } from "@/hooks/queries/get-page-data-query";
import { FinalResultResponse } from "@/types/page-data-types";
import { cn } from "@/lib/utils";
import {useGetProfileQuery} from "@/hooks/queries/get-profile-query";

export default function ResultScoreSection() {
  const { push } = useRouter();
  const { isLoading, data } = useGameResultQuery();

  const { data: status, isLoading: statusLoading } = useGetGameStatusQuery();
  const { data: pageContent, isLoading: pageContentLoading } =
    useGetPageDataQuery<FinalResultResponse>("final_result_page");

  const { data: userData, isLoading: userLoading } = useGetProfileQuery();

  useEffect(() => {
    if (statusLoading || !status?.data) return;
    if (
      !status.data.game_completed ||
      status.data.questions_finished !== status.data.total_questions
    ) {
      push("/game");
    }
  }, [status, statusLoading, push]);

  if (isLoading || statusLoading || pageContentLoading || userLoading) {
    return <ResultSkeleton />;
  }

  const pageData = data?.data;

  return (
    <>
      <div className="text-center">
        <p className="font-semibold text-xl">
          {pageContent?.data?.final_result.heading_1}
        </p>
        <p className="text-[10px]">
          {pageContent?.data?.final_result.heading_2}{" "}
          {pageData && pageData?.journey?.length}{" "}
          {pageContent?.data?.final_result.heading_3}
        </p>
      </div>
      <div className="w-full bg-[linear-gradient(to_right,#BE951A_0%,#FFFCF3_25%,var(--color-primary-yellow)_50%,#FFFCF3_75%,#BE951A_100%)] p-0.5 rounded-lg shadow-[0_0_35px_0_color-mix(in_srgb,var(--color-primary-yellow)_30%,transparent)]">
        <div className="bg-[#011C36] p-5 rounded-lg text-white/60 space-y-4 relative">
          <div className="text-center space-y-1 mb-5">
            <p className="text-xs">
              {pageContent?.data?.final_result.message_1_1}
            </p>
            <p className="text-2xl">
              <span className="text-primary-yellow text-4xl">
                {pageData?.score_board?.display.split("/")[0]}
              </span>
              <span className="text-lg"> /</span>
              {pageData?.score_board?.display.split("/")[1]}
            </p>
            {!userData?.data?.user?.is_guest && (
              <>
                <p className="text-xs">{pageContent?.data?.final_result?.message_1}</p>
                <p className="text-white">{userData?.data?.game_stats?.total_score}</p>
              </>
            )}
          </div>
          <div className="w-2/3 mx-auto bg-linear-to-r from-transparent via-[#F4DB89]/70 to-transparent h-px" />
          <div
            className={cn(
              "flex items-center gap-4",
              userData?.data?.user?.is_guest ? "justify-evenly" : "justify-center",
            )}
          >
            <div className="flex flex-col items-center gap-0.5 text-center">
              <Image src={accuracy} alt="" className="size-5" />
              <p className="text-white/60 text-[10px]">
                {pageContent?.data?.final_result.message_2}
              </p>
              <p className="text-white">{pageData?.stats?.accuracy}</p>
            </div>
            <div className="h-full min-h-14 bg-linear-to-t from-transparent via-[#F4DB89]/70 to-transparent w-px" />
            {!userData?.data?.user?.is_guest && (
              <>
                <div className="flex flex-col items-center gap-0.5 text-center">
                  <Image
                    src={pageData?.stats?.rank_earned?.icon || ""}
                    height={30}
                    width={30}
                    alt=""
                    className="size-5"
                  />
                  <p className="text-white/60 text-[10px]">
                    {pageContent?.data?.final_result.message_3}
                  </p>
                  <p className="text-quest-yellow">
                    {pageData?.stats?.rank_earned?.name}
                  </p>
                </div>
                <div className="h-full min-h-14 bg-linear-to-t from-transparent via-[#F4DB89]/70 to-transparent w-px" />
              </>
            )}

            <div className="flex flex-col items-center gap-0.5 text-center">
              <Image src={wrong} alt="" className="size-5" />
              <p className="text-white/60 text-[10px]">
                {pageContent?.data?.final_result.message_4}
              </p>
              <p className="text-white">{pageData?.stats?.wrong_picks}</p>
            </div>
          </div>

          <div className="absolute left-7 top-5">
            <Image src={leafLeft} alt="" className="size-32" />
          </div>

          <div className="absolute right-7 top-5">
            <Image src={leafRight} alt="" className="size-32" />
          </div>
        </div>
      </div>

      <div className="bg-linear-to-b from-[#0D1F35] to-[#020E23] p-2.5 rounded-lg space-y-2">
        <p className="text-xs">{pageContent?.data?.final_result.message_5}</p>
        <div className="grid grid-cols-4 gap-2">
          {pageData &&
            pageData?.journey?.map((city) => (
              <div key={city?.question_id} className="rounded-md bg-white/10">
                <div className="aspect-square rounded-md overflow-hidden">
                  <Image
                    src={city?.correct_answer_image}
                    height={80}
                    width={80}
                    alt=""
                    className="object-cover size-full"
                  />
                </div>
                <div className="text-center py-2 space-y-1">
                  <p className="text-[10px]">{city?.city}</p>
                  <p className="text-[10px] text-white/60">
                    <span className="text-quest-yellow">
                      {city?.score_display.split("/")[0]}
                    </span>
                    /{city?.score_display.split("/")[1]}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium leading-5.5">
          {pageContent?.data?.final_result.message_6}
        </p>
      </div>
    </>
  );
}
