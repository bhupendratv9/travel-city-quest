import { axiosPrivate } from "@/config/axiosConfig";
import useLanguageStore from "@/store/language-store";
import { useQuery } from "@tanstack/react-query";
import {ApiResponse} from "@/types/common-types";
import {LeaderboardResponse} from "@/types/leaderboard-types";


export const getLeaderboardData = async (type: LeaderboardResponse["type"]):Promise<ApiResponse<LeaderboardResponse>> => {
  const { language } = useLanguageStore.getState();
  const res = await axiosPrivate.post("/game/leaderboard", { lang: language, type: type });
  return res.data;
};

export const useGetLeaderboardQuery = (type:LeaderboardResponse["type"]) => {
  return useQuery({
    queryKey: ["leaderboard", type],
    queryFn: () => getLeaderboardData(type),
    refetchOnMount: "always",
  });
};
