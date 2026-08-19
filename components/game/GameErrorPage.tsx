"use client";
import React from "react";
import { domAnimation, LazyMotion, m } from "motion/react";
import Image from "next/image";
import logo from "@/public/Logo.png";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { House } from "lucide-react";

type Props = {
  message?: string;
};

export default function GameErrorPage({ message }: Props) {
  const { push } = useRouter();
  return (
    <PageLayout className="h-screen flex flex-col gap-4 items-center justify-center">
      <LazyMotion features={domAnimation}>
        <m.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 80, mass: 1 }}
          className="size-32"
        >
          <Image src={logo} alt="" />
        </m.div>
        <m.p className="text-error text-center text-lg font-semibold italic">
          {message ? message : "No game found."}
        </m.p>
        <Button
          onClick={() => {
            push("/dashboard");
          }}
          size="primary"
          className="border-2 max-w-xs rounded-full flex gap-2 items-center text-quest-yellow border-dark-yellow bg-linear-to-r from-primary-yellow/20 to-dark-yellow/20 cursor-pointer"
        >
          <House /> <span>Back to Homepage</span>
        </Button>
      </LazyMotion>
    </PageLayout>
  );
}
