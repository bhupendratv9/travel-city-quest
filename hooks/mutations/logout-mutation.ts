import { axiosPrivate } from "@/config/axiosConfig";
import { useMutation } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";
import { useRouter } from "next/navigation";
import gameStore from "@/store/game-store";
import useAuthStore from "@/store/auth-store";

export const logoutUser = async () => {
  const res = await axiosPrivate.post("/auth/logout");
  return res.data;
};

export const useLogoutMutation = () => {
  const router = useRouter();
  const { restartGame } = gameStore.getState();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: async () => {
      restartGame();
      getQueryClient().clear();
      router.push("/dashboard");
      useAuthStore.getState().logout();
    },
  });
};
