import type { FieldType } from "./game-elements.ts";
import { GameRules } from "./game-rules.ts";

export enum GamePhase {
  placing,
  playing,
  finished,
}

export type GameStatus = {
  phase: GamePhase;
};

export type PlayerStatus = {
  playerId: number;
  placeableUnits: number;
  mapDomination: number;
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
  rules: GameRules;
  gameStatus: GameStatus;
  playersStatus: PlayersStatus;
  mapStatus: MapStatus;
};
