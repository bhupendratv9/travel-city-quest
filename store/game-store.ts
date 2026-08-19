import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ResultScreen } from "@/types/game-screen-types";

// 1. Separate your State and Actions for cleaner types
type GameState = {
  game_id: string | null;
  currentQuestionIndex?: number | null;
  totalQuestions?: number | null;
  resultData: ResultScreen | null;
};

type GameActions = {
  setGameId: (data: string) => void;
  setResultData: (data: ResultScreen) => void;
  setCurrentQuestionIndex: (data: number) => void;
  setTotalQuestions: (data: number) => void;
  restartGame: () => void;
};

// 2. Combine them into a single Store type
type GameStore = GameState & GameActions;

const initialState: GameState = {
  game_id: null,
  currentQuestionIndex: null,
  totalQuestions: null,
  resultData: null,
};

// 3. Pass the combined type to create<GameStore>()
const useGameStore = create<GameStore>()(
  persist(
    immer((set) => ({
      ...initialState,
      setGameId: (data: string) =>
        set((state) => {
          state.game_id = data;
        }),
      setResultData: (data: ResultScreen) =>
        set((state) => {
          state.resultData = data;
        }),
      setCurrentQuestionIndex: (data: number) =>
        set((state) => {
          state.currentQuestionIndex = data;
        }),
      setTotalQuestions: (data: number) =>
        set((state) => {
          state.totalQuestions = data;
        }),
      restartGame: () => set(() => initialState),
    })),
    {
      name: "game-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useGameStore;
