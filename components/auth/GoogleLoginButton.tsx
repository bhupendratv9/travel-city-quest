"use client";
import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useSignInMutation } from "@/hooks/mutations/sign-in-mutation";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import { toast } from "sonner";
import GoogleIconSvg from "@/components/svgs/GoogleIconSVG";
import { Button } from "@/components/ui/button";
import { useGetProfileQuery } from "@/hooks/queries/get-profile-query";
import PrimaryButtonSkeleton from "@/components/skeletons/PrimaryButtonSkeleton";
import useGameStore from "@/store/game-store";
import { useGetPageDataQuery } from "@/hooks/queries/get-page-data-query";
import { ProfileContentResponse } from "@/types/page-data-types";
import {axiosPublic} from "@/config/axiosConfig";
import {FullAxiosGoogleResponse} from "@/types/google-user-types";

export default function GoogleLoginButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const loginMutation = useSignInMutation();

  const { game_id } = useGameStore();
  const redirectUrl = searchParams.get("from");

  const { data: pageContent, isLoading: pageContentLoading } =
    useGetPageDataQuery<ProfileContentResponse>("signin_page");

  const { data, isLoading } = useGetProfileQuery();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const response: FullAxiosGoogleResponse = await axiosPublic.get("https://www.googleapis.com/oauth2/v3/userinfo",{
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      })

      const formData = new FormData();

      formData.append("type", "google");
      formData.append("name", response?.data?.name);
      formData.append("email", response?.data?.email as string);
      formData.append("picture", response?.data?.picture);
      formData.append("google_id", response?.data?.sub);
      if (data?.data?.user && data?.data?.user?.is_guest) {
        formData.append("guest_id", String(data?.data?.user?.id));
      }
      if (game_id) {
        formData.append("game_id", game_id);
      }

      loginMutation.mutate(formData, {
        onSuccess: async () => {
          if (redirectUrl === "/leaderboard" || redirectUrl === "/my-profile") {
            router.push(redirectUrl);
            router.refresh();
          }
          if(pathname !== "/sign-in") {
            router.push(redirectUrl || pathname);
          }
          if(pathname !== "/guest-signup") {
            router.push(redirectUrl || pathname);
          }
          router.refresh();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    },
  });

  if (isLoading || pageContentLoading) {
    return <PrimaryButtonSkeleton />;
  }
  return (
    <Button
      onClick={() => {
        googleLogin();
      }}
      variant="outline"
      type="submit"
      size="primary"
      className="rounded-full border-white bg-main-text text-white flex gap-2 items-center hover:text-main-text cursor-pointer"
    >
      <GoogleIconSvg />{" "}
      <span>{pageContent?.data?.signin?.googleform?.button}</span>
    </Button>
  );
}
