export interface World {
  id: string;
  name: string;
  icon: string;
  description: string;
  levelIds: string[];
}

export interface ValidationResult {
  ok: boolean;
  stars: number;
  message: string;
  simulatedOutput?: string;
  error?: string;
}

export interface Level {
  id: string;
  worldId: string;
  number: number;
  title: string;
  service: string;
  certification: string;
  domain: string;
  story: string;
  explanation: string;
  examTip: string;
  example: string;
  mission: string;
  hint: string;
  starterCommand: string;
  validate: (command: string) => ValidationResult;
  rewards: {
    xp: number;
    coins: number;
  };
}

export interface LevelStatus {
  stars: number;
  noHint?: boolean;
  firstTry?: boolean;
}

export interface GameState {
  xp: number;
  coins: number;
  levels: Record<string, LevelStatus>;
  ach: string[];
  current: number;
  streak: number;
  bestStreak: number;
  commands: Record<string, string>;
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  description: string;
  check: (state: GameState) => boolean;
}

export interface RankInfo {
  name: string;
  minXp: number;
  badge: string;
}
