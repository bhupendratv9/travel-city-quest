type User = {
  id: number;
  name: string;
  email: string | null;
  mobile: string | null;
  country_code: string | null;
  gender: string | null;
  age: number | null;
  qualification: string | null;
  image: string | null;
  is_guest: boolean;
  is_active: boolean;
};

type GameStats = {
  games_played: number;
  today_game_played: boolean;
  next_questions_available_date: Date | null;
  today_score: number;
  total_score: number;
  best_score: number;
  average_score: number;
  current_streak: number;
  highest_streak: number;
  first_attempt_wins: number;
  days_played: number;
};

type EarnedBadge = {
  id: number;
  name: string;
  tier: number;
  icon: string;
  min_points?: number;
  max_points?: number;
  leaderboard_top_count?: number;
  is_current?: boolean;
  earned_at?: string;
};

export type ProfileResponse = {
  user: User;
  game_stats: GameStats;
  earned_badges: EarnedBadge[];
};

export type LoginResponse = {
  user: User;
  token: string;
  is_new_user: boolean;
  game_mapped: boolean;
  reload_leaderboard: boolean;
};
