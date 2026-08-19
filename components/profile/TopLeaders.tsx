import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

import RankingCrownIconSvg from "@/components/svgs/RankingCrownIconSVG";
import RankingTriangleIconSVG from "@/components/svgs/RankingTriangleIconSVG";
import { LeaderboardResponse } from "@/types/leaderboard-types";
import { useGetLeaderboardQuery } from "@/hooks/queries/get-leaderboard-query";
import LeaderboardTopSkeleton from "@/components/skeletons/LeaderboardTopSkeleton";
import { cn } from "@/lib/utils";

const springTransition = (delay: number) => ({
  type: "spring" as const,
  damping: 20,
  stiffness: 80,
  mass: 1,
  delay,
});

const hidden = { opacity: 0, y: 100 };
const visible = (delay: number) => ({
  opacity: 1,
  y: 0,
  transition: springTransition(delay),
});

const rankHidden = { opacity: 0 };
const rankVisible = (delay: number) => ({
  opacity: 1,
  transition: { duration: 0.3, delay: delay + 0.4 },
});

type RankingProps = {
  activeTab: LeaderboardResponse["type"];
};

export default function TopLeaders({ activeTab }: RankingProps) {
  const { data, isLoading } = useGetLeaderboardQuery(activeTab);

  if (isLoading) {
    return <LeaderboardTopSkeleton />;
  }

  return (
    <div className="py-12 text-white">
      <div className="flex items-center justify-center gap-6 lg:gap-7.5">
        {data && data.data.top_three.length === 0 && (
          <motion.div
            className="h-30 flex item-center"
            initial={hidden}
            animate={visible(0)}
          >
            <p className="text-center">No Leaders for now</p>
          </motion.div>
        )}

        {data && data.data.top_three.length > 1 && (
          <motion.div
            initial={hidden}
            animate={visible(0.2)}
            className="relative flex flex-col items-center gap-2"
          >
            <div
              className={cn(
                "p-1 bg-[#00FFD633] rounded-full overflow-hidden",
                data.data?.top_three[1]?.user_id ===
                  data?.data?.my_rank?.user_id &&
                  "shadow-[0_0_25px_5px] shadow-quest-yellow/40",
              )}
            >
              <div className="size-15.5 rounded-full overflow-hidden">
                <Image
                  src={(data && data.data?.top_three[1]?.profile_image) || ""}
                  alt=""
                  width={200}
                  height={200}
                  className="object-cover size-full"
                />
              </div>
            </div>
            <motion.div
              initial={rankHidden}
              animate={rankVisible(0.2)}
              className="absolute -bottom-3/4 space-y-0.5 text-center"
            >
              <p className="text-xl font-inter font-extralight">
                {data.data.top_three[1]?.score}
              </p>
              <p className="text-[10px]">{data.data.top_three[1]?.name}</p>
            </motion.div>

            <motion.div
              initial={rankHidden}
              animate={rankVisible(0.2)}
              className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-px"
            >
              <p className="text-sm">{data.data.top_three[1]?.rank}</p>
              <RankingTriangleIconSVG />
            </motion.div>
          </motion.div>
        )}

        {data && data.data.top_three.length >= 1 && (
          <motion.div
            initial={hidden}
            animate={visible(0)}
            className="relative flex flex-col items-center gap-2"
          >
            <div
              className={cn(
                "p-1 bg-[#00FFD633] rounded-full overflow-hidden",
                data.data?.top_three[0]?.user_id ===
                  data?.data?.my_rank?.user_id &&
                  "shadow-[0_0_25px_5px] shadow-quest-yellow/40",
              )}
            >
              <div className="size-30 rounded-full overflow-hidden">
                <Image
                  src={data.data.top_three[0]?.profile_image}
                  alt=""
                  width={200}
                  height={200}
                  className="object-cover size-full"
                />
              </div>
            </div>
            <motion.div
              initial={rankHidden}
              animate={rankVisible(0)}
              className="absolute -bottom-2/5 space-y-0.5 text-center"
            >
              <p className="text-xl font-inter font-extralight">
                {data.data.top_three[0]?.score}
              </p>
              <p className="text-sm">{data.data.top_three[0]?.name}</p>
            </motion.div>
            <motion.div
              initial={rankHidden}
              animate={rankVisible(0)}
              className="absolute -top-10 left-1/2 -translate-x-1/2"
            >
              <RankingCrownIconSvg />
            </motion.div>
          </motion.div>
        )}

        {data && data.data.top_three.length > 2 && (
          <motion.div
            initial={hidden}
            animate={visible(0.4)}
            className="relative flex flex-col items-center gap-2"
          >
            <div
              className={cn(
                "p-1 bg-[#00FFD633] rounded-full overflow-hidden",
                data.data?.top_three[2]?.user_id ===
                  data?.data?.my_rank?.user_id &&
                  "shadow-[0_0_25px_5px] shadow-quest-yellow/40",
              )}
            >
              <div className="size-15.5 rounded-full overflow-hidden">
                <Image
                  src={data.data.top_three[2]?.profile_image}
                  alt=""
                  width={200}
                  height={200}
                  className="object-cover size-full"
                />
              </div>
            </div>
            <motion.div
              initial={rankHidden}
              animate={rankVisible(0.4)}
              className="absolute -bottom-3/4 space-y-0.5 text-center"
            >
              <p className="text-xl font-inter font-light">
                {data.data.top_three[2]?.score}
              </p>
              <p className="text-[10px]">{data.data.top_three[2]?.name}</p>
            </motion.div>
            <motion.div
              initial={rankHidden}
              animate={rankVisible(0.4)}
              className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-px"
            >
              <p className="text-sm">{data.data.top_three[2]?.rank}</p>
              <RankingTriangleIconSVG />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
