type Badge = {
  id: number;
  name: string;
  tier: number;
  icon: string;
};

type LeaderboardUser = {
  rank: number;
  user_id: number;
  name: string;
  profile_image: string;
  score: number;
  games_played: number;
  badge: Badge;
};

type MyRank = LeaderboardUser | null;

export type LeaderboardResponse = {
  type: "all_time" | "this_week";
  top_three: LeaderboardUser[];
  leaderboard: LeaderboardUser[];
  my_rank: MyRank;
};