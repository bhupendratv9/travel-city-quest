"use client";

import React, {Suspense, useEffect, useState, useSyncExternalStore} from "react";
import Link from "next/link";
import Image from "next/image";
import logoImage from "@/public/Logo.png";
import { domAnimation, LazyMotion, m } from "motion/react";
import PageLayout from "@/components/layout/PageLayout";
import LocationIconSvg from "@/components/svgs/LocationIconSVG";
import StarIconSvg from "@/components/svgs/StarIconSVG";
import BulbIconSvg from "@/components/svgs/BulbIconSVG";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { Check, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";
import useGameStore from "@/store/game-store";
import { useGetGameStatusQuery } from "@/hooks/queries/get-game-status-query";
import LoadingScreen from "@/components/common/LoadingScreen";
import RoundScoreButton from "@/components/game/RoundScoreButton";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useGetPageDataQuery } from "@/hooks/queries/get-page-data-query";
import { QuestionResultContentResponse } from "@/types/page-data-types";
import usePopupStore from "@/store/popup-store";
import PointInfoDialog from "@/components/game/PointInfoDialog";


export default function Page() {
  const [activeTab, setActiveTab] = useState("correct");
  const { resultData } = useGameStore();
  const { setPopup } = usePopupStore();

  const { data: pageContent, isLoading: pageContentLoading } =
    useGetPageDataQuery<QuestionResultContentResponse>("question_result_page");
  
  const router = useRouter();

  const { game_id } = useGameStore();

  // Wait for the persisted store to rehydrate from localStorage before
  // guarding, otherwise game_id is still null on first paint and we redirect
  // to /dashboard even when a game is in progress.
  const hydrated = useSyncExternalStore(
    (onStoreChange) => useGameStore.persist.onFinishHydration(onStoreChange),
    () => useGameStore.persist.hasHydrated(),
    () => false,
  );

  useEffect(() => {
    if (!hydrated) return;
    if (!game_id) {
      router.push("/dashboard");
    }
  }, [hydrated, game_id, router]);

  const { data, isLoading } = useGetGameStatusQuery();

  if (isLoading || pageContentLoading) {
    return <LoadingScreen />;
  }

  return (
    <PageLayout className="max-w-screen min-h-screen flex flex-col justify-between overflow-hidden">
      <LazyMotion features={domAnimation}>
        <div className="py-10 max-w-100 mx-auto w-full">
          <nav className="flex justify-between items-center">
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 80,
                mass: 1,
                damping: 20,
              }}
            >
              <Link href="/dashboard">
                <Image
                  src={logoImage}
                  height={80}
                  width={80}
                  alt="logo"
                  className="size-20 object-contain"
                />
              </Link>
            </m.div>
          </nav>
        </div>
        <m.div
          initial={{ opacity: 0, y: 300 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, mass: 1, damping: 20 }}
          className="relative text-white container mx-auto max-w-100 h-full min-h-max flex flex-col justify-center"
        >
          <div className="gradient-background w-full rounded-t-2xl px-3">
            <div className="space-y-6 max-w-sm mx-auto py-6 relative">
              <div className="space-y-0">
                <p className="text-2xl font-medium">{resultData?.city}</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <LocationIconSvg className="size-3" />
                    <p className="text-[10px]">
                      {resultData?.state ? resultData.state : "______"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarIconSvg />
                    <p className="text-[10px]">
                      {resultData?.city_aka
                        ? resultData?.city_aka
                        : "____________"}
                    </p>
                  </div>
                </div>
              </div>
              <m.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  mass: 1,
                  damping: 20,
                }}
                className="w-full"
              >
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  defaultValue="correct"
                  className="w-full max-w-sm rounded-lg text-white overflow-hidden"
                >
                  <TabsList className="grid h-18 w-full grid-cols-2 mb-[-0.5px] gap-5 shadow-none  bg-transparent p-0">
                    <TabsTrigger
                      value="correct"
                      className={cn(
                        "h-full cursor-pointer shadow-none gap-3 rounded-t-lg rounded-b-none bg-black/20" +
                          " px-5 text-xs data-[state=active]:bg-black/40 data-[state=active]:shadow-none" +
                          " data-active:shadow-none data-[state=active]:text-white" +
                          " data-[state=active]:hover:text-white/80 py-2 text-white/40 hover:text-white/50",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-5 items-center justify-center rounded-full" +
                            " text-[#071521]",
                          activeTab === "correct"
                            ? "text-white bg-success"
                            : "bg-white/40",
                        )}
                      >
                        <Check className="size-3 stroke-3" />
                      </span>
                      {pageContent?.data?.question_result?.tabs?.correct} (
                      {resultData?.correct_answers.length || 0})
                    </TabsTrigger>

                    {resultData && resultData?.wrong_answers.length > 0 && (
                      <TabsTrigger
                        value="missed"
                        className="h-full cursor-pointer shadow-none gap-3 rounded-t-lg rounded-b-none bg-black/20 px-5 text-xs data-[state=active]:bg-black/40 data-[state=active]:shadow-none data-[state=active]:text-white data-[state=active]:hover:text-white/80 py-2 text-white/40 hover:text-white/50"
                      >
                        <span
                          className={cn(
                            "flex size-5 items-center justify-center rounded-full" +
                              " text-[#071521]",
                            activeTab === "missed"
                              ? "text-white bg-error"
                              : "bg-white/40",
                          )}
                        >
                          <X className="size-3 stroke-3" />
                        </span>
                        {pageContent?.data?.question_result?.tabs?.missed} (
                        {resultData?.wrong_answers.length || 0})
                      </TabsTrigger>
                    )}
                  </TabsList>

                  <TabsContent
                    value="correct"
                    className={cn(
                      "p-4 -mt-0.5 bg-black/40 min-h-74.25 shadow-none",
                      resultData?.wrong_answers.length === 0 && "rounded-tr-lg",
                    )}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {resultData?.correct_answers.map((answer) => (
                        <div key={answer.id} className="space-y-2">
                          <div className="rounded overflow-hidden border-2 border-success">
                            <Image
                              src={answer.image_url}
                              alt={answer.label}
                              height={200}
                              width={200}
                              className="aspect-146/88 object-cover"
                            />
                          </div>
                          <p className="text-white text-xs">{answer.label}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="missed"
                    className="p-4 -mt-0.5 bg-black/40 min-h-74.25 shadow-none"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {resultData?.wrong_answers.map((answer) => (
                        <div key={answer.id} className="space-y-2">
                          <div className="rounded overflow-hidden border-2 border-error">
                            <Image
                              src={answer.image_url}
                              alt={answer.label}
                              height={200}
                              width={200}
                              className="aspect-146/88 object-cover"
                            />
                          </div>
                          <p className="text-white text-xs">{answer.label}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </m.div>

              <div className="bg-linear-to-b from-[#0D1F35] to-[#020E23] rounded p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <BulbIconSvg />
                  <p>{pageContent?.data?.question_result?.message_2}</p>
                </div>
                <ul className="list-disc ml-4 text-[10px] space-y-0.5">
                  {resultData?.trivia.map((fact, index) => (
                    <li key={index}>{fact}</li>
                  ))}
                </ul>
              </div>

              <m.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  mass: 1,
                  damping: 20,
                }}
                className="absolute -top-16 right-0 bg-[linear-gradient(to_right,#BE951A_0%,#FFFCF3_25%,var(--color-primary-yellow)_50%,#FFFCF3_75%,#BE951A_100%)] p-0.5 rounded-lg max-w-42 shadow-lg shadow-primary-yellow/40"
              >
                <div className="bg-[#011C36] relative p-4 rounded-lg text-white/60 text-right space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <button
                      aria-label="Info-button"
                      className="text-primary-yellow cursor-pointer p-0 text-sm"
                      onClick={() => {
                        setPopup(true);
                      }}
                    >
                      <Info size={16}/>
                    </button>
                  <p className="text-xs">
                    {pageContent?.data?.question_result?.message_1}
                  </p>
                  </div>
                  <p className="text-2xl">
                    <span className="text-primary-yellow text-3xl">
                      {resultData?.score_display.split("/")[0] || 0}
                    </span>
                    /{resultData?.score_display.split("/")[1] || 0}{" "}
                    <span className="text-base">PTS</span>
                  </p>

                </div>
              </m.div>
            </div>
          </div>

          <div className="gradient-background py-6 px-3">
            <div className="space-y-6 max-w-sm mx-auto">
              <p className="text-sm font-medium">
                {pageContent?.data?.question_result?.message_3}{" "}
                {data?.data?.questions_finished || 0}{" "}
                {pageContent?.data?.question_result?.message_4}{" "}
                {data?.data?.remaining_questions || 0}{" "}
                {pageContent?.data?.question_result?.message_5}
              </p>

              <div className="relative h-1 bg-linear-to-r from-transparent via-primary-blue/40 via-50% to-transparent w-full">
                <m.div
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${((data?.data?.questions_finished as number) / (data?.data?.total_questions as number) || 0) * 100}%`,
                  }}
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 80,
                    mass: 1,
                  }}
                  className="absolute h-full left-0 top-0 bg-primary-yellow"
                ></m.div>
              </div>

              <Suspense
                fallback={<Skeleton className="h-12.5 w-full rounded-full" />}
              >
                <RoundScoreButton
                  isThirdQuestion={data?.data?.questions_finished === 2}
                  playText={
                    pageContent?.data?.question_result?.button?.button_1 || ""
                  }
                  resultText={
                    pageContent?.data?.question_result?.button?.button_2 || ""
                  }
                  showResult={
                    data?.data?.questions_finished ===
                      data?.data?.total_questions ||
                    data?.data?.status === "completed"
                  }
                />
              </Suspense>
            </div>
          </div>
        </m.div>
        <PointInfoDialog/>
      </LazyMotion>
    </PageLayout>
  );
}
