import { useMutation } from "@tanstack/react-query";
import {axiosPrivate} from "@/config/axiosConfig";
import {ApiResponse} from "@/types/common-types";
import {QuestionCompletedData} from "@/types/game-screen-types";

type ClickAnswerPayload = {
  game_id: string;
  question_id: number;
  answer_id: number;
  lang: string;
};

const clickAnswer = async (payload: ClickAnswerPayload): Promise<ApiResponse<QuestionCompletedData>> => {
  const res = await axiosPrivate.post("/game/click-answer", payload);
  return res.data;
};

export const useClickAnswerMutation = () =>
  useMutation({
    mutationFn: (payload: ClickAnswerPayload) => clickAnswer(payload),
  });