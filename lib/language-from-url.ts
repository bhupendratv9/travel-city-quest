import { Language } from "@/types/common-types";

export const DEFAULT_LANGUAGE: Language = "hi";
export const LANG_QUERY_PARAM = "lang";

export const SUPPORTED_LANGUAGES = ["hi", "en", "bn", "ta"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const SUPPORTED_LANG_PATTERN = SUPPORTED_LANGUAGES.join("|");

export function isSupportedLanguage(value: string): value is SupportedLanguage {
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

export function parseLangFromSearchParam(
  value: string | null | undefined,
): Language | null {
  if (!value) return null;

  const normalized = value.trim().toLowerCase();
  if (!isSupportedLanguage(normalized)) return null;

  return normalized;
}
