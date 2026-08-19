import { Suspense } from "react";
import SignInForm from "@/components/auth/SignInFrom";
import LoadingScreen from "@/components/common/LoadingScreen";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";
import { getPageData } from "@/hooks/queries/get-page-data-query";
import { ProfileContentResponse } from "@/types/page-data-types";

export default async function Page() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["page-data"],
    queryFn: () => getPageData<ProfileContentResponse>("signin_page"),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingScreen />}>
        <SignInForm />
      </Suspense>
    </HydrationBoundary>
  );
}
