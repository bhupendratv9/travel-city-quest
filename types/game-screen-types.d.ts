export type GameQuestionData= {
  game_id: string;
  score: number;
  bonus_score: number;
  final_score: number;
  current_index: number;
  current_question: number;
  total_questions: number;
  next_questions_available_date: Date | null;
  question: Question | null;
};

export type Question = {
  id: number;
  title: string;
  trivia: string[];
  city: string;
  question_type: string;
  answers: Answer[];
};

export type Answer = {
  id: number;
  label: string;
  image_url: string;
};


export type ResultSummary = {
  correct_picks: number;
  missed_picks: number;
};

export type ResultScreen = {
  question_id: number;
  title: string;
  city: string;
  city_aka: string;
  state: string | null;
  trivia: string[];
  score: number;
  score_display: string;
  total_score: number;
  correct_answers: Answer[];
  wrong_answers: Answer[];
  wrong_attempts: number;
  summary: ResultSummary;
};

export type QuestionCompletedData = {
  is_correct: boolean;
  question_completed: boolean;
  correct_found: number;
  wrong_attempts: number;
  total_score: number;
  question_score?: number;
  current_question?: number;
  total_questions?: number;
  remaining_questions?: number;
  result_screen: ResultScreen;
};

export type GameStatusResponse = {
  game_id: string;
  status: "completed" | "active" | "pending";
  is_expired: boolean;
  game_completed: boolean;
  total_questions: number;
  questions_finished: number;
  remaining_questions: number;
  next_game_available: boolean;
  next_game_date: string | null;
};

type ScoreBoard = {
  total_score: number;
  max_score: number;
  display: string;
};

type RankEarned = {
  id: number;
  name: string;
  tier: number;
  icon: string;
  min_points: number;
  max_points: number;
};

type Stats = {
  accuracy: string;
  rank_earned: RankEarned;
  wrong_picks: string;
};

type JourneyItem = {
  question_id: number;
  city: string;
  score: number;
  score_display: string;
  max_score: number;
  wrong_attempts: number;
  correct_answer_image: string;
};

type Bonuses = {
  first_play_bonus: number;
};

export type GameResultResponse = {
  game_completed: boolean;
  score: number;
  final_score: number;
  score_board: ScoreBoard;
  stats: Stats;
  journey: JourneyItem[];
  bonuses: Bonuses;
};

type QuestionAnswer = {
  id: number;
  label: string;
  image_url: string;
  is_selected: boolean;
  is_correct: boolean;
};

type CurrentQuestion = {
  id: number;
  selected_answer_ids: number[];
  answers: QuestionAnswer[];
};

export type CurrentQuestionResponse = {
  current_question: CurrentQuestion;
};