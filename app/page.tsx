"use client";
import Container from "@/components/layout/Container";
import logoImage from "@/public/Logo.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import PlayIconSvg from "@/components/svgs/PlayIconSVG";
import { domAnimation, LazyMotion, m } from "motion/react";
import PageLayout from "@/components/layout/PageLayout";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <PageLayout className="h-screen relative">
      <Container
        className={
          "flex flex-col items-center justify-center py-10 h-full text-white max-w-sm"
        }
      >
        <LazyMotion features={domAnimation}>
          <div className="gap-6 flex flex-col items-center">
            <m.div
              initial={{ opacity: 0, scale: 0, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                opacity: {
                  type: "spring",
                  stiffness: 80,
                  mass: 1,
                  damping: 20,
                },
                scale: { type: "spring", stiffness: 80, mass: 1, damping: 20 },
                y: {
                  type: "spring",
                  delay: 0.7,
                  stiffness: 80,
                  mass: 1,
                  damping: 20,
                },
              }}
            >
              <Image src={logoImage} height={200} width={200} alt="logo" />
            </m.div>
            <m.p
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                delay: 0.7,
                stiffness: 80,
                mass: 1,
                damping: 20,
              }}
              className={"text-center leading-7 text-sm"}
            >
              City Quest is an interactive quiz game where players identify
              cities based on iconic images. Each wrong guess unlocks additional
              hints until the player either guesses correctly or uses all
              attempts.
            </m.p>
          </div>

          <m.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              delay: 0.7,
              stiffness: 80,
              mass: 1,
              damping: 20,
            }}
            className="absolute bottom-10 max-w-sm w-full"
          >
            <Container>
              <Button
                onClick={() => router.push("/dashboard")}
                variant="primary"
                size={"primary"}
                className="flex gap-3 cursor-pointer "
              >
                <PlayIconSvg />
                <span>Play Now</span>
              </Button>
            </Container>
          </m.div>
        </LazyMotion>
      </Container>
    </PageLayout>
  );
}
