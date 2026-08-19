"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/store/auth-store";

const protectedRoutes = ["/my-profile", "/leaderboard", "/result"];
const authRoutes = ["/sign-in", "/guest-signup"];

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const accessToken = useAuthStore((state) => state.accessToken);

  const hydrated = useSyncExternalStore(
    (onStoreChange) => useAuthStore.persist.onFinishHydration(onStoreChange),
    () => useAuthStore.persist.hasHydrated(),
    () => false,
  );

  const hasToken = Boolean(accessToken);
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  const hadTokenRef = useRef(false);

  useEffect(() => {
    if (!hydrated) return;

    if (isProtectedRoute && !hasToken) {
      const target = hadTokenRef.current
        ? "/dashboard"
        : `/sign-in?from=${encodeURIComponent(pathname)}`;
      hadTokenRef.current = hasToken;
      router.replace(target);
      return;
    }

    hadTokenRef.current = hasToken;

    if (isAuthRoute && hasToken) {
      const from = new URLSearchParams(window.location.search).get("from");
      const target =
        from && from.startsWith("/") && !from.startsWith("//")
          ? from
          : "/dashboard";
      router.replace(target);
    }
  }, [hydrated, hasToken, isProtectedRoute, isAuthRoute, pathname, router]);

  if (hydrated && isProtectedRoute && !hasToken) {
    return null;
  }

  return <>{children}</>;
}