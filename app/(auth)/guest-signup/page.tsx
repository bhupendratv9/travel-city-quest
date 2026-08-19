import React, { Suspense } from "react";
import Container from "@/components/layout/Container";
import PageLayout from "@/components/layout/PageLayout";

import GuestSignupForm from "@/components/profile/GuestSignupForm";
import { getQueryClient } from "@/app/get-query-client";
import { getAvatars } from "@/hooks/queries/get-avatar-query";
import BackButton from "@/components/common/BackButton";
import LoadingScreen from "@/components/common/LoadingScreen";
import {getPageData} from "@/hooks/queries/get-page-data-query";
import {ProfileContentResponse} from "@/types/page-data-types";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";

export default async function Page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["avatars"],
    queryFn: () => getAvatars(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["page-data"],
    queryFn: () => getPageData<ProfileContentResponse>("signin_page"),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <Suspense fallback={<LoadingScreen />}>
      <PageLayout>
        <Container className="py-10">
          <nav className="flex justify-between items-center">
            <BackButton />
          </nav>
          <div className="flex items-center justify-center min-h-[80vh]">
            <GuestSignupForm />
          </div>
        </Container>
      </PageLayout>
    </Suspense>
    </HydrationBoundary>
  );
}
