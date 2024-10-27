import { Vector } from "../../lib/vector.ts";

export enum PlayerActionType {
  Pass = "Pass",
  PlaceUnits = "PlaceUnits",
  Attack = "Attack",
}

export type UnitPlacement = {
  targetField: Vector;
  units: number;
};

export type UnitPlacementAction = {
  type: PlayerActionType.PlaceUnits;
  playerId: number;
  unitPlacement: UnitPlacement;
};

export type PlayerAction =
  | {
    type: PlayerActionType.Pass;
  }
  | UnitPlacementAction
  | {
    type: PlayerActionType.Attack;
  };

export type TurnActions = PlayerAction[];
