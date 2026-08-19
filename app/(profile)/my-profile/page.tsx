"use client";
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import Container from "@/components/layout/Container";
import { Share2 } from "lucide-react";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import BackButton from "@/components/common/BackButton";
import { useGetProfileQuery } from "@/hooks/queries/get-profile-query";
import LoadingScreen from "@/components/common/LoadingScreen";
import { LogOut } from "lucide-react";
import { useLogoutMutation } from "@/hooks/mutations/logout-mutation";
import GoogleSigningPage from "@/components/auth/GoogleSigningPage";
import { useGetPageDataQuery } from "@/hooks/queries/get-page-data-query";
import { DashboardData, ProfileContentResponse } from "@/types/page-data-types";
import { useRouter } from "next/navigation";
import LeaderboardIconSvg from "@/components/svgs/LeaderboardIconSVG";
import leafLeft from "@/public/assets/profile/crown-leaf-left.png";
import leafRight from "@/public/assets/profile/crown-leaf-right.png";

export type Stats = {
  tries: number;
  percentage: number;
  times: number;
};

export default function Page() {
  const router = useRouter();
  const logoutMutation = useLogoutMutation();

  const { data, isLoading } = useGetProfileQuery();

  const { isLoading: dashboardLoading, data: dashboardData } =
    useGetPageDataQuery<DashboardData>("dashboard_page");

  const { data: pageContent, isLoading: pageContentLoading } =
    useGetPageDataQuery<ProfileContentResponse>("signin_page");

  if (isLoading || pageContentLoading || dashboardLoading) {
    return <LoadingScreen />;
  }

  if (data?.data?.user?.is_guest) {
    return <GoogleSigningPage />;
  }

  const profileData = data?.data;

  const stats: { statNumber: string | number; description: string }[] = [
    {
      statNumber: profileData?.game_stats?.games_played || 0,
      description: `🎮 ${pageContent?.data?.signin?.profile?.stats?.box_1 || ""}`,
    },
    // {
    //   statNumber: profileData?.game_stats?.first_attempt_wins || 0,
    //   description: `🏆 ${pageContent?.data?.signin?.profile?.stats?.box_2}`,
    // },
    // {
    //   statNumber: profileData?.game_stats?.average_score || 0,
    //   description: `${pageContent?.data?.signin?.profile?.stats?.box_3}`,
    // },
    // {
    //   statNumber: profileData?.game_stats?.best_score || 0,
    //   description: `🥇 ${pageContent?.data?.signin?.profile?.stats?.box_4}`,
    // },
    {
      statNumber: profileData?.game_stats?.current_streak || 0,
      description: `🔥 ${pageContent?.data?.signin?.profile?.stats?.box_5 || ""}`,
    },
    {
      statNumber: profileData?.game_stats?.highest_streak || 0,
      description: `⚡ ${pageContent?.data?.signin?.profile?.stats?.box_6 || ""}`,
    },
  ];

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "Welcome to Travel9 City Quest",
        url: process.env.NEXT_PUBLIC_BASE_URL,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <PageLayout>
      <Container className="py-10 space-y-10">
        <nav className="flex justify-between items-center text-white">
          <BackButton />
          {/*<button className="cursor-pointer">*/}
          {/*  <Menu />*/}
          {/*</button>*/}
        </nav>
        <div className="max-w-sm mx-auto space-y-10">
          <div className="flex gap-6 text-white">
            <div className="rounded-full bg-white overflow-hidden size-25">
              {profileData && (
                <Image
                  src={profileData?.user?.image || ""}
                  height={200}
                  width={200}
                  alt=""
                  className="size-25 object-cover"
                />
              )}
            </div>
            <div className="flex flex-col gap-1 justify-center">
              <p className="text-2xl">
                {pageContent?.data?.signin?.profile?.message_3},{" "}
              </p>
              <p className="text-2xl font-semibold">{data?.data?.user?.name}</p>
            </div>
          </div>

          <div className="w-full bg-[linear-gradient(to_right,#BE951A_0%,#FFFCF3_25%,var(--color-primary-yellow)_50%,#FFFCF3_75%,#BE951A_100%)] p-0.5 rounded-lg shadow-[0_0_35px_0_color-mix(in_srgb,var(--color-primary-yellow)_30%,transparent)]">
            <div className="bg-[#011C36] p-5 rounded-lg text-white/60 space-y-5 relative">
              <div className="text-center space-y-1.5 mb-7">
                <p className="text-white/60 text-xs font-poppins">{pageContent?.data?.signin?.profile?.message?.message_1}</p>
                <p className="text-white/60 text-2xl">
                  <span className="text-primary-yellow text-4xl">{data?.data?.game_stats?.total_score}</span>
                </p>
              </div>
              <div className="w-4/5 mx-auto bg-linear-to-r from-transparent via-[#F4DB89] to-transparent h-px" />
              <div className="flex items-center justify-center gap-4">
                <div className="flex flex-col items-center gap-0.5 text-center">
                  <Image
                    src={data?.data?.earned_badges[0]?.icon as string}
                    alt=""
                    height={200}
                    width={200}
                    className="size-9 object-contain"
                  />
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-white/60 text-[10px]">
                      {pageContent?.data?.signin?.profile?.message?.message_2}
                    </p>
                    <p className="text-quest-yellow font-medium">{data?.data?.earned_badges[0]?.name}</p>
                  </div>
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

          <div className="squircle p-6 gradient-background space-y-6">
            <h1 className="text-center font-medium text-xl text-white">
              My Stats
            </h1>
            <div className="grid grid-cols-3 gap-3">
              {stats.map((item, index) => (
                <div
                  key={`stat-${index}`}
                  className="text-center rounded-xl p-2 aspect-square shadow-xl flex flex-col items-center bg-white justify-center"
                >
                  <p className="text-2xl text-[#0A0028]">{item.statNumber}</p>
                  <p className="text-xs font-light">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <Button
                onClick={() => handleShare()}
                className="bg-linear-to-t shadow-lg from-dark-yellow to-primary-yellow hover:opacity-80 border-none text-black font-normal cursor-pointer flex gap-2 px-5 h-9 rounded-xl"
              >
                {pageContent?.data?.signin?.profile?.stats?.box_7} <Share2 />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => {
                router.push("/leaderboard");
              }}
              variant={"primary-grey"}
              size="primary"
              className="flex gap-2"
            >
              <LeaderboardIconSvg />
              {dashboardData?.data?.dashboard?.button?.button_4}
            </Button>
            <Button
              onClick={() => logoutMutation.mutate()}
              size="primary"
              className="border-2 rounded-full flex gap-2 items-center text-quest-yellow border-dark-yellow bg-linear-to-r from-primary-yellow/20 to-dark-yellow/20 cursor-pointer"
            >
              {pageContent?.data?.signin?.profile?.stats?.button?.button_5}{" "}
              <LogOut className="stroke-2" />
            </Button>
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}
