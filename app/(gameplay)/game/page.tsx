"use client";
import React from "react";
import Container from "@/components/layout/Container";

import GameFlipCard from "@/components/game/GameFlipCard";
import PageLayout from "@/components/layout/PageLayout";
import { m, LazyMotion, domAnimation } from "motion/react";
import { useGetGameQuery } from "@/hooks/queries/get-game-query";
import LoadingScreen from "@/components/common/LoadingScreen";
import { useRouter } from "next/navigation";
import useGameStore from "@/store/game-store";
import GameErrorPage from "@/components/game/GameErrorPage";

export default function Page() {
  const { isLoading, data, isError, isSuccess } = useGetGameQuery();
  const { push } = useRouter();

  const gameData = data?.data;

  const { setGameId, game_id } = useGameStore();

  React.useEffect(() => {
    if (isSuccess && gameData?.next_questions_available_date) {
      push("/dashboard");
    }

    if (!game_id && gameData?.game_id) {
      setGameId(gameData?.game_id);
    }
  }, [
    gameData?.next_questions_available_date,
    gameData?.game_id,
    setGameId,
    isSuccess,
    push,
    game_id,
  ]);

  if (isLoading) return <LoadingScreen />;

  if ((data?.status && data?.status >= 400) || isError)
    return <GameErrorPage message={data?.message} />;

  return (
    <PageLayout>
      <Container className="text-white h-full">
        <div className="max-w-xs flex flex-col gap-10 justify-center items-center mx-auto h-full min-h-screen py-10">
          {!data?.data?.next_questions_available_date && (
            <div className="space-y-6 w-full">
              <div className="relative h-1 w-full bg-white/6">
                <LazyMotion features={domAnimation}>
                  <m.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((gameData?.current_question as number) / (gameData?.total_questions as number)) * 100}%`,
                    }}
                    transition={{
                      type: "spring",
                      damping: 20,
                      stiffness: 80,
                      mass: 1,
                    }}
                    className="absolute h-full w-1/4 top-0 left-0 bg-primary-yellow"
                  ></m.div>
                </LazyMotion>
              </div>

              <p className="text-center text-white/60">
                {gameData?.question?.question_type}
              </p>

              <div className="flex justify-center items-center">
                <div className="bg-linear-to-r from-primary-yellow/25 to-dark-yellow/25 border border-primary-yellow rounded-full px-7.5 py-1.5 w-max text-primary-yellow">
                  {gameData?.question?.city}
                </div>
              </div>
            </div>
          )}

          <div>
            <GameFlipCard cards={gameData} />
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}
