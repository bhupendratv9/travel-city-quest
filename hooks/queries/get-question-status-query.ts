import { axiosPublic } from "@/config/axiosConfig";
import {
  CurrentQuestionResponse,
  GameQuestionData,
  Question,
} from "@/types/game-screen-types";
import { ApiResponse } from "@/types/common-types";
import { useQuery } from "@tanstack/react-query";
import useLanguageStore from "@/store/language-store";

export const getQuestionStatus = async (
  game_id: GameQuestionData["game_id"],
  question_id: Question["id"],
): Promise<ApiResponse<CurrentQuestionResponse>> => {
  const { language } = useLanguageStore.getState();
  const res = await axiosPublic.post(`/game/question-status`, {
    game_id: game_id,
    question_id: question_id,
    lang: language,
  });
  return res.data;
};

export const useQuestionStatusQuery = (
  game_id: GameQuestionData["game_id"],
  question_id: Question["id"],
) => {
  const { language } = useLanguageStore.getState();
  return useQuery({
    queryKey: ["question-status", game_id, question_id, language],
    queryFn: () => getQuestionStatus(game_id, question_id),
    refetchOnMount: "always",
  });
};
