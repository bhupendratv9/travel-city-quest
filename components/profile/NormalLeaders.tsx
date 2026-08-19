import React from "react";
import { domAnimation, LazyMotion, m } from "motion/react";
import RankingTriangleIconSVG from "@/components/svgs/RankingTriangleIconSVG";
import Image from "next/image";
import { LeaderboardResponse } from "@/types/leaderboard-types";
import { useGetLeaderboardQuery } from "@/hooks/queries/get-leaderboard-query";
import LeaderboardCardSkeleton from "@/components/skeletons/LeaderboardCardSkeleton";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 80,
      mass: 1,
    },
  },
};

type RankingProps = {
  activeTab: LeaderboardResponse["type"];
};

export default function NormalLeaders({ activeTab }: RankingProps) {
  const { data, isLoading } = useGetLeaderboardQuery(activeTab);
  if (isLoading) {
    return <LeaderboardCardSkeleton />;
  }

  const myRank = data?.data?.my_rank;
  const isMyRankListed =
    !!myRank &&
    [...(data?.data?.top_three ?? []), ...(data?.data?.leaderboard ?? [])].some(
      (item) => item?.user_id === myRank.user_id,
    );

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-6 space-y-2"
      >
        {data?.data?.leaderboard.map((item) => (
          <m.div
            key={item?.user_id}
            variants={cardVariants}
            className={cn(
              "rounded-lg text-white gradient-background flex items-center justify-between px-5 py-2",
              item?.user_id === data?.data?.my_rank?.user_id &&
                "shadow-[0_0_15px_5px] shadow-quest-yellow/40",
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-px">
                <p className="text-xs">{item?.rank}</p>
                <RankingTriangleIconSVG />
              </div>
              <div className="size-11 rounded-full overflow-hidden">
                <Image
                  src={item?.profile_image}
                  alt=""
                  width={200}
                  height={200}
                  className="object-cover size-full"
                />
              </div>
              <div className="text-xs space-y-0.5">
                <p className="font-medium">{item?.name}</p>
                <p className="">{item?.badge?.name}</p>
              </div>
            </div>
            <p className="text-xl font-inter font-light">{item?.score}</p>
          </m.div>
        ))}

        {myRank && !isMyRankListed && (
          <m.div
            key={myRank.user_id}
            variants={cardVariants}
            className={cn(
              "rounded-lg text-white gradient-background flex items-center justify-between px-5 py-2",
              "shadow-[0_0_15px_5px] shadow-quest-yellow/40",
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-px">
                <p className="text-xs">{myRank.rank}</p>
                <RankingTriangleIconSVG />
              </div>
              <div className="size-11 rounded-full overflow-hidden">
                <Image
                  src={myRank.profile_image}
                  alt=""
                  width={200}
                  height={200}
                  className="object-cover size-full"
                />
              </div>
              <div className="text-xs space-y-0.5">
                <p className="font-medium">{myRank.name}</p>
                <p className="">{myRank.badge?.name}</p>
              </div>
            </div>
            <p className="text-xl font-inter font-light">{myRank.score}</p>
          </m.div>
        )}
      </m.div>
    </LazyMotion>
  );
}
