import type { FieldType } from "./game-elements.ts";
import { GameRules } from "./configuration/game-rules.ts";
import { AttackingEvent } from "./interaction/game-player-events.ts";

export enum GamePhase {
  Placing = "Placing",
  Playing = "Playing",
  Finished = "Finished",
}

export type GameStatus = {
  phase: GamePhase;
};

export type PlayerStatus = {
  playerId: number;
  placeableUnits: number;
  money: number;
  mapDomination: number;
};

export type PlayersStatus = {
  [playerId: number]: PlayerStatus;
};

export type FieldStatus = {
  fieldType: FieldType;
  playerId: number | null;
  units: number;
  unitsUnderConstruction: number;
};

export type MapStatus = {
  fields: FieldStatus[][];
};

export type Battles = Map<string, AttackingEvent[]>;
export type GameState = {
  rules: GameRules;
  gameStatus: GameStatus;
  playersStatus: PlayersStatus;
  mapStatus: MapStatus;
  turnBattles: Battles;
};
