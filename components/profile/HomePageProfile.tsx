"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetProfileQuery } from "@/hooks/queries/get-profile-query";
import HomeProfileSkeleton from "@/components/skeletons/HomeProfileSkeleton";
import {useGetPageDataQuery} from "@/hooks/queries/get-page-data-query";
import {DashboardData} from "@/types/page-data-types";

export default function HomePageProfile() {
  const { data, isLoading } = useGetProfileQuery();

  const { data:content, isLoading:contentLoading } =
    useGetPageDataQuery<DashboardData>("dashboard_page");

  if (isLoading || contentLoading) {
    return <HomeProfileSkeleton />;
  }

  return (
    <>
      {data?.status && data.status >= 400 ? (
        <>
        </>
      ) : (
        <Link href={"/my-profile"} className="flex gap-3 items-center">
          <div className="rounded-full size-12.5 overflow-hidden">
            <Image
              src={data?.data?.user?.image || ""}
              alt=""
              height={100}
              width={100}
              className="size-full object-cover"
            />
          </div>
          <p className="font-medium">
            {content?.data?.dashboard?.message_1}, <span className="font-bold">{data?.data?.user?.name}</span>
          </p>
        </Link>
      )}
    </>
  );
}
