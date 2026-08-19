// Dashboard Types
export type DashboardData = {
  dashboard: {
    message_1: string;
    description: {
      title: string;
    };
    button: {
      button_1: {
        button_next: string;
        button_login: string;
        button_complete: string;
        button_start: string;
      };
      button_2: string;
      button_3: string;
      button_4: string;
    };
  };
};

// Final Result Types
export type FinalResultButtonLabels = {
  button_1: string;
  button_2: string;
  button_3: string;
};

export type FinalResultContent = {
  heading_1: string;
  heading_2: string;
  heading_3: string;
  message_1: string;
  message_1_1: string;
  message_2: string;
  message_3: string;
  message_4: string;
  message_5: string;
  message_6: string;
  button: FinalResultButtonLabels;
};

export type FinalResultResponse = {
  final_result: FinalResultContent;
};

// Leaderboard Types
export type LeaderboardButtons = {
  button_1: string;
  button_2: string;
};

export type LeaderboardContent = {
  message_1: string;
  button: LeaderboardButtons;
};

export type LeaderboardContentResponse = {
  leaderboard: LeaderboardContent;
};

// Question Result Types
export type QuestionResultButtons = {
  button_1: string;
  button_2: string;
};

export type QuestionResultTabs = {
  correct: string;
  missed: string;
};

export type QuestionResultContent = {
  message_1: string;
  message_2: string;
  message_3: string;
  message_4: string;
  message_5: string;
  button: QuestionResultButtons;
  tabs: QuestionResultTabs;
};

export type QuestionResultContentResponse = {
  question_result: QuestionResultContent;
};

// Sign-In Types
export type OtpFormContent = {
  label: string;
  placeholder: string;
  message_0: string;
  message_1: string;
  label_2: string;
  message_2: string;
  message_3: string;
  message_4: string;
  button: {
    button_1: string;
    button_2: string;
    button_3: string;
  };
};

export type GoogleFormContent = {
  button: string;
  message: string;
};

export type GuestFormContent = {
  button: string;
  message: string;
};

export type ProfileStatsContent = {
  message: string;
  box_1: string;
  box_2: string;
  box_3: string;
  box_4: string;
  box_5: string;
  box_6: string;
  box_7: string;
  button: {
    button_5: string;
  };
};

export type ProfileContent = {
  message_1: string;
  message_2: string;
  message_3: string;
  message_4: string;
  label: string;
  placeholder: string;
  button: {
    button_1: string;
    button_2: string;
    button_3: string;
    button_4: string;
  };
  message: {
    message_1: string;
    message_2: string;
  };
  stats: ProfileStatsContent;
};

export type SigningContent = {
  otpform: OtpFormContent;
  googleform: GoogleFormContent;
  guestform: GuestFormContent;
  message_m: string;
  profile: ProfileContent;
};

export type ProfileContentResponse = {
  signin: SigningContent;
};

// How to Play Types
export type HowToPlayIntro = {
  message: string;
};

export type HowToPlayExample = {
  label: string;
  city: string;
};

export type HowToPlayStep1 = {
  title: string;
  description: string;
  example: HowToPlayExample;
};

export type HowToPlayStep2 = {
  title: string;
  description: string;
};

export type HowToPlayPoints = {
  correct_pick: string;
  correct_pick_value: string;
  wrong_pick: string;
  wrong_pick_value: string;
};

export type HowToPlayStep3 = {
  title: string;
  description: string;
  points: HowToPlayPoints;
};

export type HowToPlayCities = {
  city_1: string;
  city_2: string;
  city_3: string;
  city_4: string;
};

export type HowToPlayStep4 = {
  title: string;
  description: string;
  cities: HowToPlayCities;
};

export type HowToPlayTip = {
  title: string;
  message: string;
};

export type HowToPlayButton = {
  button_1: string;
};

export type HowToPlayContent = {
  title: string;
  intro: HowToPlayIntro;
  step_1: HowToPlayStep1;
  step_2: HowToPlayStep2;
  step_3: HowToPlayStep3;
  step_4: HowToPlayStep4;
  tip: HowToPlayTip;
  button: HowToPlayButton;
};

export type HowToPlayResponse = {
  how_to_play: HowToPlayContent;
};
