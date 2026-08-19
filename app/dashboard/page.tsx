import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import Container from "@/components/layout/Container";
import Image from "next/image";
import logo from "@/public/Logo.png";
import DashboardButtons from "@/components/profile/DashboardButtons";

import LanguageSelector from "@/components/common/LanguageSelector";
import HomePageProfile from "@/components/profile/HomePageProfile";
import DashboardDescription from "@/components/profile/DashboardDescription";

export default function Page() {
  return (
    <PageLayout>
      <Container className="py-10 flex flex-col gap-10 justify-center relative min-h-screen h-full">
        <nav className="absolute left-0 top-10 w-full">
          <Container className="flex justify-between items-center gap-5 text-white w-full">
            <div>
              <HomePageProfile />
            </div>
            <LanguageSelector />
          </Container>
        </nav>

        <div className="gradient-background flex flex-col justify-center items-center gap-6 p-4 py-10 max-w-sm mx-auto squircle w-full shadow-lg">
          <div className="w-23.5">
            <Image src={logo} alt="" className="w-full" />
          </div>
          <div className="w-full">
            <DashboardDescription />
          </div>
          <div className="space-y-1.5 w-full">
            <DashboardButtons />
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}
