import React, { Suspense } from "react";
import PageLayout from "@/components/layout/PageLayout";
import Container from "@/components/layout/Container";
import Image from "next/image";
import logoImage from "@/public/Logo.png";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import PrimaryButtonSkeleton from "@/components/skeletons/PrimaryButtonSkeleton";


export default function GoogleSigningPage() {

  return (
    <PageLayout>
      <Container className="py-10 h-screen flex items-center justify-center">
        <div className="py-10 px-4 squircle gradient-background shadow-lg space-y-10 max-w-sm w-full">
          <Image
            src={logoImage}
            alt=""
            height={160}
            width={160}
            className="size-40 mx-auto object-contain"
          />
          <Suspense fallback={<PrimaryButtonSkeleton />}>
            <GoogleLoginButton />
          </Suspense>
        </div>
      </Container>
    </PageLayout>
  );
}
