"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import useLanguageStore from "@/store/language-store";
import {
  DEFAULT_LANGUAGE,
  parseLangFromSearchParam,
} from "@/lib/language-from-url";

function readLangFromQuery() {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("lang");
}

function readLangFromBrowserPath() {
  if (typeof window === "undefined") return null;
  const path = window.location.pathname;
  const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
  const withoutBase =
    base && path.startsWith(base) ? path.slice(base.length) : path;
  const first = withoutBase.split("/").filter(Boolean)[0];
  return parseLangFromSearchParam(first);
}

function readLangFromPathname(pathname: string) {
  const first = pathname.split("/").filter(Boolean)[0];
  return parseLangFromSearchParam(first);
}

export default function LanguageFromUrlSync() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const langParam =
    searchParams.get("lang") ??
    readLangFromQuery() ??
    readLangFromBrowserPath() ??
    readLangFromPathname(pathname);

  useEffect(() => {
    const apply = () => {
      const lang = parseLangFromSearchParam(
        readLangFromQuery() ??
          langParam ??
          readLangFromBrowserPath() ??
          readLangFromPathname(pathname),
      );

      if (lang) {
        setLanguage(lang);
        return;
      }

      if (pathname === "/") {
        setLanguage(DEFAULT_LANGUAGE);
      }
    };

    apply();

    if (useLanguageStore.persist.hasHydrated()) {
      apply();
      return;
    }

    return useLanguageStore.persist.onFinishHydration(apply);
  }, [pathname, langParam, setLanguage]);

  return null;
}
