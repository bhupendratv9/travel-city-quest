"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Container from "@/components/layout/Container";
import TopLeaders from "@/components/profile/TopLeaders";
import NormalLeaders from "@/components/profile/NormalLeaders";
import PageLayout from "@/components/layout/PageLayout";
import BackButton from "@/components/common/BackButton";
import { LeaderboardResponse } from "@/types/leaderboard-types";
import GoogleSigningPage from "@/components/auth/GoogleSigningPage";
import LoadingScreen from "@/components/common/LoadingScreen";
import {useGetPageDataQuery} from "@/hooks/queries/get-page-data-query";
import { LeaderboardContentResponse} from "@/types/page-data-types";
import useAuthStore from "@/store/auth-store";

export default function Page() {
  const [activeTab, setActiveTab] =
    useState<LeaderboardResponse["type"]>("all_time");
  const {isGuest} = useAuthStore();

  const { data: pageContent, isLoading: pageContentLoading } =
    useGetPageDataQuery<LeaderboardContentResponse>("leaderboard_page")

  if (isGuest) {
    return <GoogleSigningPage />;
  }

  if (pageContentLoading) {
    return <LoadingScreen/>
  }

  return (
    <PageLayout>
      <div className="py-10">
        <Container>
          <div className="max-w-md mx-auto space-y-6">
            <div className="flex gap-3 items-center text-white">
              <BackButton />
              <p className="text-xl">{pageContent?.data?.leaderboard?.message_1}</p>
            </div>
            <Tabs
              value={activeTab}
              onValueChange={(value) =>
                setActiveTab(value as LeaderboardResponse["type"])
              }
              className="w-full"
            >
              <TabsList className="bg-black text-white w-full rounded-full">
                <TabsTrigger
                  value="all_time"
                  className="rounded-full text-white/60 hover:text-white/45 data-active:hover:text-white/80 font-normal data-active:bg-main-text data-active:text-white"
                >
                  {pageContent?.data?.leaderboard?.button?.button_1}
                </TabsTrigger>
                <TabsTrigger
                  value="this_week"
                  className="rounded-full text-white/60 hover:text-white/45 data-active:hover:text-white/80 font-normal data-active:bg-main-text data-active:text-white"
                >
                  {pageContent?.data?.leaderboard?.button?.button_2}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all_time">
                <TopLeaders activeTab={activeTab} />
              </TabsContent>
              <TabsContent value="this_week">
                <TopLeaders activeTab={activeTab} />
              </TabsContent>
            </Tabs>
          </div>
        </Container>
      </div>
      <Container>
        <div className="max-w-sm mx-auto">
          {activeTab === "all_time" && (
            <>
              <NormalLeaders activeTab={activeTab} />
            </>
          )}
          {activeTab === "this_week" && (
            <>
              <NormalLeaders activeTab={activeTab} />
            </>
          )}
        </div>
      </Container>
    </PageLayout>
  );
}
