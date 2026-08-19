"use client";
import React, { useEffect, useState } from "react";
import PlayIconFilledSvg from "@/components/svgs/PlayIconFilledSVG";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGetProfileQuery } from "@/hooks/queries/get-profile-query";
import { useGetGameQuery } from "@/hooks/queries/get-game-query";
import { LogIn } from "lucide-react";
import { useGetPageDataQuery } from "@/hooks/queries/get-page-data-query";
import { DashboardData } from "@/types/page-data-types";
import PrimaryButtonSkeleton from "@/components/skeletons/PrimaryButtonSkeleton";
import useGameStore from "@/store/game-store";

function formatCountdown(target: Date): string {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return "00:00:00";

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");
  const hms = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  return days > 0 ? `${days}d ${hms}` : hms;
}

function Countdown({ target }: { target: Date }) {
  const targetTime = target.getTime();
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return <span>{formatCountdown(new Date(targetTime))}</span>;
}

export default function DashboardStartGame() {
  const { push } = useRouter();
  const {game_id, setGameId} = useGameStore();

  const { isLoading: contentLoading, data: content } =
    useGetPageDataQuery<DashboardData>("dashboard_page");

  const buttonTexts = content?.data?.dashboard?.button?.button_1;

  const { data: gameData, isLoading: gameLoading, isError } = useGetGameQuery({ refetchOnMount: "always" });

  useEffect(() => {
    if(!game_id && gameData?.data?.game_id){
      setGameId(gameData?.data?.game_id)
    }
  }, [gameData?.data?.game_id, game_id, setGameId]);

  const { data, isLoading } = useGetProfileQuery({ refetchOnMount: "always" });
  

  if (isLoading || gameLoading || contentLoading) {
    return <PrimaryButtonSkeleton />;
  }
  

  return (
    <>
      {data?.data?.game_stats?.today_game_played ||
      (gameData && gameData?.status >= 400) || gameData?.data?.next_questions_available_date ||
      isError ? (
        <div className="rounded-full h-12.5 bg-white/40 w-full flex items-center gap-1.5 justify-center text-white">
          {gameData?.data?.next_questions_available_date ? (
            <>
              {buttonTexts?.button_next}
              <Countdown
                target={
                  new Date(gameData?.data?.next_questions_available_date)
                }
              />
            </>
          ) : gameData && gameData?.status >= 400 ? (
            gameData?.message === "Please login to continue playing" ? (
              <Button
                onClick={() => push(`/sign-in?from=${encodeURIComponent("/game")}`)}
                variant="primary"
                size="primary"
                className="flex items-center gap-2"
              >
                <LogIn /> {buttonTexts?.button_login}{" "}
              </Button>
            ) : (
              gameData?.message
            )
          ) : (
            buttonTexts?.button_complete
          )}
        </div>
      ) : (
        <Button
          onClick={() => {
            push("/game");
          }}
          size="primary"
          className="flex gap-2"
          variant="primary"
        >
          <PlayIconFilledSvg />
          {buttonTexts?.button_start}
        </Button>
      )}
    </>
  );
}
