"use client";
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import Image from "next/image";
import logo from "@/public/Logo.png";
import { LazyMotion, domAnimation, m } from "motion/react";

export default function LoadingScreen() {
  return (
    <PageLayout className="h-screen flex items-center justify-center">
      <LazyMotion features={domAnimation}>
        <m.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 80, mass: 1 }}
          className="size-32 animate-pulse"
        >
          <Image src={logo} alt="" />
        </m.div>
      </LazyMotion>
    </PageLayout>
  );
}
