import { create } from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Language } from "@/types/common-types";

type LanguageState = {
  language: Language;
}

type LanguageActions = {
  setLanguage: (data: Language) => void;
}

type LanguageStore = LanguageState & LanguageActions;

const initialState: LanguageState = {
  language: "hi",
};

const useLanguageStore = create<LanguageStore>()(
  persist(
    immer((set) => ({
      ...initialState,
      setLanguage: (data: Language) => set((state) => {
        state.language = data;
      })
    })),
    {
      name: "language-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useLanguageStore;
