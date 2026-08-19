import { axiosPublic } from "@/config/axiosConfig";
import useGameStore from "@/store/game-store";
import {ApiResponse} from "@/types/common-types";
import {GameStatusResponse} from "@/types/game-screen-types";
import {useQuery} from "@tanstack/react-query";

export const fetchGameStatus = async (): Promise<ApiResponse<GameStatusResponse>> => {
  const { game_id } = useGameStore.getState();
  const { data } = await axiosPublic.post("/game/check-game", {
    game_id: game_id,
  },{
    validateStatus: (status) => status < 500,
  });

  return data;
};

export const useGetGameStatusQuery = () => {
  const { game_id } = useGameStore.getState();
  return useQuery({
    queryKey: ["game-status", game_id],
    queryFn: () => fetchGameStatus(),
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });
};
