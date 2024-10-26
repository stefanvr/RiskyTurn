import { Vector } from "../lib/vector.ts";

export enum PlayerActionType {
  Pass,
  PlaceUnits,
}

export type UnitPlacement = {
  targetField: Vector;
  units: number;
};

export type PlayerAction =
  | {
    type: PlayerActionType.Pass;
  }
  | {
    type: PlayerActionType.PlaceUnits;
    playerId: number;
    unitPlacement: UnitPlacement;
  };

export type TurnActions = PlayerAction[];
