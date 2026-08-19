"use client"
import React from 'react'
import { Button } from "@/components/ui/button";
import PlayIconFilledSvg from "@/components/svgs/PlayIconFilledSVG";
import {getQueryClient} from "@/app/get-query-client";
import {useRouter} from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import {useGetGameQuery} from "@/hooks/queries/get-game-query";
import useAuthStore from "@/store/auth-store";

type RoundScoreButtonProps = {
  showResult: boolean;
  isThirdQuestion: boolean;
  playText:string;
  resultText:string;

}

export default function RoundScoreButton({ showResult, isThirdQuestion, resultText, playText }:RoundScoreButtonProps) {
  const router = useRouter();
  const {isAuthenticated} = useAuthStore();

  const { isLoading:gameLoading, data:gameData } = useGetGameQuery();

  const shouldRedirect =
    gameData?.message === "Please login to continue playing" ||
    gameData?.status === 401;

  if(gameLoading){
    return <Skeleton className="w-full h-12.5 rounded-full"/>
  }

  const handleNextQuestion = () => {
    getQueryClient().removeQueries({ queryKey: ["game"] });
    getQueryClient().removeQueries({ queryKey: ["game-status"] });

    if(shouldRedirect){
      router.push(`/sign-in?from=${encodeURIComponent("/game")}`);
    } else if(!isAuthenticated && isThirdQuestion){
      router.push(`/sign-in?from=${encodeURIComponent("/game")}`)
    } else {
      router.push(
        showResult
          ? "/result"
          : "/game",
      );
    }
  };
  return (<Button
    onClick={() => handleNextQuestion()}
    variant="primary"
    size="primary"
    className="w-full cursor-pointer flex gap-3 font-normal"
  >
    {showResult ? (
      <>{resultText}</>
    ) : (
      <>
        <PlayIconFilledSvg /> {playText}
      </>
    )}
  </Button>)
}
