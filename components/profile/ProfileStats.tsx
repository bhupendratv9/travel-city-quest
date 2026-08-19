"use client";
import React from "react";
import { LazyMotion, m, domAnimation } from "motion/react";
import { Stats } from "@/app/(profile)/my-profile/page";

export default function ProfileStats({
  achievementData,
}: {
  achievementData: Stats[];
}) {
  return (
    <LazyMotion features={domAnimation}>
      {achievementData.map((achievement, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="relative h-10 flex-1">
            <div className="absolute inset-y-0 left-3 right-0 rounded-xl bg-white shadow-sm overflow-hidden">
              <m.div
                initial={{ width: 0 }}
                animate={{ width: `${achievement.percentage}%` }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="h-full rounded-xl bg-primary-yellow shadow-[0_0_25px_rgba(0,0,0,0.4)] transition-all"
              />
            </div>

            {/* Badge */}
            <div className="absolute left-0 top-1/2 z-10 flex size-6 -translate-y-1/2 items-center justify-center rounded-full bg-primary-yellow text-black shadow-[0_0_25px_rgba(0,0,0,0.4)]">
              {achievement.tries}
            </div>

            {/* Percentage label */}
            <div
              className="absolute inset-y-0 z-20 flex items-center text-sm text-black"
              style={{
                left:
                  achievement.percentage > 17
                    ? `calc(12px + ${achievement.percentage}% - 2.5rem)`
                    : "1.75rem",
              }}
            >
              {achievement.percentage}%
            </div>
          </div>

          <div className="flex size-10 items-center justify-center rounded-xl bg-[#ECECEC] text-black">
            {achievement.times}
          </div>
        </div>
      ))}
    </LazyMotion>
  );
}
