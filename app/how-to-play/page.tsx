"use client";

import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import Container from "@/components/layout/Container";
import BackButton from "@/components/common/BackButton";
import Image from "next/image";
import { domAnimation, LazyMotion, m } from "motion/react";
import LocationIconSvg from "@/components/svgs/LocationIconSVG";

import logo from "@/public/Logo.png";
import mumbaiCity from "@/public/assets/how-to-play/mumbai.png";
import selectCity from "@/public/assets/how-to-play/select.png";
import pointStars from "@/public/assets/how-to-play/pointStars.png";
import cityOne from "@/public/assets/how-to-play/city-1.jpg";
import cityTwo from "@/public/assets/how-to-play/city-2.jpg";
import cityThree from "@/public/assets/how-to-play/city-3.jpg";
import cityFour from "@/public/assets/how-to-play/city-4.jpg";
import BulbIconSvg from "@/components/svgs/BulbIconSVG";
import { Button } from "@/components/ui/button";
import PlayIconSvg from "@/components/svgs/PlayIconSVG";
import Link from "next/link";
import HowToPlayStepBlock, {
  blockVariants,
} from "@/components/how-to-play/HowToPlayStepBlock";
import { useGetPageDataQuery } from "@/hooks/queries/get-page-data-query";
import { HowToPlayResponse } from "@/types/page-data-types";
import LoadingScreen from "@/components/common/LoadingScreen";

export default function Page() {
  const { data, isLoading } =
    useGetPageDataQuery<HowToPlayResponse>("how_to_play_page");

  const pageContent = data?.data?.how_to_play;

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <PageLayout>
      <Container className="max-w-sm lg:max-w-md w-full mx-auto space-y-6 text-white">
        <LazyMotion features={domAnimation}>
          <div className="space-y-6 pt-10 pb-6">
            <div className="flex gap-3 items-center">
              <BackButton />
              <p className="text-xl">{pageContent?.title}</p>
            </div>

            <m.div
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } },
              }}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <m.div
                variants={blockVariants}
                className="p-5 flex items-center gap-4 gradient-background rounded-xl h-full w-full"
              >
                <div className="h-20 min-w-18.75">
                  <Image
                    src={logo}
                    height={80}
                    width={80}
                    alt=""
                    priority
                    className="size-full object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm text-white leading-5">
                    {pageContent?.intro?.message}
                  </p>
                </div>
              </m.div>

              <HowToPlayStepBlock
                step={1}
                title={pageContent?.step_1?.title || ""}
                description={pageContent?.step_1?.description || ""}
              >
                <div className="rounded-lg relative overflow-hidden h-24.5">
                  <Image
                    src={mumbaiCity}
                    alt=""
                    height={200}
                    width={320}
                    priority
                    className="w-full object-cover h-24.5 object-center"
                  />
                  <div className="absolute inset-0 size-full bg-[#0D1F35]/80 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-[10px] text-white/60">
                        {pageContent?.step_1?.example?.label}
                      </p>
                      <div className="flex items-center gap-1">
                        <LocationIconSvg />
                        <p className="font-medium text-xl">
                          {pageContent?.step_1?.example?.city}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </HowToPlayStepBlock>
              <HowToPlayStepBlock
                step={2}
                title={pageContent?.step_2?.title || ""}
                description={pageContent?.step_2?.description || ""}
              >
                <div>
                  <Image src={selectCity} height={200} width={360} alt="" className="w-full" />
                </div>
              </HowToPlayStepBlock>
              <HowToPlayStepBlock
                step={3}
                title={pageContent?.step_3?.title || ""}
                description={pageContent?.step_3?.description || ""}
              >
                <div className="flex items-center gradient-background rounded-md pr-2.5">
                  <div className="flext justify-start">
                    <Image
                      src={pointStars}
                      alt=""
                      height={200}
                      width={320}
                      className="h-19 object-contain w-max"
                    />
                  </div>
                  <div className="py-2.5 flex flex-col gap-3.5 w-3/5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm">
                        {pageContent?.step_3?.points?.correct_pick}
                      </p>
                      <p className="text-sm text-success">+10</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">
                        {pageContent?.step_3?.points?.wrong_pick}
                      </p>
                      <p className="text-sm text-error">-10</p>
                    </div>
                  </div>
                </div>
              </HowToPlayStepBlock>
              <HowToPlayStepBlock
                step={4}
                title={pageContent?.step_4?.title || ""}
                description={pageContent?.step_4?.description || ""}
              >
                <div className="grid grid-cols-4 gap-2">
                  <div className="rounded-md bg-white/10">
                    <div className="aspect-square rounded-md overflow-hidden">
                      <Image
                        src={cityOne}
                        height={80}
                        width={80}
                        alt=""
                        className="object-cover size-full"
                      />
                    </div>
                    <div className="text-center py-2 space-y-1">
                      <p className="text-[10px]">
                        {pageContent?.step_4?.cities?.city_1}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-md bg-white/10">
                    <div className="aspect-square rounded-md overflow-hidden">
                      <Image
                        src={cityTwo}
                        height={80}
                        width={80}
                        alt=""
                        className="object-cover size-full"
                      />
                    </div>
                    <div className="text-center py-2 space-y-1">
                      <p className="text-[10px]">
                        {pageContent?.step_4?.cities?.city_2}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-md bg-white/10">
                    <div className="aspect-square rounded-md overflow-hidden">
                      <Image
                        src={cityThree}
                        height={80}
                        width={80}
                        alt=""
                        className="object-cover size-full"
                      />
                    </div>
                    <div className="text-center py-2 space-y-1">
                      <p className="text-[10px]">
                        {pageContent?.step_4?.cities?.city_3}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-md bg-white/10">
                    <div className="aspect-square rounded-md overflow-hidden">
                      <Image
                        src={cityFour}
                        height={80}
                        width={80}
                        alt=""
                        className="object-cover size-full"
                      />
                    </div>
                    <div className="text-center py-2 space-y-1">
                      <p className="text-[10px]">
                        {pageContent?.step_4?.cities?.city_4}
                      </p>
                    </div>
                  </div>
                </div>
              </HowToPlayStepBlock>
            </m.div>
          </div>

          <m.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 80, mass: 1 }}
            className="sm:rounded-t-lg gradient-background px-6 py-5 space-y-6"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <BulbIconSvg />
                <p>{pageContent?.tip?.title}</p>
              </div>
              <p className="text-xs">{pageContent?.tip?.message}</p>
            </div>
            <Link href="/dashboard" className="rounded-full">
              <Button
                size="primary"
                variant="primary"
                className="flex items-center gap-2"
              >
                <span>{pageContent?.button?.button_1}</span>
                <PlayIconSvg />
              </Button>
            </Link>
          </m.div>
        </LazyMotion>
      </Container>
    </PageLayout>
  );
}
