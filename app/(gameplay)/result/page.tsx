import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import Container from "@/components/layout/Container";
import ResultConfetti from "@/components/game/ResultConfetti";
import Image from "next/image";

import confetti from "@/public/assets/common/confettie.png";

import ResultPageButtons from "@/components/game/ResultPageButtons";
import ResultScoreSection from "@/components/result/ResultScoreSection";

export default function Page() {
  return (
    <PageLayout className="overflow-y-scroll">
      <Container className="relative">
        <div className="absolute -top-7 -left-7 md:left-0 z-0">
          <Image src={confetti} height={200} width={200} alt="" />
        </div>
        <div className="absolute -top-7 -right-7 md:right-0 rotate-y-180">
          <Image src={confetti} height={200} width={200} alt="" />
        </div>
        <ResultConfetti />

        <div className="z-10 absolute size-full inset-0">
          <div className="py-10 max-w-xs mx-auto space-y-6 text-white relative min-h-screen h-max">
            <ResultScoreSection />
            <div className="space-y-2">
              <ResultPageButtons />
            </div>
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}
