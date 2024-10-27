import { Vector } from "../../lib/vector.ts";

export enum PlayerActionType {
  Pass = "Pass",
  PlaceUnits = "PlaceUnits",
  BuildUnit = "BuildUnit",
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

export type BuildUnitAction = {
  type: PlayerActionType.BuildUnit;
  playerId: number;
  buildInstruction: {
    numberOfUnits: number;
    targetField: Vector;
  };
};

export type PlayerAction =
  | {
    type: PlayerActionType.Pass;
  }
  | UnitPlacementAction
  | BuildUnitAction
  | {
    type: PlayerActionType.Attack;
  };

export type TurnActions = PlayerAction[];
