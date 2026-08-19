import {axiosPrivate} from "@/config/axiosConfig";
import useGameStore from "@/store/game-store";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/types/common-types";
import { GameResultResponse } from "@/types/game-screen-types";

export const getGameResult = async (): Promise<
  ApiResponse<GameResultResponse>
> => {
  const { game_id } = useGameStore.getState();
  const res = await axiosPrivate.post(`/game/result`, {
    game_id: game_id,
  });
  return res.data;
};

export const useGameResultQuery = () => {
  return useQuery({
    queryKey: ["game-result"],
    queryFn: () => getGameResult(),
  });
};
