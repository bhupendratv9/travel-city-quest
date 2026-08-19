import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type AuthState = {
  isAuthenticated: boolean;
  isGuest: boolean;
  accessToken: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  isGuest: true,
  accessToken: null,
};

type AuthAction = {
  login: (accessToken: string, isGuest: boolean) => void;
  logout: () => void;
};

type AuthStore = AuthState & AuthAction;

const useAuthStore = create<AuthStore>()(
  persist(
    immer((set) => ({
      ...initialState,
      login: (accessToken, isGuest) =>
        set(() => ({
          isAuthenticated: true,
          isGuest: isGuest,
          accessToken: accessToken,
        })),
      logout: () => set(() => initialState),
    })),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;
