"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  GameQuestionData,
} from "@/types/game-screen-types";
import { useClickAnswerMutation } from "@/hooks/mutations/click-answer-mutation";
import useGameStore from "@/store/game-store";
import { useRouter } from "next/navigation";
import { getQueryClient } from "@/app/get-query-client";
import { useQuestionStatusQuery } from "@/hooks/queries/get-question-status-query";
import useLanguageStore from "@/store/language-store";
import { useGetProfileQuery } from "@/hooks/queries/get-profile-query";
import { useCreateQueryString } from "@/hooks/use-create-query-string";
import { domAnimation, LazyMotion, m, AnimatePresence } from "motion/react";
import RightAnswerBubble from "@/components/game/RightAnswerBubble";
import WrongAnswerBubble from "@/components/game/WrongAnswerBubble";

type ImageCardsProps = {
  cards: GameQuestionData | undefined;
};

export default function GameFlipCard({ cards }: ImageCardsProps) {
  const { push } = useRouter();

  const [flipped, setFlipped] = useState<number[]>([]);
  const [optimisticResults, setOptimisticResults] = useState<
    Record<number, boolean>
  >({});
  const [answerBubble, setAnswerBubble] = useState<{
    type: "right" | "wrong";
    answerId: number;
  } | null>(null);
  const { mutate: clickAnswer } = useClickAnswerMutation();
  const { language } = useLanguageStore();
  const { data: profileData } = useGetProfileQuery();
  const createQueryString = useCreateQueryString();

  const store = useGameStore();

  const game_id = cards?.game_id ?? "";
  const question = cards?.question;
  const { data } = useQuestionStatusQuery(game_id, question?.id ?? 0);

  const statusAnswers = useMemo(
    () => data?.data?.current_question?.answers ?? [],
    [data],
  );
  const selectedOrder = useMemo(
    () => data?.data?.current_question?.selected_answer_ids ?? [],
    [data],
  );

  const effectiveFlipped = useMemo(() => {
    if (!selectedOrder.length) return flipped;
    const merged = [...selectedOrder];
    for (const id of flipped) {
      if (!merged.includes(id)) merged.push(id);
    }
    return merged;
  }, [selectedOrder, flipped]);

  const effectiveResults = useMemo(() => {
    const next = { ...optimisticResults };
    let changed = false;
    for (const a of statusAnswers) {
      if (a.is_selected && !(a.id in next)) {
        next[a.id] = a.is_correct;
        changed = true;
      }
    }
    return changed ? next : optimisticResults;
  }, [optimisticResults, statusAnswers]);

  if (!cards || !question) return null;

  const handleFlip = (answerId: number) => {
    const alreadyAnswered =
      effectiveFlipped.includes(answerId) ||
      statusAnswers.some((a) => a.id === answerId && a.is_selected);
    if (alreadyAnswered) return;

    setFlipped((prev) => {
      if (prev.includes(answerId)) return prev;
      if (prev.length >= question.answers.length) return prev;
      return [...prev, answerId];
    });

    clickAnswer(
      {
        game_id,
        question_id: question.id,
        answer_id: answerId,
        lang: language,
      },
      {
        onSuccess: async (data) => {
          setOptimisticResults((prev) => ({
            ...prev,
            [answerId]: data.data.is_correct,
          }));

          setAnswerBubble({
            type: data.data.is_correct ? "right" : "wrong",
            answerId,
          });
          setTimeout(() => setAnswerBubble(null), 500);

          await getQueryClient().invalidateQueries({
            queryKey: ["question-status", game_id, question.id],
          });

          if (data?.data?.question_completed) {
            store.setResultData(data?.data?.result_screen);
            store.setGameId(game_id);

            store.setCurrentQuestionIndex(cards.current_index);
            store.setTotalQuestions(cards.total_questions);

            const signInThreshold = Math.min(2, cards.total_questions);
            const reachedSignInGate = cards.current_index >= signInThreshold;
            const userMissing = !!profileData && profileData.status >= 400;

            setTimeout(() => {
              if (reachedSignInGate && userMissing) {
                push("/sign-in?" + createQueryString("from", "/round-score"));
              } else {
                push("/round-score");
              }
              setTimeout(() => {
                getQueryClient().invalidateQueries({ queryKey: ["game"] });
              }, 0);
            }, 100);
          }
        },
      },
    );
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="grid grid-cols-2 gap-1.5 w-max mx-auto relative">
        {question.answers.map((card) => {
          const statusAnswer = statusAnswers.find((a) => a.id === card.id);
          const isFlipped = effectiveFlipped.includes(card.id);
          const selectedIdx = selectedOrder.indexOf(card.id);
          const orderNumber =
            selectedIdx >= 0
              ? selectedIdx + 1
              : effectiveFlipped.indexOf(card.id) + 1;
          const hasOptimistic = card.id in effectiveResults;
          const isCorrect =
            effectiveResults[card.id] ?? statusAnswer?.is_correct ?? false;
          const showResult =
            (statusAnswer?.is_selected ?? false) || hasOptimistic;
          return (
            <div
              key={card.id}
              onClick={() => handleFlip(card.id)}
              className="cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              <m.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotateY: isFlipped ? -180 : 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}
                className="relative h-31 w-37.5"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-md"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <Image
                    src={card.image_url}
                    alt="Game card"
                    height={200}
                    width={400}
                    className="object-cover size-full aspect-6/5 rounded-md"
                  />
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-md"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <Image
                    src={card.image_url}
                    alt="Game card"
                    height={200}
                    width={400}
                    className="object-cover size-full aspect-6/5 rounded-md scale-x-[-1]"
                  />

                  {showResult && (
                    <div
                      className={cn(
                        "absolute inset-0",
                        isCorrect ? "bg-success/70" : "bg-error/70",
                      )}
                    />
                  )}

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[2.5rem] text-white">
                      {orderNumber}
                    </span>
                  </div>
                </div>
              </m.div>

            </div>
          );
        })}
        <AnimatePresence>
          {answerBubble?.type === "right" && (
            <RightAnswerBubble key={answerBubble.answerId} />
          )}
          {answerBubble?.type === "wrong" && (
            <WrongAnswerBubble key={answerBubble.answerId} />
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  );
}
