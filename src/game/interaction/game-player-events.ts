import { Vector } from "../../lib/vector.ts";

export enum PlayerEventType {
  UnitsPlaced = "UnitsPlaced",
}

export type UnitPlacementResult = {
  targetField: Vector;
  units: number;
};

export type UnitPlacementEvent = {
  type: PlayerEventType.UnitsPlaced;
  playerId: number;
  placementResult: UnitPlacementResult;
};

export type PlayerEvent = UnitPlacementEvent;
