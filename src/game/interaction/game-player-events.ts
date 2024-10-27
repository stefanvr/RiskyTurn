import { Vector } from "../../lib/vector.ts";

export enum PlayerEventType {
  Passed = "Passed",
  UnitsPlaced = "UnitsPlaced",
}

export type UnitPlacementResult = {
  target: {
    field: Vector;
    units: number;
  };
  player: {
    placeableUnits: number;
  };
};

export type UnitPlacementEvent = {
  type: PlayerEventType.UnitsPlaced;
  playerId: number;
  placementResult: UnitPlacementResult;
};

export type PlayerEvent =
  | { type: PlayerEventType.Passed }
  | UnitPlacementEvent;
