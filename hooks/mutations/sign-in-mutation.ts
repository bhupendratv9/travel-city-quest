import { useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "@/config/axiosConfig";
import {getQueryClient} from "@/app/get-query-client";
import {ApiResponse} from "@/types/common-types";
import {LoginResponse} from "@/types/profile-types";
import useAuthStore from "@/store/auth-store";

export const loginUser = async (payload: FormData):Promise<ApiResponse<LoginResponse>> => {
  const res = await axiosPrivate.post("/auth/login", payload);
  return res.data;
};

export const useSignInMutation = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      useAuthStore.getState().login(data.data.token, data.data.user.is_guest);

      queryClient.removeQueries({ queryKey: ["profile"] });
      queryClient.removeQueries({ queryKey: ["game"] });
      queryClient.removeQueries({ queryKey: ["leaderboard"] });
      queryClient.removeQueries({ queryKey: ["game-result"] });
    },
  });
};
