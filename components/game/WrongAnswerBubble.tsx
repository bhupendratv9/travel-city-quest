import React from "react";
import {domAnimation, LazyMotion, m} from "motion/react";

export default function WrongAnswerBubble() {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ type: "spring", damping: 20, stiffness: 80, mass: 1 }}
        className="absolute top-1/2 left-1/2 -translate-1/2 rounded-full"
      >
        <div className="border-2 rounded-full bg-linear-to-t from-[#0F1836]/60 to-wrong/75 border-wrong size-20  flex items-center justify-center shadow-[0_0_25px_5px] shadow-wrong/50">
          -10
        </div>
      </m.div>
    </LazyMotion>
  );
}
