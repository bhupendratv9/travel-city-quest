"use client";
import React, { Suspense } from "react";
import HelpIconDarkSvg from "@/components/svgs/HelpIconDarkSVG";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import DashboardStartGame from "@/components/game/DashboardStartGame";
import { useGetPageDataQuery } from "@/hooks/queries/get-page-data-query";
import { DashboardData } from "@/types/page-data-types";
import PrimaryButtonSkeleton from "@/components/skeletons/PrimaryButtonSkeleton";
import LeaderboardIconSvg from "@/components/svgs/LeaderboardIconSVG";
import {cn} from "@/lib/utils";
import {useGetUserQuery} from "@/hooks/queries/get-user-query";

export default function DashboardButtons() {
  const router = useRouter();
  const {data:userData, isLoading:userLoading} = useGetUserQuery()

  const { isLoading, data } =
    useGetPageDataQuery<DashboardData>("dashboard_page");

  if (isLoading || userLoading) {
    return (
      <>
        {Array.from({ length: 3 }).map((_, index) => (
          <PrimaryButtonSkeleton key={index} />
        ))}
      </>
    );
  }

  const buttons: {
    variant:
      | "primary"
      | "primary-grey"
      | "link"
      | "default"
      | "outline"
      | "secondary"
      | "ghost"
      | "destructive"
      | null
      | undefined;
    label: string;
    icon: React.ReactNode;
    href: string;
    hidden?: boolean;
  }[] = [
    {
      variant: "primary-grey",
      label: data?.data?.dashboard?.button?.button_3 || "",
      icon: <HelpIconDarkSvg />,
      href: "/how-to-play",
      hidden: false,
    },
    {
      variant: "primary-grey",
      label: data?.data?.dashboard?.button?.button_4 || "",
      icon: <LeaderboardIconSvg />,
      href: "/leaderboard",
      hidden: userData?.data ? userData?.data?.is_guest : true,
    },
  ];

  return (
    <>
      <Suspense fallback={<PrimaryButtonSkeleton />}>
        <DashboardStartGame />
      </Suspense>

      {buttons.map((button, index) => (
        <Button
          onClick={() => {
            router.push(button.href);
          }}
          key={index}
          variant={button.variant}
          size="primary"
          className={cn("flex gap-2", button.hidden && "hidden")}
        >
          {button.icon && button.icon}
          {button.label}
        </Button>
      ))}
    </>
  );
}
