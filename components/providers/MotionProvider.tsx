"use client";

import { MotionConfig } from "motion/react";

/**
 * Wraps the app in MotionConfig with `reducedMotion="user"` so every motion
 * component respects the OS `prefers-reduced-motion` setting (WCAG 2.3.3).
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}