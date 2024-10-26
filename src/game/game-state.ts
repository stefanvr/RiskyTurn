export enum GamePhase {
  placing,
}

export type GameStatus = {
  phase: GamePhase;
};

export type GameState = {
  gameStatus: GameStatus;
};
