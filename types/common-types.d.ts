export type ApiResponse<T> = {
  status: number;
  message: string;
  data: T;
  errors: Record<string, string[]> | null;
};

export type Language = string;

export type LanguageData = {
  id: number;
  name: string;
  code: string;
  native_name: string;
};

export type LanguagesResponse = LanguageData[];