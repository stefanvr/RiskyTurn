export enum GamePhase {
  placing,
}

export type GameStatus = {
  phase: GamePhase;
};

export type PlayerStatus = {
  playerId: number;
};

export type PlayersStatus = {
  [playerId: number]: PlayerStatus;
};

export type GameState = {
  gameStatus: GameStatus;
  playersStatus: PlayersStatus;
};
