import React from "react";
import { m } from "motion/react";

export const blockVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 80,
      mass: 1,
    },
  },
};

type Props = {
  step: number;
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function HowToPlayStepBlock({
  step,
  title,
  description,
  children,
}: Props) {
  return (
    <m.div
      variants={blockVariants}
      className="gradient-background p-2.5 rounded-lg w-full space-y-3.5"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center bg-[#B2EFFE] text-main-text size-6 text-xs rounded-full">
            {step}
          </div>
          <p className="font-medium">{title}</p>
        </div>
        <p className="text-xs">
          {description}
        </p>
      </div>
      {children}
    </m.div>
  );
}