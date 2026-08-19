"use client";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { domAnimation, LazyMotion, m } from "motion/react";
import { getBackTarget } from "@/lib/navigation-history";

export default function BackButton() {
  const router = useRouter();
  return (
    <LazyMotion features={domAnimation}>
      <m.button
        whileHover={{ scale: 0.98 }}
        onClick={() => {
          const target = getBackTarget();
          if (target.mode === "back") {
            router.back();
          } else {
            router.push(target.href);
          }
        }}
        className="p-2 bg-white/10 rounded-lg cursor-pointer"
      >
        <ChevronLeft color="#ffffff" />
      </m.button>
    </LazyMotion>
  );
}
