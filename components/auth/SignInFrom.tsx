"use client";

import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import Link from "next/link";
import Image from "next/image";
import logoImage from "@/public/Logo.png";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import OrDivider from "@/components/common/OrDivider";
import { useRouter, useSearchParams } from "next/navigation";
import { useCreateQueryString } from "@/hooks/use-create-query-string";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import { useGetPageDataQuery } from "@/hooks/queries/get-page-data-query";
import { ProfileContentResponse } from "@/types/page-data-types";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCreateQueryString();

  const { data: pageContent, isLoading: pageContentLoading } =
    useGetPageDataQuery<ProfileContentResponse>("signin_page");

  return (
    <PageLayout>
      <Container className="py-10">
        <nav className="flex justify-between items-center">
          <Link href="/dashboard">
            <Image
              src={logoImage}
              height={80}
              width={80}
              className="size-20 object-contain"
              alt="logo"
            />
          </Link>
        </nav>

        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="squircle py-10 px-4 gradient-background shadow-lg w-full max-w-sm space-y-6 text-white">
            <h3 className="font-medium sm">{pageContent?.data?.signin?.message_m}</h3>
            <div className="space-y-4">
              <GoogleLoginButton />
              <p className="text-xs opacity-50 text-center">{pageContent?.data?.signin?.googleform?.message}</p>
            </div>

            <OrDivider
              title={pageContent?.data?.signin?.otpform?.message_0 || "or"}
            />

            <div className="space-y-2">
              <div className="flex items-center justify-center">
                {pageContentLoading ? (
                  <Skeleton className="w-40 h-4 rounded-full" />
                ) : (
                  <Button
                    onClick={() => {
                      router.push(
                        "/guest-signup?" +
                        createQueryString(
                          "from",
                          searchParams.get("from") || "",
                        ),
                      );
                    }}
                    variant="ghost"
                    className="font-semibold text-quest-yellow text-sm cursor-pointer"
                  >
                    {pageContent?.data?.signin?.guestform?.button}
                  </Button>
                )}
              </div>
              <p className="text-xs opacity-50 text-center">{pageContent?.data?.signin?.guestform?.message}</p>
            </div>


          </div>
        </div>
      </Container>
    </PageLayout>
  );
}
