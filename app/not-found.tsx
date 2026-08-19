"use client";
import React from "react";
import { domAnimation, LazyMotion, m } from "motion/react";
import Image from "next/image";
import logo from "@/public/Logo.png";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { useRouter } from "next/navigation";
import Container from "@/components/layout/Container";

export default function NotFound() {
  const { push } = useRouter();
  return (
    <PageLayout className="h-screen flex flex-col gap-4 items-center justify-center">
      <Container className="max-w-sm w-full mx-auto space-y-10">
        <LazyMotion features={domAnimation}>
          <m.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 80, mass: 1 }}
            className="size-32 mx-auto"
          >
            <Image src={logo} alt="" />
          </m.div>

          <m.div
            initial={{ scale: 0, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 80, mass: 1 }}
            className="w-full space-y-10"
          >
            <m.p className="text-error text-center text-2xl font-semibold">
              404 - Page Not Found
            </m.p>
            <Button
              onClick={() => {
                push("/dashboard");
              }}
              size="primary"
              className="border-2 rounded-full flex gap-2 items-center text-quest-yellow border-dark-yellow bg-linear-to-r from-primary-yellow/20 to-dark-yellow/20 cursor-pointer"
            >
              <House /> <span>Back to Homepage</span>
            </Button>
          </m.div>
        </LazyMotion>
      </Container>
    </PageLayout>
  );
}
