import {axiosPrivate} from "@/config/axiosConfig";
import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import { GameQuestionData } from "@/types/game-screen-types";
import { ApiResponse } from "@/types/common-types";
import useLanguageStore from "@/store/language-store";
import useGameStore from "@/store/game-store";
import { fetchGameStatus } from "@/hooks/queries/get-game-status-query";

const fetchGameData = async (): Promise<ApiResponse<GameQuestionData>> => {
  const { language } = useLanguageStore.getState();
  const { game_id } = useGameStore.getState();

  if (game_id) {
    const statusResponse = await fetchGameStatus()
    if (statusResponse?.data?.is_expired) {
      useGameStore.getState().restartGame();
    }
  }

  const { data } = game_id
    ? await axiosPrivate.post("/game/next-question", {
        game_id,
        lang: language,
      },{
      validateStatus: (status) => status < 500,
    })
    : await axiosPrivate.post("/game/start-game", {
        lang: language,
      },{
      validateStatus: (status) => status < 500,
    });
  return data;
};

export const useGetGameQuery = (
  options?: Omit<
    UseQueryOptions<ApiResponse<GameQuestionData>>,
    "queryKey" | "queryFn"
  >
) => {
  const {game_id} = useGameStore.getState();
  const {language} = useLanguageStore.getState()
  return useQuery({
    queryKey: ["game", game_id, language ],
    queryFn:() => fetchGameData(),
    ...options,
  });
};
