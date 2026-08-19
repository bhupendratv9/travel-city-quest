"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { recordPath } from "@/lib/navigation-history";

// Records every client-side navigation so BackButton can skip auth routes.
export default function NavigationHistoryTracker() {
  const pathname = usePathname();

  useEffect(() => {
    recordPath(pathname);
  }, [pathname]);

  return null;
}