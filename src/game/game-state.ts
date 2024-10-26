import type { FieldType } from "./game-elements.ts";

export enum GamePhase {
  placing,
  playing,
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

export type FieldStatus = {
  fieldType: FieldType;
  playerId: number | null;
  units: number;
};

export type MapStatus = {
  fields: FieldStatus[][];
};

export type GameState = {
  gameStatus: GameStatus;
  playersStatus: PlayersStatus;
  mapStatus: MapStatus;
};
